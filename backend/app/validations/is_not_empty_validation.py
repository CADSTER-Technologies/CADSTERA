def is_not_empty(message="Field cannot be empty"):
    def validator(value):
        if value is None or (isinstance(value, str) and value.strip() == ""):
            print(f"Validation failed: {message} for value: {value}")
            return message
        return None  # No error if valid
    return validator