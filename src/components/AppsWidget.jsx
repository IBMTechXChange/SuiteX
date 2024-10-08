import { Grip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import Link from 'next/link';

export default function AppsWidget() {
  const apps = [
    { id: 1, name: 'ConnectX', icon: '/logo.png' },
    { id: 2, name: 'MailX', icon: '/logo.png' },
    { id: 3, name: 'DocX', icon: '/logo.png' },
    { id: 4, name: 'CalendarX', icon: '/logo.png' },
    { id: 5, name: 'StoreX', icon: '/logo.png' },
    { id: 6, name: 'SuiteX', icon: '/logo.png' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='flex w-full gap-1 border'>
          <Grip className='h-5 w-5' />
          All Apps
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>All Apps</h2>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {apps.map((app) => (
            <Link key={app.id} href={`/${app.name.toLowerCase()}`} passHref>
              <div className='flex cursor-pointer flex-col items-center space-y-2'>
                <Image src={app.icon} alt={app.name} width={40} height={40} />
                <p className='text-sm font-medium'>{app.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
