from app.utils.inference import predict_intent_flask

T_HIGH = 0.75
T_MID = 0.5

def generate_response(message, conversation_context=None):
    top_classes = predict_intent_flask(message, top_k=3)
    top1_class, top1_score = top_classes[0]

    # Handle short responses and confirmations
    message_lower = message.lower().strip()
    
    # Check if we have conversation context and user is confirming
    if conversation_context and conversation_context.get('awaiting_confirmation'):
        if message_lower in ['yes', 'y', 'yeah', 'yep', 'sure', 'ok', 'okay']:
            # User confirmed, proceed with the previous intent
            confirmed_intent = conversation_context.get('pending_intent', 'Unknown')
            response = f"Perfect! I'll help you with {confirmed_intent}. What specific details do you need?"
            options_to_show = [confirmed_intent]
            # Clear the context
            conversation_context['awaiting_confirmation'] = False
            conversation_context['pending_intent'] = None
        elif message_lower in ['no', 'n', 'nope', 'not really']:
            response = "No problem! What else can I help you with today?"
            options_to_show = []
            # Clear the context
            conversation_context['awaiting_confirmation'] = False
            conversation_context['pending_intent'] = None
        else:
            # User gave a different response, treat as new intent
            if top1_score >= T_HIGH:
                response = f"Looks like you want to {top1_class}. Shall I proceed?"
                options_to_show = [top1_class]
                conversation_context['awaiting_confirmation'] = True
                conversation_context['pending_intent'] = top1_class
            elif top1_score >= T_MID:
                top_classes_text = " or ".join([cls for cls, _ in top_classes[:3]])
                response = f"Do you want to {top_classes_text}?"
                options_to_show = [cls for cls, _ in top_classes[:3]]
            else:
                response = "I want to get this right - could you tell me if this is about your booking or luggage?"
                options_to_show = []
    else:
        # No context or not a confirmation scenario
        if message_lower in ['yes', 'y', 'yeah', 'yep', 'sure', 'ok', 'okay']:
            response = "Great! I'd be happy to help. What would you like to do?"
            options_to_show = []
        elif message_lower in ['no', 'n', 'nope', 'not really']:
            response = "No problem! How else can I assist you today?"
            options_to_show = []
        elif message_lower in ['booking', 'bookings', 'flight', 'flights']:
            response = "I understand you're asking about bookings. What would you like to do with your booking?"
            options_to_show = ['Cancel Trip', 'Change Flight', 'Check Status']
        elif message_lower in ['luggage', 'baggage', 'bags']:
            response = "I can help you with luggage-related questions. What do you need to know about your baggage?"
            options_to_show = ['Baggage Policy', 'Lost Luggage', 'Baggage Fees']
        elif top1_score >= T_HIGH:
            response = f"Looks like you want to {top1_class}. Shall I proceed?"
            options_to_show = [top1_class]
            # Set context for confirmation
            if conversation_context is not None:
                conversation_context['awaiting_confirmation'] = True
                conversation_context['pending_intent'] = top1_class
        elif top1_score >= T_MID:
            top_classes_text = " or ".join([cls for cls, _ in top_classes[:3]])
            response = f"Do you want to {top_classes_text}?"
            options_to_show = [cls for cls, _ in top_classes[:3]]
        else:
            response = "I want to get this right - could you tell me if this is about your booking or luggage?"
            options_to_show = []

    return {
        "response_text": response,
        "top1_class": top1_class,
        "top1_score": top1_score,
        "options_to_show": options_to_show,
        "all_predictions": top_classes,
        "conversation_context": conversation_context or {}
    }
