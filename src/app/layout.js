import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

export const metadata = {
  title: 'SuiteX',
  description: 'Automate your workflow. Be 10x faster.',
  icons: [{ rel: 'icon', url: '/logo.png' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='p-2'>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
