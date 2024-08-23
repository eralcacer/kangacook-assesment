import hashlib
import os

class Hashing:
    def hash_password(password, salt):
        return hashlib.sha256((salt + password).encode()).hexdigest()

    def generate_salt():
        return os.urandom(16).hex()