from datetime import datetime
import fitz  # PyMuPDF

class ExtractTextAndCoordinatesService:
    @staticmethod
    def extract_text_and_coordinates(pdf_file):
        doc = fitz.open("pdf", pdf_file)
        pages_content = []

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            words = page.get_text("words")

            page_data = []
            for word in words:
                text = word[4].strip()
                bbox = fitz.Rect(word[0], word[1], word[2], word[3])
                font_size = bbox.y1 - bbox.y0  # Estimate font size
                page_data.append({'text': text, 'bbox': bbox, 'font_size': font_size})

            pages_content.append({'page': page_num, 'text_and_coordinates': page_data})

        return pages_content

    @staticmethod
    def generate_summary_page(missing_by_page, extra_by_page, reference_pdf_path):
        reference_doc = fitz.open('pdf', reference_pdf_path)
        width, height = reference_doc[0].rect.width, reference_doc[0].rect.height
        reference_doc.close()

        summary_doc = fitz.open()
        summary_page = summary_doc.new_page(width=width, height=height)

        margin_y = 50
        row_height = 40
        col_widths = [120, 180, 180]
        total_table_width = sum(col_widths)
        start_x = (width - total_table_width) / 2

        # Timestamp (moved to top)
        footer_text = "Comparison generated on : " + datetime.now().strftime("%d-%m-%y       Time: %H:%M:%S")
        summary_page.insert_textbox(
            fitz.Rect(start_x, margin_y, width - start_x, margin_y + 30),
            footer_text,
            fontsize=13,
            fontname="helv",
            align=1,
            color=(0, 0, 0)
        )

        # Title - Summary Report
        summary_page.insert_textbox(
            fitz.Rect(start_x, margin_y + 40, width - start_x, margin_y + 80),
            "Summary Report",
            fontsize=22,
            fontname="helv",
            align=1,
            color=(0, 0, 0)
        )

        # Functionalities section
        functionalities = (
            "Functionalities of PDF-to-PDF Engineering Drawing Comparison Tool:\n"
            "1. Identifies missing (red) and extra (blue) annotations or text between two PDFs.\n"
            "2. Clearly marks changes using distinct colors for easy review.\n"
            "3. Offers detailed comparison for each page of the drawings.\n"
            "4. Provides page-wise comparison details."
        )
        summary_page.insert_textbox(
            fitz.Rect(start_x, margin_y + 90, width - start_x, margin_y + 190),
            functionalities,
            fontsize=12,
            fontname="helv",
            align=0,
            color=(0, 0, 0)
        )

        # Table header
        start_y = margin_y + 200  # Just below functionalities
        headers = ["Page Number", "Missing Items Based on PDF2", "Extra Items Based on PDF1"]
        x = start_x
        y = start_y
        for i, header in enumerate(headers):
            rect = fitz.Rect(x, y, x + col_widths[i], y + row_height * 2)
            summary_page.draw_rect(rect, color=(0, 0, 0), width=1, fill=(0.8, 0.8, 0.8))
            summary_page.insert_textbox(rect, header, fontsize=12, fontname="helv", align=1)
            x += col_widths[i]

        # Table rows
        y += row_height
        all_pages = sorted(set(missing_by_page.keys()).union(extra_by_page.keys()))
        for idx, page_num in enumerate(all_pages):
            missing_count = len(missing_by_page.get(page_num, []))
            extra_count = len(extra_by_page.get(page_num, []))
            row_values = [str(page_num + 1), str(missing_count), str(extra_count)]

            x = start_x
            if idx % 2 == 0:
                summary_page.draw_rect(fitz.Rect(start_x, y, start_x + total_table_width, y + row_height),
                                       fill=(0.95, 0.95, 0.95))

            for i, val in enumerate(row_values):
                rect = fitz.Rect(x, y, x + col_widths[i], y + row_height)
                summary_page.draw_rect(rect, color=(0, 0, 0), width=0.8)
                summary_page.insert_textbox(rect, val, fontsize=14, fontname="helv", align=1)
                x += col_widths[i]
            y += row_height

        return summary_doc
