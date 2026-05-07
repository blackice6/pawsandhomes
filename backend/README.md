# Backend (Flask)

This backend is created to support the frontend Contact Us endpoint:

- `POST /api/contact_us`

It receives `name`, `email`, `message` from the React form and emails them to:
- `sankaleelvis76@gmail.com` (default)

## 1) Install dependencies
```bash
pip install flask flask-cors
```

For SMTP email sending (standard library is used): no extra packages required.

## 2) Configure environment variables
Set these on your server:

- `CONTACT_DESTINATION_EMAIL` (optional, default: sankaleelvis76@gmail.com)
- `SMTP_HOST` (e.g., smtp.gmail.com)
- `SMTP_PORT` (default: 587)
- `SMTP_USERNAME`
- `SMTP_PASSWORD` (use an app password for Gmail)
- `SMTP_USE_TLS` (true/false, default true)

## 3) Run locally
```bash
export SMTP_HOST="smtp.gmail.com"
export SMTP_PORT="587"
export SMTP_USERNAME="your_email@gmail.com"
export SMTP_PASSWORD="your_app_password"
export CONTACT_DESTINATION_EMAIL="sankaleelvis76@gmail.com"

python backend/app.py
```

Server should expose:
- `http://localhost:5000/api/contact_us`

## 4) Frontend alignment
Your React frontend already calls:

`https://blackice6.alwaysdata.net/api/contact_us`

Deploy this backend to the same base domain/path or update the frontend URL accordingly.

