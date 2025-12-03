from .compare import compare_bp
from .email_route import email_bp


# List of all blueprints to be registered
all_routes = [email_bp, compare_bp]

