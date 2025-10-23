import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex gap-2 items-center bg-card rounded-full px-3 py-2 shadow-sm transition-all duration-200 ${
      isFocused ? 'border-2 border-primary shadow-md' : 'border border-border'
    }`}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter your message..."
        disabled={disabled}
        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 focus:outline-none px-2 flex-1"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        size="sm"
        className="h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 flex justify-center items-center cursor-pointer"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatInput;
