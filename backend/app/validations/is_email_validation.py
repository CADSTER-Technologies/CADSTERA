import re

def is_email(message: str = "Invalid email format"):
    """Synchronous Email Validator"""
    def validate(value):
        if not isinstance(value, str) or not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", value):
            print(f"Validation failed: {message} for value: {value}")
            return message
        return None
    return validate