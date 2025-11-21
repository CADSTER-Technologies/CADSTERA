import hashlib
import hmac
import time
import base64
import os

from .config import Config

class Security:
    """Handles password hashing and basic token-based authentication"""

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using SHA-256."""
        salt = os.urandom(16)  # Generate a random salt
        hash_obj = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
        return base64.b64encode(salt + hash_obj).decode()

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        """Verify a password against a stored hash."""
        decoded = base64.b64decode(hashed_password.encode())
        salt, stored_hash = decoded[:16], decoded[16:]
        new_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100000)
        return hmac.compare_digest(new_hash, stored_hash)

    @staticmethod
    def generate_token(user_id: int) -> str:
        """Generate a simple token with expiration time."""
        expiry = int(time.time()) + Config.TOKEN_EXPIRY  # Expiry time
        data = f"{user_id}:{expiry}".encode()
        signature = hashlib.sha256(data + Config.SECRET_KEY.encode()).hexdigest()
        return base64.b64encode(f"{user_id}:{expiry}:{signature}".encode()).decode()

    @staticmethod
    def verify_token(token: str) -> bool:
        """Verify if the token is valid and not expired."""
        try:
            decoded = base64.b64decode(token).decode()
            user_id, expiry, signature = decoded.split(":")
            if int(expiry) < time.time():
                return False  # Token expired
            valid_signature = hashlib.sha256(f"{user_id}:{expiry}".encode() + Config.SECRET_KEY.encode()).hexdigest()
            return hmac.compare_digest(signature, valid_signature)
        except Exception:
            return False

# Singleton instance
security = Security()
