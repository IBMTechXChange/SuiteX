import { Bookmark, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function AlertWidget() {
  const notifications = [
    {
      id: 1,
      message: 'New file uploaded by John in StoreX',
      time: '2 minutes ago',
    },
    {
      id: 2,
      message: 'You have a new task assigned in CalX',
      time: '1 hour ago',
    },
    { id: 3, message: 'Document approved in DocX', time: '3 hours ago' },
    { id: 4, message: 'Meeting scheduled via ConnectX', time: '5 hours ago' },
    {
      id: 5,
      message: 'New comment on your document in DocX',
      time: '1 day ago',
    },
    {
      id: 6,
      message: 'Reminder: Upcoming team meeting in ConnectX',
      time: '1 day ago',
    },
    {
      id: 7,
      message: 'Your StoreX storage is nearing capacity',
      time: '2 days ago',
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='relative w-full gap-2 p-2'>
          <Bookmark className='h-5 w-5' />
          <span className='absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500' />
          <span className=''> Flows </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Saved Flows</h2>
        </div>
        <ScrollArea className='h-[300px] overflow-y-auto'>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className='mb-4 rounded-lg border p-3 shadow-md transition-colors last:mb-0 hover:bg-accent'
            >
              <p className='text-sm font-medium'>{notification.message}</p>
              <p className='mt-1 text-xs text-muted-foreground'>
                {notification.time}
              </p>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
