# 🤖 AI-Powered Chat Application

A full-stack chat application with ML-powered intent classification using DistilBERT, featuring intelligent conversation flow and human intervention capabilities.

## 🏗️ Architecture Overview

The system implements an automated classification workflow with human intervention loops, as shown in the diagram below:

![workflow_diagram](https://github.com/user-attachments/assets/d9b70d85-fccb-4d7a-b288-885a5eba7fec)


## 🚀 Features

### 🤖 **Intelligent Chat Interface**
- **Real-time messaging** with smooth UI/UX
- **Quick response buttons** for common queries
- **Message rating system** for feedback collection
- **Auto-scroll functionality** with manual scroll option
- **Responsive design** with modern UI components

### 🧠 **ML-Powered Intent Classification**
- **DistilBERT model** for accurate intent prediction
- **Confidence-based responses** with different thresholds
- **Conversation context** for natural dialogue flow
- **Smart confirmation handling** (yes/no responses)
- **Prediction transparency** showing confidence scores

### 🔄 **Conversation Flow Management**
- **Context-aware responses** based on conversation history
- **Confirmation loops** for high-confidence predictions
- **Fallback mechanisms** for uncertain classifications
- **Session-based state management** for continuity

### 📊 **Feedback & Learning System**
- **Incorrect prediction reporting** for model improvement
- **Human intervention integration** for complex cases
- **Database logging** of misclassified cases
- **Continuous learning** from user feedback

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Query** for state management
- **Lucide React** for icons

### **Backend**
- **Flask** web framework
- **SQLAlchemy** ORM with PostgreSQL
- **Flask-Migrate** for database migrations
- **Flask-CORS** for cross-origin requests
- **Sessions** for conversation context

### **ML/AI**
- **Transformers** (Hugging Face)
- **PyTorch** for model inference
- **DistilBERT** for intent classification
- **NumPy & SciPy** for numerical computations

## 📁 Project Structure

```
asapp/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   └── QuickResponseButton.jsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useChat.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── pages/           # Page components
│   │   │   └── IndexWithBackend.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Flask backend application
│   ├── app/
│   │   ├── routes/          # API routes
│   │   │   ├── chatbot_routes.py
│   │   │   └── feedback_routes.py
│   │   ├── services/        # Business logic
│   │   │   └── nlp_service.py
│   │   ├── utils/           # Utility functions
│   │   │   ├── inference.py
│   │   │   └── predictor.py
│   │   ├── models.py        # Database models
│   │   └── __init__.py
│   ├── artifacts/           # Pre-trained model files
│   │   └── checkpoint-1728/
│   ├── requirements.txt
│   └── run.py
├── package.json             # Root package.json
├── start-dev.js            # Development server script
└── README.md
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL database

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd asapp
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install separately
   npm run install:frontend
   npm run install:backend
   ```

3. **Set up the database**
   ```bash
   cd backend
   # Create PostgreSQL database
   createdb support_bot
   
   # Run migrations
   flask db upgrade
   ```

4. **Start the application**
   ```bash
   # Run both frontend and backend
   npm run dev
   
   # Or run separately
   npm run start:backend  # Terminal 1
   npm run start:frontend # Terminal 2
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/support_bot

# Flask
SECRET_KEY=your-secret-key-here
FLASK_ENV=development

# Model
MODEL_PATH=artifacts/checkpoint-1728
```

### **Model Configuration**

The system uses a pre-trained DistilBERT model located in `backend/artifacts/checkpoint-1728/`. The model is automatically loaded when the backend starts.

## 📊 API Endpoints

### **Chat Endpoints**
- `POST /api/chat/` - Send message and get AI response
- `POST /api/feedback/report_incorrect` - Report incorrect predictions
- `POST /api/feedback/get_response` - Get response with context

### **Health Check**
- `GET /` - Backend health status

## 🧠 How It Works

### **1. Message Processing Flow**

1. **User Input** → Frontend captures user message
2. **API Call** → Message sent to backend with session context
3. **Preprocessing** → Text is cleaned and prepared
4. **Classification** → DistilBERT predicts intent with confidence score
5. **Context Handling** → System checks conversation context
6. **Response Generation** → Appropriate response based on confidence and context
7. **UI Update** → Frontend displays response with prediction details

### **2. Confidence Thresholds**

- **High Confidence (≥75%)**: Direct confirmation request
- **Medium Confidence (50-75%)**: Show top 2-3 options for selection
- **Low Confidence (<50%)**: Ask for clarification or human intervention

### **3. Conversation Context**

The system maintains conversation state to handle:
- **Confirmation responses** (yes/no)
- **Intent continuation** across multiple messages
- **Context clearing** after confirmation or new intent

## 🎯 Usage Examples

### **High Confidence Scenario**
```
User: "I want to cancel my flight"
Bot: "Looks like you want to Cancel Trip. Shall I proceed?"
User: "yes"
Bot: "Perfect! I'll help you with Cancel Trip. What specific details do you need?"
```

### **Medium Confidence Scenario**
```
User: "I need help with my booking"
Bot: "Do you want to Change Flight or Check Status or Cancel Trip?"
User: "Change Flight"
Bot: "I'll help you change your flight. What's your booking reference?"
```

### **Low Confidence Scenario**
```
User: "something about travel"
Bot: "I want to get this right - could you tell me if this is about your booking or luggage?"
User: "booking"
Bot: "I understand you're asking about bookings. What would you like to do with your booking?"
```

## 🔍 Development

### **Frontend Development**
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### **Backend Development**
```bash
cd backend
python run.py        # Start Flask server
flask db migrate     # Create migration
flask db upgrade     # Apply migrations
```

### **Testing**
```bash
# Test backend API
curl -X POST http://localhost:5000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Test frontend
npm run test
```

## 📈 Performance & Monitoring

### **Model Performance**
- **Inference Time**: ~100-200ms per prediction
- **Memory Usage**: ~500MB for model loading
- **Accuracy**: Depends on training data quality

### **System Monitoring**
- **Response Times**: Tracked in browser dev tools
- **Error Rates**: Logged in backend console
- **User Feedback**: Stored in database for analysis

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
