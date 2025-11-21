import os
import sys
import time
import logging
from functools import wraps
from flask import request, jsonify
from loguru import logger

# Define log directory one level outside the project folder
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PARENT_DIR = os.path.dirname(PROJECT_ROOT)                 # one level up
log_dir = os.path.join(PARENT_DIR, "logs")                 # logs folder outside

os.makedirs(log_dir, exist_ok=True)

# Define log file with daily rotation
log_file = os.path.join(log_dir, "app_{time:YYYY-MM-DD}.log")

# Remove default Loguru handlers
logger.remove()

# Log level based on environment
LOG_LEVEL = "DEBUG" if os.getenv("FLASK_ENV") == "development" else "INFO"

# Console logging
logger.add(log_file, 
           rotation="1 day", 
           format="{time} | {level} | {message}",  # 🛠 FIXED: no quotes around time
           level="INFO")

# File logging (JSON format for better monitoring)
logger.add(
    log_file,
    rotation="00:00",
    retention="7 days",
    compression="zip",
    level=LOG_LEVEL,
    format='{{"time": "{time:YYYY-MM-DD HH:mm:ss}", "level": "{level}", "message": "{message}"}}'
)

# Flask log interception
class InterceptHandler(logging.Handler):
    def emit(self, record):
        level = record.levelname
        logger_opt = logger.opt(depth=6, exception=record.exc_info)
        logger_opt.log(level, record.getMessage())

logging.basicConfig(handlers=[InterceptHandler()], level=logging.DEBUG)
logging.getLogger("werkzeug").setLevel(logging.INFO)

# 🔒 Secure log function to redact sensitive data
SENSITIVE_KEYS = {"password", "token", "api_key", "secret"}

def secure_log(data: dict):
    """Redacts sensitive fields from logs."""
    if not isinstance(data, dict):
        return data  # Skip non-dictionary logs
    
    sanitized_data = {
        key: "[REDACTED]" if key in SENSITIVE_KEYS else value
        for key, value in data.items()
    }
    logger.info(sanitized_data)
