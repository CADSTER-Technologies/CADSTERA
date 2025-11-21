from flask import request, jsonify
from markupsafe import escape
from loguru import logger
import re



# Add secure HTTP headers
def set_security_headers(response):
    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'DENY'

    # Prevent MIME-type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'

    # Enable browser XSS filtering
    response.headers['X-XSS-Protection'] = '1; mode=block'

    # Enforce HTTPS (HSTS) - set only if SSL is enabled
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'

    # Content Security Policy (CSP) - only allow assets from self
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self'; "
        "img-src 'self' data:; "
        "font-src 'self'; "
        "connect-src 'self'; "
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "base-uri 'self'; "
        "object-src 'none';"
    )

    # Disable referrer to avoid leaking URLs
    response.headers['Referrer-Policy'] = 'no-referrer'

    # Prevent browser from sending credentials to cross-origin
    response.headers['Cross-Origin-Resource-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'

    # Permissions Policy (formerly Feature Policy)
    response.headers['Permissions-Policy'] = (
        "geolocation=(), camera=(), microphone=(), fullscreen=(), payment=()"
    )

    return response


# Log all request info
def log_request_responses(response):
    try:
        logger.info(
            f"{request.remote_addr} {request.method} {request.path} "
            f"Status: {response.status_code} | Agent: {request.user_agent.string} "
            f"| Length: {request.content_length or 0} bytes"
        )
    except Exception as e:
        logger.error(f"Failed to log request/response: {e}")
    return response

# Limit payload size to prevent abuse
MAX_CONTENT_LENGTH_MB = 2  # You can adjust this per route if needed
def validate_request_size():
    content_length = request.content_length
    max_bytes = MAX_CONTENT_LENGTH_MB * 1024 * 1024

    if content_length is not None and content_length > max_bytes:
        logger.warning(f"Payload too large: {content_length} bytes from {request.remote_addr} on {request.path}")
        return jsonify({
            'error': 'Payload too large',
            'limit': f'{MAX_CONTENT_LENGTH_MB}MB'
        }), 413

# Block certain User-Agents
BLOCKED_USER_AGENTS = [
    'sqlmap', 'nmap', 'curl', 'wget', 'nikto',
    'masscan', 'acunetix', 'netsparker', 'dirbuster',
    'httpie', 'fuzz', 'havij', 'owasp', 'arachni'
]

def block_bad_user_agents():
    ua = request.headers.get('User-Agent', '').lower()
    for blocked in BLOCKED_USER_AGENTS:
        if blocked in ua:
            logger.warning(f"Blocked User-Agent: {ua} from {request.remote_addr} on {request.path}")
            return jsonify({
                'error': 'Forbidden User-Agent',
                'message': 'Access denied due to suspicious client behavior.'
            }), 403

# Basic SQLi/XSS attempt blocker
SUSPICIOUS_PATTERNS = [
    r"(?i)(\b(select|union|drop|insert|update|delete|exec|alter|create|truncate)\b)",  # SQLi
    r"(?i)(<script.*?>.*?</script>)",        # XSS script tags
    r"(?i)(\bjavascript:)",                  # JS in links
    r"(?i)(onerror=|onload=|onmouseover=)",  # JS event handlers
    r"(?i)(--|/\*|\*/|@@|char\(|nchar\()",  # SQL operators
    r"(?i)(base64_decode\(|eval\()",         # Common evals
    r"(document\.cookie|document\.location)",# XSS
]

def block_suspicious_input():
    try:
        data_sources = [
            str(request.args),
            str(request.form),
            str(request.get_json(silent=True) or ''),
            str(request.data),
        ]

        combined = " ".join(data_sources)

        for pattern in SUSPICIOUS_PATTERNS:
            if re.search(pattern, combined):
                logger.warning(f"Suspicious input blocked on {request.path} from {request.remote_addr}")
                return jsonify({
                    'error': 'Suspicious input blocked',
                    'message': 'Your request contains potentially harmful content.'
                }), 403
    except Exception as e:
        logger.error(f"Error in suspicious input check: {e}")