from flask import request, jsonify
import re
import logging

logging.basicConfig(level=logging.WARNING, format="%(asctime)s - %(levelname)s - %(message)s")

DANGEROUS_PATTERNS = [
    (r"<[^>]*>", "HTML tags are not allowed"),           # XSS
    (r"(?:--|\b(OR|AND)\b\s*\d+\s*=)", "SQLi detected"),  # SQLi
    (r"['\";]", "Invalid characters detected"),           # General
]

def sanitize_input(data):
    """Sanitize strings, dicts, and lists recursively."""
    if isinstance(data, str):
        for pattern, msg in DANGEROUS_PATTERNS:
            if re.search(pattern, data, re.IGNORECASE):
                logging.warning(f"Blocked: {msg}")
                return None, msg
        return data.strip(), None

    elif isinstance(data, dict):
        clean = {}
        for k, v in data.items():
            val, err = sanitize_input(v)
            if err:
                return None, f"In '{k}': {err}"
            clean[k] = val
        return clean, None

    elif isinstance(data, list):
        clean = []
        for item in data:
            val, err = sanitize_input(item)
            if err:
                return None, f"List item: {err}"
            clean.append(val)
        return clean, None

    return data, None  # Unknown types left as-is

def request_sanitizer():
    """Flask middleware to sanitize request input."""
    if request.method in ["POST", "PUT", "PATCH"]:
        if request.is_json:
            data = request.get_json(silent=True)
            if data:
                clean, err = sanitize_input(data)
                if err:
                    return jsonify({"error": err}), 400
                request.environ["sanitized_json"] = clean

        elif request.form:
            form_data = request.form.to_dict()
            clean, err = sanitize_input(form_data)
            if err:
                return jsonify({"error": err}), 400
            request.environ["sanitized_form"] = clean
