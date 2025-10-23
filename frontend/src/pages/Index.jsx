import { useState } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatInput from "@/components/ChatInput";
import QuickResponseButton from "@/components/QuickResponseButton";
import { useToast } from "@/hooks/use-toast";
import { Plane } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const quickResponses = [
  "Hello, how can I help you?",
  "What services do you offer?",
  "I need support with my account",
  "Can you provide more information?",
];

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const { toast } = useToast();

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowQuickResponses(false);
    setIsLoading(true);

    // TODO: Implement actual message handling
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: "Message received. This is a placeholder response.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickResponse = (text) => {
    handleSendMessage(text);
  };

  const handleRate = (messageId, rating) => {
    toast({
      title: "Thank you for your feedback!",
      description: "Your rating helps us improve our service.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Plane className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  Chat Application
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto max-w-4xl flex flex-col overflow-hidden">
        <ChatContainer messages={messages} onRate={handleRate} />

        {/* Quick Response Buttons */}
        {showQuickResponses && messages.length === 0 && (
          <div className="px-4 pb-4 space-y-2 animate-fade-in">
            <p className="text-xs text-muted-foreground mb-3">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <QuickResponseButton
                  key={index}
                  text={response}
                  onClick={() => handleQuickResponse(response)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
