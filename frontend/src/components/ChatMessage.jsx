import { cn } from "@/lib/utils";
import ResponseRating from "./ResponseRating";

const ChatMessage = ({ 
  id, 
  message, 
  isUser, 
  timestamp, 
  showRating, 
  onRate,
  predictedLabel,
  predictedConfidence,
  allPredictions,
  optionsToShow
}) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-5 py-3.5 transition-all duration-300 shadow-card",
          isUser
            ? "gradient-primary text-primary-foreground shadow-button"
            : "bg-card text-card-foreground border border-border/50"
        )}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        
        {/* Show prediction data for bot messages */}
        {!isUser && predictedLabel && (
          <div className="mt-3 pt-3 border-t border-border/30">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Predicted: {predictedLabel}
              </span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Confidence: {(predictedConfidence * 100).toFixed(1)}%
              </span>
            </div>
            
            {/* Show all predictions if available */}
            {allPredictions && allPredictions.length > 1 && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">All predictions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {allPredictions.slice(0, 3).map(([label, score], index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {label} ({(score * 100).toFixed(1)}%)
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show options if available */}
            {optionsToShow && optionsToShow.length > 0 && (
              <div className="text-xs text-muted-foreground mt-2">
                <span className="font-medium">Suggested options:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {optionsToShow.map((option, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {showRating && !isUser && <ResponseRating messageId={id} onRate={onRate} />}
      </div>
    </div>
  );
};

export default ChatMessage;
