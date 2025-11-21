import os
import traceback
from flask import Blueprint, Flask, jsonify, request, send_from_directory
from loguru import logger
from commons import register_error_handlers
from core import generate_swagger
from middleware import (
    sanitize_input,
    log_request_responses,
    set_security_headers,
    validate_request_size,
    block_bad_user_agents,
    block_suspicious_input,
    request_sanitizer

)
from api.routes import all_routes
from flask_cors import CORS

class API:
    def __init__(self):
        """Initialize Flask app and register routes."""
        
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    
        template_path = os.path.join(BASE_DIR, "templates")

        self.app = Flask(__name__, template_folder=template_path)

        print("📦 Base Directory:", BASE_DIR)  # Debug line
        register_error_handlers(self.app)

        # Initialize the database
        # init_db(self.app) # Initialize the database connection

        # Setup secure CORS
        CORS(self.app, resources={
            r"/api/*": {
                "origins": ["*"],
                "methods": ["GET", "POST", "PUT", "DELETE"],
                "supports_credentials": True
            },
            r"/docs/*": {
                "origins": "*",
                 "methods": ["GET", "POST", "PUT", "DELETE"],
                 "allow_headers": ["Content-Type"]
                },
            r"/swagger.json": {"origins": "*",
                                 "methods": ["GET", "POST", "PUT", "DELETE"],
                 "allow_headers": ["Content-Type"]}
        })

        # Middleware
        self.app.after_request(log_request_responses)
        self.app.after_request(set_security_headers)
        self.app.before_request(request_sanitizer)
        self.app.before_request(validate_request_size)
        self.app.before_request(block_bad_user_agents)
        self.app.before_request(block_suspicious_input)

        # Register blueprints
        api_bp = Blueprint("api", __name__, url_prefix="/api")
        for route in all_routes:
            api_bp.register_blueprint(route)
            print(f" - {route.endpoint}: {route}")
        self.app.register_blueprint(api_bp)
                # === ADD THIS BLOCK BELOW ===
        print("✅ Live Registered Routes:")
        for rule in self.app.url_map.iter_rules():
            print(f"[API ROUTE] {rule}")

        # Swagger only in development
        if os.getenv("FLASK_ENV") == "development":
            print("✔️ Swagger routes enabled", BASE_DIR)
            self.setup_swagger_routes(BASE_DIR)

        # Global error handler
        self.app.register_error_handler(Exception, self.handle_exception)

    def setup_swagger_routes(self, base_dir):

        """Setup Swagger documentation routes."""
        docs_dir = os.path.abspath(os.path.join(base_dir, "..", "docs"))
        swagger_ui_dir = os.path.join(base_dir, "static", "swagger-ui")
        templates_dir = os.path.join(base_dir, "templates")

        @self.app.route('/swagger.json')
        def serve_swagger_json():
            logger.info("Serving Swagger JSON")
            return send_from_directory(docs_dir, "swagger.json")

        @self.app.route("/docs/<path:filename>")
        def serve_swagger_ui(filename):
            return send_from_directory(swagger_ui_dir, filename)

        @self.app.route("/docs")
        def swagger_ui():
            return send_from_directory(templates_dir, "index.html")

    def handle_exception(self, e):
        logger.error(f"Unhandled Exception: {e}\n{traceback.format_exc()}")
        return jsonify({"error": "Internal Server Error"}), 500

    def run(self):
        logger.info("🚀 Starting API Server...")
        logger.info("✅ Available Routes:")
        for rule in self.app.url_map.iter_rules():
            print(f" - {rule}")
        self.app.run(debug=True)
        
api = API()
if __name__ == "__main__":
    api.run()

app = api.app
