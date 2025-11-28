from datetime import datetime
import io
import zipfile
import json
import fitz
from flask import jsonify, send_file
from loguru import logger
from services import FindMissingOrExraValuesService, ExtractTextAndCoordinatesService
import base64
import os

class PDFService:
    @staticmethod
    def compare_pdfs(pdf_file1, pdf_file2):
        """Compare two PDF files and return the modified file along with summary data in a ZIP."""

        try:
            content1 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file1)
            content2 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file2)
        except Exception as e:
            return jsonify({"error": f"Failed to extract text and coordinates: {str(e)}"}), 500

        try:
            doc1 = fitz.open("pdf", pdf_file1)  # PDF1 will be modified
            doc2 = fitz.open("pdf", pdf_file2)  # PDF2 remains unchanged
        except Exception as e:
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500

        IGNORED_SYMBOLS = {"⏤", "◯", "⌭", "⌖", "∅", "⊥", "∠", "⌰", "⌙", "⌑", "|", "↕", "∓", "〈", "〉", "▽", "⊓", "⌴", "⌵", "⌃", "⌄", "M", "UN", "⌀"}

        summary_data = {}

        try:
            num_pages = min(len(doc1), len(doc2))
        except Exception as e:
            return jsonify({"error": f"Failed to calculate number of pages: {str(e)}"}), 500

        for page_num in range(num_pages):
            try:
                page1 = doc1.load_page(page_num)  # Load a page from doc1 (modifiable)
                page2 = doc2[page_num]             # Load a page from doc2 (read-only)
                print(f"Processing Page {page_num + 1}")
            except Exception as e:
                print(f"Error loading pages: {str(e)}")
                continue  # Skip this page if there's an error

            try:
                missing_values, extra_values = FindMissingOrExraValuesService.find_missing_or_extra_values(
                    content1[page_num]['text_and_coordinates'],
                    content2[page_num]['text_and_coordinates'],
                    tolerance=5
                )
            except Exception as e:
                print(f"Error finding missing or extra values on page {page_num + 1}: {str(e)}")
                continue

            try:
                missing_values_filtered, extra_values_filtered = FindMissingOrExraValuesService.compare_and_ignore_matching_text(
                    missing_values,
                    extra_values
                )
            except Exception as e:
                print(f"Error comparing and ignoring matching text on page {page_num + 1}: {str(e)}")
                continue

            try:
                if missing_values_filtered:
                    FindMissingOrExraValuesService.highlight_missing_values(
                        page1,
                        missing_values_filtered,
                        color=(1, 1, 1)
                    )
                if extra_values_filtered:
                    FindMissingOrExraValuesService.highlight_extra_values(
                        page1,
                        extra_values_filtered,
                        color=(1, 1, 0)
                    )
            except Exception as e:
                print(f"Error highlighting differences on page {page_num + 1}: {str(e)}")
                continue

            try:
                summary_data[page_num] = {
                    'missing': len(missing_values_filtered),
                    'extra': len(extra_values_filtered)
                }
            except Exception as e:
                print(f"Error updating summary data for page {page_num + 1}: {str(e)}")
                continue

        try:
            updated_doc = FindMissingOrExraValuesService.append_summary_table(doc1, summary_data)
        except Exception as e:
            return jsonify({"error": f"Failed to append summary table: {str(e)}"}), 500

        pdf_output_stream = io.BytesIO()

        try:
            watermark_text = "CADSTER"
            for page in updated_doc:
                page_rect = page.rect
                page.draw_rect(page_rect, color=(0.85, 0.85, 0.85), fill=(0.85, 0.85, 0.85), width=0, overlay=False)

                max_font_size = page_rect.width * 0.1
                watermark_width = max_font_size * len(watermark_text) * 0.4
                watermark_height = max_font_size

                center_x = page_rect.x0 + (page_rect.width - watermark_width) / 2
                center_y = page_rect.y0 + (page_rect.height - watermark_height) / 2

                page.insert_text(
                    (center_x, center_y),
                    watermark_text,
                    fontsize=max_font_size,
                    color=(0.7, 0.7, 0.7),
                    rotate=0,
                    overlay=True
                )
        except Exception as e:
            return jsonify({"error": f"Failed to add watermark: {str(e)}"}), 500

        try:
            #updated_doc.save(pdf_output_stream)
            # Optional: also save to file on disk
           # pdf_output_stream.seek(0)  # rewind buffer
           
           
            #downloadfile_path = os.path.join("./", "compared_output.pdf")
           # with open(downloadfile_path, "wb") as f:
             #   f.write(pdf_output_stream.read())
            #pdf_output_stream.seek(0)
        #except Exception as e:
        #    return jsonify({"error": f"Failed to save updated PDF: {str(e)}"}), 500

       # try:
           return {
            "summary_data": summary_data
            }, 200
        except Exception as e:
            return jsonify({"error": f"Failed to prepare response: {str(e)}"}), 500
        
    @staticmethod
    def compare_pdfs_missing_download(pdf_file1, pdf_file2, use_timestamp=True):
        """Compare two PDF files and return the modified file along with summary data in a ZIP."""

        try:
            content1 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file1)
            content2 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file2)
        except Exception as e:
            return jsonify({"error": f"Failed to extract text and coordinates: {str(e)}"}), 500

        try:
         doc1 = fitz.open("pdf", pdf_file1)  # PDF1 will be modified
         doc2 = fitz.open("pdf", pdf_file2)  # PDF2 remains unchanged
        except Exception as e:
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500
        
        try:
        
            for page_num in range(min(len(doc1), len(doc2))):
                page1 = doc1.load_page(page_num)
                page2 = doc2.load_page(page_num)

                page1_data = content1[page_num]['text_and_coordinates']
                page2_data = content2[page_num]['text_and_coordinates']

                missing_in_pdf1, extra_in_pdf2 = FindMissingOrExraValuesService.find_missing_or_extra_values(page1_data, page2_data, tolerance=5)
                missing_filtered_pdf1, extra_filtered_pdf2 = FindMissingOrExraValuesService.compare_and_ignore_matching_text(missing_in_pdf1, extra_in_pdf2)
               
                if missing_filtered_pdf1:
                    FindMissingOrExraValuesService.highlight_missing_values(page1, missing_filtered_pdf1, color=(1, 0, 0))

                if extra_filtered_pdf2:
                    FindMissingOrExraValuesService.highlight_extra_values(page2, extra_filtered_pdf2, color=(0, 0, 1))
 

            #  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S") if use_timestamp else ""
            filename1 = f"missing_highlighted_in_pdf1.pdf"
            filename2 = f"extra_highlighted_in_pdf2.pdf"
            zip_filename = f"comparison_result.zip"

            # Save PDFs to memory
            pdf1_bytes = io.BytesIO()
            doc1.save(pdf1_bytes)
            pdf1_bytes.seek(0)

            doc1.close()
            doc2.close()

            # pdf2_bytes = io.BytesIO()
            # doc2.save(pdf2_bytes)
            # pdf2_bytes.seek(0)

            # # Create ZIP
            # zip_bytes = io.BytesIO()
            # with zipfile.ZipFile(zip_bytes, 'w') as zipf:
            #     zipf.writestr(filename1, pdf1_bytes.getvalue())
            #     zipf.writestr(filename2, pdf2_bytes.getvalue())
            # zip_bytes.seek(0)

            # Base64 for frontend preview
            return send_file(
                    pdf1_bytes,
                    as_attachment=True,
                    download_name="missing-pdf.pdf",
                    mimetype="application/pdf"
            )
        except Exception as e:
            logger.error(f"Opening PDF files failed: {e}", exc_info=True)
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500

        # IGNORED_SYMBOLS = {"⏤", "◯", "⌭", "⌖", "∅", "⊥", "∠", "⌰", "⌙", "⌑", "|", "↕", "∓", "〈", "〉", "▽", "⊓", "⌴", "⌵", "⌃", "⌄", "M", "UN", "⌀"}

        # summary_data = {}

        # try:
        #     num_pages = min(len(doc1), len(doc2))
        # except Exception as e:
        #     return jsonify({"error": f"Failed to calculate number of pages: {str(e)}"}), 500

        # for page_num in range(num_pages):
        #     try:
        #         page1 = doc1.load_page(page_num)  # Load a page from doc1 (modifiable)
        #         page2 = doc2[page_num]             # Load a page from doc2 (read-only)
        #         print(f"Processing Page {page_num + 1}")
        #     except Exception as e:
        #         print(f"Error loading pages: {str(e)}")
        #         continue  # Skip this page if there's an error

        #     try:
        #         missing_values, extra_values = FindMissingOrExraValuesService.find_missing_or_extra_values(
        #             content1[page_num]['text_and_coordinates'],
        #             content2[page_num]['text_and_coordinates'],
        #             tolerance=5
        #         )
        #     except Exception as e:
        #         print(f"Error finding missing or extra values on page {page_num + 1}: {str(e)}")
        #         continue

        #     try:
        #         missing_values_filtered, extra_values_filtered = FindMissingOrExraValuesService.compare_and_ignore_matching_text(
        #             missing_values,
        #             extra_values
        #         )
        #     except Exception as e:
        #         print(f"Error comparing and ignoring matching text on page {page_num + 1}: {str(e)}")
        #         continue

        #     try:
        #         if missing_values_filtered:
        #             FindMissingOrExraValuesService.highlight_missing_values(
        #                 page1,
        #                 missing_values_filtered,
        #                 color=(1, 1, 1)
        #             )
        #         if extra_values_filtered:
        #             FindMissingOrExraValuesService.highlight_extra_values(
        #                 page1,
        #                 extra_values_filtered,
        #                 color=(1, 1, 0)
        #             )
        #     except Exception as e:
        #         print(f"Error highlighting differences on page {page_num + 1}: {str(e)}")
        #         continue

        #     try:
        #         summary_data[page_num] = {
        #             'missing': len(missing_values_filtered),
        #             'extra': len(extra_values_filtered)
        #         }
        #     except Exception as e:
        #         print(f"Error updating summary data for page {page_num + 1}: {str(e)}")
        #         continue

        # try:
        #     updated_doc = FindMissingOrExraValuesService.append_summary_table(doc1, summary_data)
        # except Exception as e:
        #     return jsonify({"error": f"Failed to append summary table: {str(e)}"}), 500

        # pdf_output_stream = io.BytesIO()

        # try:
        #     watermark_text = "CADSTER"
        #     for page in updated_doc:
        #         page_rect = page.rect
        #         page.draw_rect(page_rect, color=(0.85, 0.85, 0.85), fill=(0.85, 0.85, 0.85), width=0, overlay=False)

        #         max_font_size = page_rect.width * 0.1
        #         watermark_width = max_font_size * len(watermark_text) * 0.4
        #         watermark_height = max_font_size

        #         center_x = page_rect.x0 + (page_rect.width - watermark_width) / 2
        #         center_y = page_rect.y0 + (page_rect.height - watermark_height) / 2

        #         page.insert_text(
        #             (center_x, center_y),
        #             watermark_text,
        #             fontsize=max_font_size,
        #             color=(0.7, 0.7, 0.7),
        #             rotate=0,
        #             overlay=True
        #         )
        # except Exception as e:
        #     return jsonify({"error": f"Failed to add watermark: {str(e)}"}), 500

        # try:
        #     pdf_output_stream = io.BytesIO()
        #     updated_doc.save(pdf_output_stream)
        #     pdf_output_stream.seek(0)  # Rewind stream before sending

        #     return send_file(
        #         pdf_output_stream,
        #         as_attachment=True,
        #         download_name="compared_output.pdf",
        #         mimetype="application/pdf"
        #     )
        # except Exception as e:
        #     return jsonify({"error": f"Failed to prepare response: {str(e)}"}), 500


    @staticmethod
    def compare_pdfs_extra_downlaod(pdf_file1, pdf_file2, use_timestamp=True):
        """Compare two PDF files and return the modified file along with summary data in a ZIP."""

        try:
            content1 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file1)
            content2 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file2)
        except Exception as e:
            return jsonify({"error": f"Failed to extract text and coordinates: {str(e)}"}), 500

        try:
            doc1 = fitz.open("pdf", pdf_file1)  # PDF1 will be modified
            doc2 = fitz.open("pdf", pdf_file2)  # PDF2 remains unchanged
        except Exception as e:
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500
        
        try:
        
            for page_num in range(min(len(doc1), len(doc2))):
                page1 = doc1.load_page(page_num)
                page2 = doc2.load_page(page_num)

                page1_data = content1[page_num]['text_and_coordinates']
                page2_data = content2[page_num]['text_and_coordinates']

                missing_in_pdf1, extra_in_pdf2 = FindMissingOrExraValuesService.find_missing_or_extra_values(page1_data, page2_data, tolerance=5)
                missing_filtered_pdf1, extra_filtered_pdf2 = FindMissingOrExraValuesService.compare_and_ignore_matching_text(missing_in_pdf1, extra_in_pdf2)

                if missing_filtered_pdf1:
                    FindMissingOrExraValuesService.highlight_missing_values(page1, missing_filtered_pdf1, color=(1, 0, 0))
                   
                if extra_filtered_pdf2:
                    FindMissingOrExraValuesService.highlight_extra_values(page2, extra_filtered_pdf2, color=(0, 0, 1))


            #  timestamp = datetime.now().strftime("%Y%m%d_%H%M%S") if use_timestamp else ""
            filename1 = f"missing_highlighted_in_pdf1.pdf"
            filename2 = f"extra_highlighted_in_pdf2.pdf"
            zip_filename = f"comparison_result.zip"

            # Save PDFs to memory
            # pdf1_bytes = io.BytesIO()
            # doc1.save(pdf1_bytes)
            # pdf1_bytes.seek(0)

            pdf2_bytes = io.BytesIO()
            doc2.save(pdf2_bytes)
            doc2.close()
            pdf2_bytes.seek(0)
            doc1.close() 

            #Base64 for frontend preview
            return send_file(
                pdf2_bytes,
                as_attachment=True,
                download_name="extra-pdf.pdf",
                mimetype="application/pdf"
            )
        except Exception as e:
            logger.error(f"Opening PDF files failed: {e}", exc_info=True)
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500
        
    @staticmethod
    def compare_zip_download(pdf_file1, pdf_file2, use_timestamp=True):
        """Compare two PDF files and return the modified file along with summary data in a ZIP."""

        try:
            content1 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file1)
            content2 = ExtractTextAndCoordinatesService.extract_text_and_coordinates(pdf_file2)
            missing_by_page = {}
            extra_by_page = {}
        except Exception as e:
            return jsonify({"error": f"Failed to extract text and coordinates: {str(e)}"}), 500

        try:
            doc1 = fitz.open("pdf", pdf_file1)  # PDF1 will be modified
            doc2 = fitz.open("pdf", pdf_file2)  # PDF2 remains unchanged
        except Exception as e:
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500
        
        try:
        
            for page_num in range(min(len(doc1), len(doc2))):
                page1 = doc1.load_page(page_num)
                page2 = doc2.load_page(page_num)

                page1_data = content1[page_num]['text_and_coordinates']
                page2_data = content2[page_num]['text_and_coordinates']

                missing_in_pdf1, extra_in_pdf2 = FindMissingOrExraValuesService.find_missing_or_extra_values(page1_data, page2_data, tolerance=5)
                missing_filtered_pdf1, extra_filtered_pdf2 = FindMissingOrExraValuesService.compare_and_ignore_matching_text(missing_in_pdf1, extra_in_pdf2)

                if missing_filtered_pdf1:
                    FindMissingOrExraValuesService.highlight_missing_values(page1, missing_filtered_pdf1, color=(1, 0, 0))
                    missing_by_page[page_num] = missing_filtered_pdf1


                if extra_filtered_pdf2:
                    FindMissingOrExraValuesService.insert_extra(page1, extra_filtered_pdf2, color=(0, 0, 1))
                    extra_by_page[page_num] = extra_filtered_pdf2
            
            summary_doc = ExtractTextAndCoordinatesService.generate_summary_page(missing_by_page, extra_by_page, pdf_file1)   
            
            final_doc = fitz.open()
            final_doc.insert_pdf(summary_doc)
            final_doc.insert_pdf(doc1)    


           

            pdf2_bytes = io.BytesIO()
            final_doc.save(pdf2_bytes)
            pdf2_bytes.seek(0)

           
            doc2.close()
            doc1.close()
            final_doc.close()

            # Create ZIP
           
            #Base64 for frontend preview
            return send_file(
                pdf2_bytes,
                as_attachment=True,
                download_name="compain-missing-extra.pdf",
                mimetype="application/pdf"
            )
        except Exception as e:
            logger.error(f"Opening PDF files failed: {e}", exc_info=True)
            return jsonify({"error": f"Failed to open PDF files: {str(e)}"}), 500    