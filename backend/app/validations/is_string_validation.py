def is_string(message="Field must be a string"):
    def validator(value):
        if not isinstance(value, str):
            print(f"Validation failed: {message} for value: {value}")
            return message
        return None  # No error if it's valid
    return validator
