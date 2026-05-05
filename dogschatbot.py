from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

# load your data into a dataframe
df = pd.read_csv("pawsandhomes.csv")

# print(df)
print("SchoolBot: Hello! I am your school assistant. Ask me anything about the school.")

while True:
    # get the user input ans store the same into a variable
    user_text = input("\n You: ").lower()

    # check if the users want to exit
    if user_text == "quit":
        print("SchoolBot: Goodbye! Feel free to come back anytime.")
        break

    #create a variable that will store the details structured in the csv file
    found_answer = False

    #come up with a loop that loops through the entire data frame created before
    for index, row in df.iterrows():
        # clean up the key words from the csv row
        Keywords_list = str(row['Keywords']).split(',')

        # below we check every keyword in that given row (keywords)

        for word in Keywords_list:
            clean_word = word.strip().lower()

            #if the Keyword is inside of the users sentence what is going to be done next
            if clean_word in user_text:
                print("Healthbot:", row["Response"])
                found_answer = True
                break # stop looking at other key words

        if found_answer:
            break # stop looking at other answers since we already found a match

    # if we wentthrough the entire/whole csv file and never found a match of the keywords, 
    # we need to display a message to the user
    
    
    if not found_answer:
        print("SchoolBot: Sorry, I don’t understand that yet. Try asking something else.")


