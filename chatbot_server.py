from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load CSV once
df = pd.read_csv("pawsandhomes.csv", on_bad_lines='skip')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data.get('message', '').lower()
    
    if user_text == "quit":
        return jsonify({'response': "PawsBot: Goodbye! Feel free to come back anytime."})
    
    found_answer = False
    for index, row in df.iterrows():
        Keywords_list = str(row['Keywords']).split(',')
        for word in Keywords_list:
            clean_word = word.strip().lower()
            if clean_word in user_text:
                response = str(row["Response"]).replace("SchoolBot:", "PawsBot:").replace("Healthbot:", "PawsBot:")
                found_answer = True
                return jsonify({'response': response})
        if found_answer:
            break
    
    return jsonify({'response': "PawsBot: Sorry, I don't understand that yet. Try asking about adoption, contacts, or our center!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
