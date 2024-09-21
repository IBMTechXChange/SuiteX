'use client';

import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import Spinner from './Spinner';

export default function FlowBar() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Function to send the API request and get the response
  const executeTask = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "No input provided",
        description: "Please enter a task before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://suitex-autobar.onrender.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      console.log('API Response:', data.response);

      // Store the API response in localStorage
      localStorage.setItem('apiResponse', data.response);

      // Redirect to the /flow page
      router.push('/flow');
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "An error occurred",
        description: "Failed to fetch response from server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className='relative flex w-full max-w-2xl items-center p-4'>
      <Textarea
        rows={1}
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Enter your task here'
        className='max-h-40 min-h-[40px] w-full resize-none overflow-hidden rounded-md border border-primary bg-white pr-14 text-sm shadow-md transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary'
        style={{ overflowY: inputValue ? 'auto' : 'hidden' }}
      />

      <Button
        size='icon'
        className={`absolute bottom-4 right-4 h-10 w-10 p-2 ${inputValue.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-primary/80 text-white/80'}`}
        onClick={executeTask}
        disabled={!inputValue.trim() || loading}
      >
        {loading ? <Spinner size={20}/>: <Play className='h-4 w-4' />}
        <span className='sr-only'>Send message</span>
      </Button>
    </div>
  );
}