# 📌 Middleware to log requests and errors
import time
from functools import wraps
from flask import jsonify, request, Response
from loguru import logger
from utils import secure_log


def log_request_response(func):
    """Middleware to log API requests and responses."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        
        # Log request details
        log_data = {
            "ip": request.remote_addr,
            "method": request.method,
            "url": request.path,
            "headers": dict(request.headers),
            "params": request.args.to_dict(),
            "json": request.get_json(silent=True),
        }
        secure_log({"Request": log_data})

        try:
            response = func(*args, **kwargs)

            # If the response is a tuple (Response, status_code), extract correctly
            if isinstance(response, tuple):
                flask_response, status_code = response
            else:
                flask_response, status_code = response, 200  # Default to 200 OK

            # Convert response to JSON-friendly format
            response_json = flask_response.get_json() if flask_response.is_json else str(flask_response.data)

            # Log response details
            response_time = round(time.time() - start_time, 3)
            secure_log({"Response": {"message": response_json, "status": status_code, "time": response_time}})

            return response

        except Exception as e:
            logger.error(f"Unhandled error: {str(e)}", exc_info=True)
            return jsonify({"error": "Internal Server Error"}), 500

    return wrapper

