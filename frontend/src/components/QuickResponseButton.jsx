import { Button } from "./ui/button";

const QuickResponseButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="h-auto py-3 px-5 text-primary border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-left whitespace-normal rounded-full shadow-sm hover:shadow-button"
    >
      {text}
    </Button>
  );
};

export default QuickResponseButton;



