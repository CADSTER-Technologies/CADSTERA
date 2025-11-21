import os
from dotenv import load_dotenv
import dotenv

# Determine environment file
base_dir = os.path.abspath(os.path.dirname(__file__))
env_file = os.path.join(base_dir, "../../config/dev.env" if os.getenv("FLASK_ENV") == "development" else "../../config/prod.env")

print(f"Loading environment variables from: {env_file}")

# Load environment variables
load_dotenv(env_file)


class Config:
    """Base Configuration Class"""
    # Server settings
    HOST = os.getenv("API_HOST", "localhost")
    PORT = int(os.getenv("API_PORT", 8000))
    FLASK_ENV = os.getenv("FLASK_ENV", "development")  # Default to "development"
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'pdf'}

    # Security settings
    SECRET_KEY = os.getenv("SECRET_KEY", "my_secret_key")  # Change for production
    TOKEN_EXPIRY = int(os.getenv("TOKEN_EXPIRY", 3600))  # Default: 1 hour expiry

    # Swagger settings
    SWAGGER_TITLE = "CT PDF Comparator API"
    SWAGGER_VERSION = "1.0.0"
    SWAGGER_DESCRIPTION = "CT PDF Comparator API to compare two PDF files and highlight differences."
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    

    # @staticmethod
    # def allowed_file(filename):
    #     """Check if a file is allowed based on extension."""
    #     return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS


class DevConfig(Config):
    """Development Configuration"""
    DEBUG = True


class ProdConfig(Config):
    """Production Configuration"""
    DEBUG = False


def get_config():
    """Returns the appropriate config class based on FLASK_ENV."""
    return DevConfig if os.getenv("FLASK_ENV") == "development" else ProdConfig
