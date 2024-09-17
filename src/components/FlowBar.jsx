'use client';

import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function FlowBar() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter(); // Initialize the router

  // Dummy function to be executed
  const executeTask = () => {
    if (inputValue.trim()) {
      console.log('Task executed:', inputValue);

      // Redirect to the /flow page after task execution
      router.push('/flow');

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
    <div className='relative flex w-full max-w-2xl items-center p-4'>
      {/* Textarea that grows with input */}
      <Textarea
        rows={1}
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter your task here'
        className='max-h-40 min-h-[40px] w-full resize-none overflow-hidden rounded-md border border-primary bg-white pr-14 text-sm shadow-md transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary'
        style={{ overflowY: inputValue ? 'auto' : 'hidden' }}
      />

      {/* Play Button inside Textarea */}
      <Button
        size='icon'
        className={`absolute bottom-4 right-4 h-10 w-10 p-2 ${inputValue.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-primary/80 text-white/80'}`}
        onClick={executeTask}
        disabled={!inputValue.trim()} // Disable button when no input
      >
        <Play className='h-4 w-4' />
        <span className='sr-only'>Send message</span>
      </Button>
    </div>
  );
}
