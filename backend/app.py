"""Flask backend for Paws & Homes.

Includes a Contact Us endpoint that receives:
- name
- email
- message

and sends an email to the configured destination.

Caution: This repo currently only contains the frontend.
This backend file is created so you can deploy/run the API that the frontend calls.
"""

import os
import smtplib
from email.message import EmailMessage

from flask import Flask, jsonify, request
from flask_cors import CORS


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    # Destination email (where contact messages should go)
    app.config["CONTACT_DESTINATION_EMAIL"] = os.environ.get(
        "CONTACT_DESTINATION_EMAIL", "sankaleelvis76@gmail.com"
    )

    # SMTP settings (configure via environment variables in production)
    app.config["SMTP_HOST"] = os.environ.get("SMTP_HOST", "")
    app.config["SMTP_PORT"] = int(os.environ.get("SMTP_PORT", "587"))
    app.config["SMTP_USERNAME"] = os.environ.get("SMTP_USERNAME", "")
    app.config["SMTP_PASSWORD"] = os.environ.get("SMTP_PASSWORD", "")
    app.config["SMTP_USE_TLS"] = (
        os.environ.get("SMTP_USE_TLS", "true").lower() == "true"
    )

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    @app.route("/api/contact_us", methods=["POST"])
    def contact_us():
        # Accept both multipart/form-data (FormData) and JSON
        data = request.form if request.form else request.get_json(silent=True) or {}

        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        message = (data.get("message") or "").strip()

        if not name or not email or not message:
            return jsonify({"message": "name, email, and message are required"}), 400

        destination = app.config["CONTACT_DESTINATION_EMAIL"]

        smtp_host = app.config["SMTP_HOST"]
        smtp_username = app.config["SMTP_USERNAME"]
        smtp_password = app.config["SMTP_PASSWORD"]

        if not smtp_host or not smtp_username or not smtp_password:
            return jsonify({"message": "SMTP is not configured on the server"}), 500

        # Compose email
        email_msg = EmailMessage()
        email_msg["Subject"] = f"New Contact Us Message from {name}"
        email_msg["From"] = smtp_username
        email_msg["To"] = destination

        email_msg.set_content(
            (
                "You received a new message from the Contact Us form.\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                "\n"
                f"Message:\n{message}\n"
            )
        )

        # Send email via SMTP
        try:
            if app.config["SMTP_USE_TLS"]:
                server = smtplib.SMTP(app.config["SMTP_HOST"], app.config["SMTP_PORT"])
                server.starttls()
            else:
                server = smtplib.SMTP_SSL(
                    app.config["SMTP_HOST"], app.config["SMTP_PORT"]
                )

            server.login(smtp_username, smtp_password)
            server.send_message(email_msg)
            server.quit()
        except Exception as e:
            return jsonify({"message": f"Failed to send email: {str(e)}"}), 500

        return jsonify({"message": "Your message has been sent successfully!"}), 200

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", "5000"))
    app.run(debug=True, host="0.0.0.0", port=port)

