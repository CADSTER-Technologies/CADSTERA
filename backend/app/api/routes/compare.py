
from flask import Blueprint, request, send_file, jsonify
from controllers import CompareController

# Define Blueprint once
compare_bp = Blueprint("compare", __name__, url_prefix="/compare")



# Register routes at the top level (outside of functions)
@compare_bp.route('/report', methods=['POST'])
def compare_pdfs_endpoint():
    return CompareController.compare()

@compare_bp.route('/downloadMissingPdf', methods=['POST'])
def download_missing_pdfs_endpoint():
    return CompareController.downloadMissingPdf()

@compare_bp.route('/downloadExtraPdf', methods=['POST'])
def download_extra_pdfs_endpoint():
    return CompareController.downloadExtraPdf()

@compare_bp.route('/downloadZipPdf', methods=['POST'])
def download_zip_pdfs_endpoint():
    return CompareController.downloadCompareZipPdf()
