from .baseForm import BaseForm
from validations import is_not_empty, is_string, is_email,is_valid_password, is_unique_email

class UserForm(BaseForm):
    """Form for user registration and validation."""

    fields = {
        "first_name": [
            is_not_empty("First name is required"), 
            is_string("First name must be a string")
            ],
        "last_name": [
            is_not_empty("Last name is required"), 
            is_string("Last name must be a string")
            ],
        "middle_name": [
            ],
        "email": [
            is_not_empty("Email is required"), 
            is_string("Email must be a string"), 
            is_email("Invalid email format")
            ],
        "password": [
            is_not_empty("Password is required"), 
            is_valid_password("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character")
            ]
    }