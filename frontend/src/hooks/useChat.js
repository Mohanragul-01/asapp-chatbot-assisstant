import { useState } from 'react';
import apiService from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.sendMessage(content);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.bot_response,
        isUser: false,
        timestamp: new Date(),
        predictedLabel: response.predicted_label,
        predictedConfidence: response.predicted_confidence,
        allPredictions: response.all_predictions,
        optionsToShow: response.options_to_show,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reportIncorrectPrediction = async (messageId, correctLabel) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    try {
      await apiService.reportIncorrectPrediction({
        user_message: message.content,
        predicted_label: message.predictedLabel,
        correct_label: correctLabel,
      });
    } catch (error) {
      console.error('Error reporting incorrect prediction:', error);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    reportIncorrectPrediction,
    clearMessages,
  };
};
