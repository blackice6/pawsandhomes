"""Mpesa Payment API for Paws & Homes (frontend integration).

This file exposes:
  POST /api/mpesa_payment

It is extracted from backend/combined_app.py so you can host only the
payment endpoint for this project.

Environment notes:
- This endpoint uses Safaricom Sandbox keys hard-coded from your existing code.
  Replace them with environment variables for production.
- Server should be reachable by your frontend.

Run:
  pip install flask flask-cors requests
  python backend/payment_api.py

Example:
  curl -X POST -F "phone=2547xxxxxxxx" -F "amount=100" \
    http://YOUR_HOST/api/mpesa_payment
"""

from __future__ import annotations

import base64
import datetime

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/mpesa_payment", methods=["POST"])
def mpesa_payment():
    try:
        amount = int(request.form["amount"])
        phone = request.form["phone"]

        # Safaricom credentials (kept as-is from combined_app.py)
        consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
        consumer_secret = "amFbAoUByPV2rM5A"

        api_url = (
            "https://sandbox.safaricom.co.ke/oauth/v1/generate"
            "?grant_type=client_credentials"
        )
        r = requests.get(
            api_url,
            auth=(consumer_key, consumer_secret),
            timeout=30,
        )
        r.raise_for_status()
        data = r.json()

        access_token = "Bearer " + data["access_token"]

        timestamp = datetime.datetime.today().strftime("%Y%m%d%H%M%S")
        passkey = (
            "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
        )
        business_short_code = "174379"
        to_encode = business_short_code + passkey + timestamp
        encoded = base64.b64encode(to_encode.encode())
        password = encoded.decode("utf-8")

        payload = {
            "BusinessShortCode": business_short_code,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": business_short_code,
            "PhoneNumber": phone,
            "CallBackURL": "https://modcom.co.ke/api/confirmation.php",
            "AccountReference": "account",
            "TransactionDesc": "account",
        }

        stk_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        headers = {
            "Authorization": access_token,
            "Content-Type": "application/json",
        }

        resp = requests.post(stk_url, json=payload, headers=headers, timeout=30)
        resp.raise_for_status()

        return jsonify(
            {
                "message": "Please Complete Payment in Your Phone and we will deliver in minutes"
            }
        )

    except requests.RequestException as e:
        # This is what the frontend will receive (instead of a generic network error)
        return jsonify({"message": f"Payment gateway request failed: {str(e)}"}), 502
    except Exception as e:
        return jsonify({"message": f"Payment failed: {str(e)}"}), 500


if __name__ == "__main__":
    # Bind to all interfaces so remote frontends can reach the API
    app.run(debug=True, host="0.0.0.0", port=5000)

