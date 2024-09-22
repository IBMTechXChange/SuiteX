import React from 'react';
import { Mail, Edit, Send, Loader2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MailCard = ({ mailData, mailLoading, mailSent, onEdit, onSend }) => {
  return (
    <Card className='bg-purple-100'>
      <CardHeader>
        <h3 className='flex items-center text-xl font-bold text-purple-800'>
          <Mail className='mr-2' /> Mail X
        </h3>
      </CardHeader>
      <CardContent>
        <p className='font-semibold text-purple-600'>{mailData.subject}</p>
        <p className='mt-2 text-purple-700'>{mailData.body}</p>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        <Button
          onClick={onEdit}
          variant='outline'
          size='sm'
          disabled={mailLoading.edit || mailLoading.send}
        >
          {mailLoading.edit ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Edit className='mr-2 h-4 w-4' />
          )}
          {mailLoading.edit ? 'Editing...' : 'Edit'}
        </Button>
        <Button
          onClick={onSend}
          variant='outline'
          size='sm'
          disabled={mailLoading.edit || mailLoading.send}
        >
          {mailLoading.send ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <Send className='mr-2 h-4 w-4' />
          )}
          {mailLoading.send ? 'Sending...' : mailSent ? 'Sent' : 'Send'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MailCard;
