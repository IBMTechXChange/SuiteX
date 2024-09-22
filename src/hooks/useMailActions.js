'use client';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useMailActions = () => {
  const [mailLoading, setMailLoading] = useState({ edit: false, send: false });
  const [mailSent, setMailSent] = useState(false);
  const { toast } = useToast();

  const handleMailEdit = async () => {
    setMailLoading((prev) => ({ ...prev, edit: true }));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMailLoading((prev) => ({ ...prev, edit: false }));
    toast({
      title: 'Mail Edited',
      description: 'Your mail has been successfully edited.',
    });
    console.log('Mail edited');
  };

  const handleMailSend = async () => {
    setMailLoading((prev) => ({ ...prev, send: true }));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMailLoading((prev) => ({ ...prev, send: false }));
    setMailSent(true);
    toast({
      title: 'Mail Sent',
      description: 'Your mail has been successfully sent.',
    });
    console.log('Mail Sent');
    setTimeout(() => setMailSent(false), 2000);
  };

  return { mailLoading, mailSent, handleMailEdit, handleMailSend };
};
