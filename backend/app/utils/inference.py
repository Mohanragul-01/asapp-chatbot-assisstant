import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import json
from scipy.special import softmax

MODEL_PATH = "artifacts/checkpoint-1728"

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

# Load label map
try:
    id2label = json.load(open(f"{MODEL_PATH}/label_map.json"))
    id2label = {int(k): v for k, v in id2label.items()}
except Exception:
    id2label = model.config.id2label

def predict_intent_flask(text, top_k=5, temperature=1.0):
    enc = tokenizer(text, truncation=True, padding=True, max_length=64, return_tensors="pt")
    with torch.no_grad():
        logits = model(**enc).logits / temperature
    probs = softmax(logits.numpy(), axis=-1)[0]
    order = np.argsort(-probs)[:top_k]
    results = [(id2label[i], float(probs[i])) for i in order]
    return results
