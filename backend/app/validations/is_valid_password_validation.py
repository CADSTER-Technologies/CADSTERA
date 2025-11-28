import re


def is_valid_password(message: str = "Weak password. Use upper, lower, digit, and special character."):
    """Synchronous Password Strength Validator"""
    def validate(value):
        if not isinstance(value, str) or not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$", value):
            return message
        return None
    return validate
