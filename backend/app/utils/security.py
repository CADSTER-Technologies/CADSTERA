import os

def secure_filename(filename):
    """Sanitize filename to prevent path traversal attacks and suspicious input."""
    filename = os.path.basename(filename)  # Strip path traversal attempts
    filename = os.path.normpath(filename)  # Normalize paths
    filename = filename.replace(" ", "_")  # Replace spaces with underscores
    
   
    
    return filename

def is_allowed_file(filename):
    """Check if the uploaded file is an allowed type."""
    allowed_extensions = {'pdf'}
    
    # Ensure filename is not empty and has an allowed extension
    if not filename or '.' not in filename:
        return False
    
    extension = filename and filename.rsplit('.', 1)[1].lower()
    return extension in allowed_extensions

   