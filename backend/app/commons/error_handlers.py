from flask import jsonify
from loguru import logger

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        logger.warning(f"404 Not Found: {error}")
        return jsonify({"error": "The requested resource was not found."}), 404

    @app.errorhandler(405)
    def method_not_allowed_error(error):
        logger.warning(f"405 Method Not Allowed: {error}")
        return jsonify({"error": "Method not allowed on this endpoint."}), 405

    @app.errorhandler(500)
    def internal_server_error(error):
        logger.error(f"500 Internal Server Error: {error}")
        return jsonify({"error": "Internal server error. Please try again later."}), 500
