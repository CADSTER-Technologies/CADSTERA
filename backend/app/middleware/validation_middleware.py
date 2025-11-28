from functools import wraps
from flask import request, jsonify

def validate_form(form_class):
    def decorator(f):
        @wraps(f)
        async def wrapper(*args, **kwargs):
            form = form_class(request.json or {})
            errors = await form.validate()
            if errors:
                return jsonify({
                     "error": "Validation failed",
                     "details": errors
                     }), 400
            # Proceed with the original function if validation passes
            return f(*args, **kwargs)

        return wrapper
    return decorator