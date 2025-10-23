import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "./ui/button";

const ResponseRating = ({ messageId, onRate }) => {
  const [rating, setRating] = useState(null);

  const handleRate = (newRating) => {
    setRating(newRating);
    onRate?.(messageId, newRating);
  };

  return (
    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
      <span className="text-xs text-muted-foreground">Was this helpful?</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleRate("up")}
        className={`h-7 w-7 p-0 ${
          rating === "up" ? "text-primary bg-accent" : "text-muted-foreground"
        }`}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleRate("down")}
        className={`h-7 w-7 p-0 ${
          rating === "down" ? "text-primary bg-accent" : "text-muted-foreground"
        }`}
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default ResponseRating;
