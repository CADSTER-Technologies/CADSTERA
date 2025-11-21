import io
import fitz  # PyMuPDF
from flask import jsonify, request
from services import PDFService
from utils.security import is_allowed_file, secure_filename


class CompareController:
    """Controller to handle PDF comparison requests."""

    @staticmethod
    def compare():
        """API to compare two PDF files and return the modified file."""
        try:
            # Validate uploaded files
            validation_error = CompareController.validate_pdf_files(request)
            if validation_error:
                return validation_error

            file1 = request.files['file1']
            file2 = request.files['file2']

            # Convert files to in-memory BytesIO streams
            file1_stream = io.BytesIO(file1.read())
            file2_stream = io.BytesIO(file2.read())

            result, status = PDFService.compare_pdfs(file1_stream, file2_stream)

            if status != 200:
                return result, status
            return jsonify({
                "summary_data": result["summary_data"]
                }), 200

        except FileNotFoundError as e:
            return jsonify({"error": "File not found", "details": str(e)}), 400

        except fitz.FileDataError as e:
            return jsonify({"error": "Invalid PDF file", "details": str(e)}), 400

        except KeyError as e:
            return jsonify({"error": "Unexpected data structure", "details": str(e)}), 500

        except Exception as e:
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

    @staticmethod
    def validate_pdf_files(req):
        """Validate the uploaded PDF files before processing."""
        if 'file1' not in req.files or 'file2' not in req.files:
            return jsonify({"error": "Both PDF files are required"}), 400

        file1 = req.files['file1']
        file2 = req.files['file2']

        if file1.filename == '' or file2.filename == '':
            return jsonify({"error": "Both PDF files must have a valid name"}), 400

        # Secure the filename to prevent attacks
        file1.filename = secure_filename(file1.filename)
        file2.filename = secure_filename(file2.filename)

        if not is_allowed_file(file1.filename) or not is_allowed_file(file2.filename):
            return jsonify({"error": "Only PDF files are allowed"}), 400

        # Restrict file size (e.g., 10MB max)
        max_size = 10 * 1024 * 1024  # 10MB
        if len(file1.read()) > max_size or len(file2.read()) > max_size:
            return jsonify({"error": "File size exceeds the 10MB limit"}), 400

        file1.seek(0)  # Reset the file pointer after reading
        file2.seek(0)

        return None  # No validation errors
    
    @staticmethod
    def downloadMissingPdf():
        """API to compare two PDF files and return the modified file."""
        try:
            # Validate uploaded files
            validation_error = CompareController.validate_pdf_files(request)
            if validation_error:
                return validation_error

            file1 = request.files['file1']
            file2 = request.files['file2']

            # Convert files to in-memory BytesIO streams
            file1_stream = io.BytesIO(file1.read())
            file2_stream = io.BytesIO(file2.read())

            response = PDFService.compare_pdfs_missing_download(file1_stream, file2_stream)

            return response

          

        except FileNotFoundError as e:
            return jsonify({"error": "File not found", "details": str(e)}), 400

        except fitz.FileDataError as e:
            return jsonify({"error": "Invalid PDF file", "details": str(e)}), 400

        except KeyError as e:
            return jsonify({"error": "Unexpected data structure", "details": str(e)}), 500

        except Exception as e:
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500
        
    @staticmethod
    def downloadExtraPdf():
        """API to compare two PDF files and return the modified file."""
        try:
            # Validate uploaded files
            validation_error = CompareController.validate_pdf_files(request)
            if validation_error:
                return validation_error

            file1 = request.files['file1']
            file2 = request.files['file2']

            # Convert files to in-memory BytesIO streams
            file1_stream = io.BytesIO(file1.read())
            file2_stream = io.BytesIO(file2.read())

            response = PDFService.compare_pdfs_extra_downlaod(file1_stream, file2_stream)

            return response

          

        except FileNotFoundError as e:
            return jsonify({"error": "File not found", "details": str(e)}), 400

        except fitz.FileDataError as e:
            return jsonify({"error": "Invalid PDF file", "details": str(e)}), 400

        except KeyError as e:
            return jsonify({"error": "Unexpected data structure", "details": str(e)}), 500

        except Exception as e:
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500   

    @staticmethod
    def downloadCompareZipPdf():
        """API to compare two PDF files and return the modified file."""
        try:
            # Validate uploaded files
            validation_error = CompareController.validate_pdf_files(request)
            if validation_error:
                return validation_error

            file1 = request.files['file1']
            file2 = request.files['file2']

            # Convert files to in-memory BytesIO streams
            file1_stream = io.BytesIO(file1.read())
            file2_stream = io.BytesIO(file2.read())

            response = PDFService.compare_zip_download(file1_stream, file2_stream)

            return response

          

        except FileNotFoundError as e:
            return jsonify({"error": "File not found", "details": str(e)}), 400

        except fitz.FileDataError as e:
            return jsonify({"error": "Invalid PDF file", "details": str(e)}), 400

        except KeyError as e:
            return jsonify({"error": "Unexpected data structure", "details": str(e)}), 500

        except Exception as e:
            return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500      
