'use client';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export default function Layout({ children }) {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className='px-4 py-12'>
      <Button
        onClick={goBack}
        variant='ghost'
        size='sm'
        className='mb-4 flex items-center'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Go Back
      </Button>
      {children}
    </div>
  );
}
