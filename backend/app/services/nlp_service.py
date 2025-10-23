def predict_intent(user_message):
    # Dummy prediction (replace with your model)
    if "book" in user_message.lower():
        return "BookFlight", "Sure! Can you provide your travel dates?"
    elif "status" in user_message.lower():
        return "FlightStatus", "Please provide your flight number."
    else:
        return "Unknown", "I'm not sure I understand. Could you rephrase?"
