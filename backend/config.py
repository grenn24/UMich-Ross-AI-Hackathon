import os

OCI_CONFIG = {
    "user":        os.getenv("OCI_USER"),
    "fingerprint": os.getenv("OCI_FINGERPRINT"),
    "tenancy":     os.getenv("OCI_TENANCY"),
    "region":      os.getenv("OCI_REGION"),
    "key_content": os.getenv("OCI_KEY_CONTENT"),
}

COMPARTMENT_ID = os.getenv("OCI_COMPARTMENT_ID")

OPENAI_CONFIG = {
    "api_key": os.getenv("OPENAI_API_KEY"),
    "model": os.getenv("OPENAI_MODEL", "gpt-5.2-mini"),
}
