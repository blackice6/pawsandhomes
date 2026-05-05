from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import difflib

app = Flask(__name__)
CORS(app)

# Load cleaned CSV once
df = pd.read_csv("pawsandhomes_clean.csv", on_bad_lines='skip')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data.get('message', '').lower().strip()
    
    if user_text == "quit":
        return jsonify({'response': "PawsBot: Goodbye! 🐾 Visit Paws & Homes anytime!"})
    
    # Try exact/keyword matches first
    for index, row in df.iterrows():
        keywords_str = str(row['Keywords']).lower()
        keywords = [k.strip() for k in keywords_str.split(',')]
        # Check contains or full phrase
        if any(keyword in user_text for keyword in keywords) or any(user_text in keyword for keyword in keywords):
            response = str(row["Response"]).replace("SchoolBot:", "PawsBot:").replace("Healthbot:", "PawsBot:")
            return jsonify({'response': response})
    
    # Fuzzy matching for close matches (>60% similarity)
    best_matches = []
    for index, row in df.iterrows():
        keywords_str = str(row['Keywords']).lower()
        keywords = [k.strip() for k in keywords_str.split(',')]
        for keyword in keywords:
            similarity = difflib.SequenceMatcher(None, keyword, user_text).ratio()
            if similarity > 0.6:
                best_matches.append((str(row["Response"]), similarity))
    
    if best_matches:
        # Pick best fuzzy match
        best_match = max(best_matches, key=lambda x: x[1])
        response = best_match[0].replace("SchoolBot:", "PawsBot:").replace("Healthbot:", "PawsBot:")
        return jsonify({'response': f"PawsBot: {response} (related to your query) 🐕"})
    
    # Smart fallback with Paws & Homes specifics
    return jsonify({
        'response': "PawsBot: 🐾 Welcome to Paws & Homes Rescue Center! Ask me about:\n• 'what is paws and homes' (about us)\n• 'adoption cost' or 'adoption process'\n• 'contacts' or 'visiting hours'\n• 'manager' or 'volunteer'\n• 'breeds' or 'vaccinations'\nType 'quit' to exit!"
    })

if __name__ == '__main__':
    print("PawsBot server starting on http://localhost:5000")
    print("Start with: npm start (React) + python chatbot_server.py (this server)")
    app.run(debug=True, port=5000)

