# 🛡️ GDPR (General Data Protection Regulation)

## 🔹 Data Minimization

- Collect and store only necessary personal data.
- Avoid hardcoding PII or using test data containing real user information.

## 🔹 Data Security & Encryption

- Encrypt all sensitive data in transit (e.g., use HTTPS).
- Encrypt data at rest using secure algorithms (e.g., AES-256).
- Remove all hardcoded credentials or secrets from the codebase.

## 🔹 Data Subject Rights

- Provide mechanisms for accessing, correcting, deleting, and exporting user data.
- Maintain audit logs to track who accessed or modified user data.

## 🔹 Data Retention & Deletion

- Enforce data retention policies in code.
- Implement and regularly review “right to be forgotten” routines.
