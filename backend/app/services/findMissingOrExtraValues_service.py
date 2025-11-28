import fitz
import io
from tabulate import tabulate
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import yellow, white, black
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from PyPDF2 import PdfReader, PdfWriter

class FindMissingOrExraValuesService:
    @classmethod
    def append_summary_table(cls, doc1, summary_data):
        try:
            if not summary_data:
                print("No summary data available. Returning original PDF.")
                return doc1

            try:
                existing_pdf_buffer = io.BytesIO()
                doc1.save(existing_pdf_buffer)
                existing_pdf_buffer.seek(0)
                pdf_reader = PdfReader(existing_pdf_buffer)
            except Exception as e:
                print(f"Error while reading existing PDF: {e}")
                return doc1

            writer = PdfWriter()
            custom_page_size = (landscape(A4)[0], landscape(A4)[1] + 200)

            try:
                summary_pdf_buffer = io.BytesIO()
                doc = SimpleDocTemplate(summary_pdf_buffer, pagesize=custom_page_size)
                elements = []
                styles = getSampleStyleSheet()

                custom_style = ParagraphStyle("CustomStyle", parent=styles["Normal"], fontSize=18, leading=22)

                elements.append(Paragraph("<b>Summary Report: PDF to PDF Comparison</b>", styles["Title"]))
                elements.append(Spacer(1, 12))

                table_data = [["Page", "Missing Item from PDF1", "Extra Item in PDF2"]]
                for page_num, counts in summary_data.items():
                    table_data.append([
                        page_num + 1,
                        counts.get("missing", 0),
                        counts.get("extra", 0)
                    ])

                table = Table(table_data, colWidths=[100, 200, 200])
                table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.lightgrey, colors.white]),
                ]))
                elements.append(table)
                elements.append(Spacer(1, 20))

                list_items = [
                    ListItem(Paragraph("<b>Exact Comparison:</b> Spot Discrepancies: Detects missing (White) or extra (Yellow) items, highlighting differences based on customizable tolerance levels to prevent false alarms.", custom_style)),
                    ListItem(Paragraph("<b>Advantages:</b> Minimize False Positives: Filters out minor positional shifts to ensure only significant changes are flagged.", custom_style)),
                    ListItem(Paragraph("<b>Summary:</b> <span color='black' backcolor='white'>Missing Items</span> & <span color='black' backcolor='yellow'>Extra Items</span> are displayed with highlights.", custom_style)),
                    ListItem(Paragraph("<b>Save:</b> Downloadable Updated PDF: Saves the modified PDF with clear visual markers of differences for easy distribution.", custom_style)),
                ]

                elements.append(Paragraph("<b><u>Functionalities of PDF-to-PDF Engineering Drawing Comparison Tool:</u></b>", custom_style))
                elements.append(Spacer(1, 10))
                elements.append(ListFlowable(list_items, bulletType='bullet'))
                elements.append(Spacer(1, 20))

                centered_style = ParagraphStyle("CenteredStyle", parent=styles["Italic"], alignment=TA_CENTER)
                elements.append(Spacer(1, 40))
                elements.append(Paragraph("<i>End of Summary Page</i>", centered_style))

                doc.build(elements)
                summary_pdf_buffer.seek(0)

            except Exception as e:
                print(f"Error while creating summary PDF: {e}")
                return doc1

            try:
                new_pdf_reader = PdfReader(summary_pdf_buffer)
                for page in new_pdf_reader.pages:
                    writer.add_page(page)

                for page in pdf_reader.pages:
                    writer.add_page(page)
            except Exception as e:
                print(f"Error while merging PDFs: {e}")
                return doc1

            try:
                updated_pdf_buffer = io.BytesIO()
                writer.write(updated_pdf_buffer)
                updated_pdf_buffer.seek(0)
                updated_doc = fitz.open(stream=updated_pdf_buffer.read(), filetype="pdf")
                print("Summary table successfully added to the existing PDF in memory!")
                return updated_doc

            except Exception as e:
                print(f"Error while saving updated PDF: {e}")
                return doc1

        except Exception as e:
            print(f"Unexpected error in append_summary_table: {e}")
            return doc1

    def is_same_location(rect1, rect2, tolerance=5):
        return (abs(rect1.x0 - rect2.x0) < tolerance and
                abs(rect1.y0 - rect2.y0) < tolerance and
                abs(rect1.x1 - rect2.x1) < tolerance and
                abs(rect1.y1 - rect2.y1) < tolerance)

    @staticmethod
    def find_missing_or_extra_values(page1_data, page2_data, tolerance=5):
        missing_in_pdf1 = []
        extra_in_pdf2 = []

        for item1 in page1_data:
            found_match = False
            for item2 in page2_data:
                if item1['text'] == item2['text'] and FindMissingOrExraValuesService.is_same_location(item1['bbox'], item2['bbox'], tolerance):
                    found_match = True
                    break
            if not found_match:
                missing_in_pdf1.append(item1)

        for item2 in page2_data:
            found_match = False
            for item1 in page1_data:
                if item2['text'] == item1['text'] and FindMissingOrExraValuesService.is_same_location(item2['bbox'], item1['bbox'], tolerance):
                    found_match = True
                    break
            if not found_match:
                extra_in_pdf2.append(item2)

        return missing_in_pdf1, extra_in_pdf2

    @staticmethod
    def highlight_missing_values(page, missing_values, color=(1, 0, 0)):
        for item in missing_values:
            FindMissingOrExraValuesService.highlight_existing_value(page, item['bbox'], color)

    @staticmethod
    def compare_and_ignore_matching_text(missing_values, extra_values):
        missing_texts = set(item['text'] for item in missing_values)
        extra_texts = set(item['text'] for item in extra_values)

        missing_filtered = [item for item in missing_values if item['text'] not in extra_texts]
        extra_filtered = [item for item in extra_values if item['text'] not in missing_texts]

        return missing_filtered, extra_filtered

    @staticmethod
    def highlight_existing_value(page, rect, color=(0, 0, 1)):
        highlight = page.add_highlight_annot(rect)
        highlight.set_colors(stroke=color, fill=color)
        highlight.update()

    @staticmethod
    def highlight_extra_values(page, extra_values, color):
        for item in extra_values:
            FindMissingOrExraValuesService.highlight_existing_value(page, item['bbox'], color=color)

    @staticmethod
    def insert_extra(page, items, color=(0, 0, 1)):
        for item in items:
            rect = item['bbox']
            height = rect.height
            fontsize = max(int(height * 0.7), 4)
            page.insert_text(rect.tl, item['text'], fontsize=fontsize, fontname="Helvetica-Bold", color=color)


