import firebase_admin
from firebase_admin import credentials, firestore

from app.core.config import settings

_cred = credentials.Certificate(settings.firebase_credentials_path)
_app = firebase_admin.initialize_app(_cred)

db = firestore.client()
