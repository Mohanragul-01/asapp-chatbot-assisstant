import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const ChatContainer = ({ messages, onRate }) => {
  const scrollAreaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

  const scrollToBottomImmediate = () => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      // Try multiple approaches to ensure scrolling works
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
      
      // Fallback: scroll the container itself
      if (scrollAreaRef.current.scrollTo) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const timer1 = setTimeout(() => {
      scrollToBottom();
    }, 50);
    
    const timer2 = setTimeout(() => {
      scrollToBottomImmediate();
    }, 100);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [messages]);

  // Check if user has scrolled up to show scroll button
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 0);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [messages.length]);

  return (
    <div className="relative h-full">
      <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
        <div className="space-y-4 py-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              showRating={!message.isUser && index === messages.length - 1}
              onRate={onRate}
              predictedLabel={message.predictedLabel}
              predictedConfidence={message.predictedConfidence}
              allPredictions={message.allPredictions}
              optionsToShow={message.optionsToShow}
            />
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
      </ScrollArea>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          onClick={scrollToBottom}
          size="sm"
          className="absolute bottom-4 right-4 z-10 rounded-full shadow-lg"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatContainer;
