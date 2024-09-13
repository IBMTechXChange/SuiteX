'use client'

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function FlowBar() {
  const [inputValue, setInputValue] = useState('');

  // Dummy function to be executed
  const executeTask = () => {
    if (inputValue.trim()) {
      console.log('Task executed:', inputValue);
      // You can add more logic here based on your requirements
    } else {
      console.log('No input provided.');
    }
  };

  // Function to handle input change and adjust textarea height
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Automatically adjust the height of the textarea
    e.target.style.height = 'auto'; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
  };

  return (
    <div className="relative flex items-center w-full max-w-2xl p-4">
      {/* Textarea that grows with input */}
      <Textarea
        rows={1}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your task here"
        className="w-full max-h-40 min-h-[40px] pr-14 text-sm rounded-md shadow-md resize-none border border-primary focus:border-primary focus:ring-2 focus:ring-primary overflow-hidden transition-all duration-200"
        style={{ overflowY: inputValue ? 'auto' : 'hidden' }}
      />

      {/* Play Button inside Textarea */}
      <Button
        size="icon"
        className={`absolute right-4 bottom-4 h-10 w-10 p-2
        ${inputValue.trim() ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-primary/80 text-white/80'}`}
        onClick={executeTask}
        disabled={!inputValue.trim()} // Disable button when no input
      >
        <Play className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
}
