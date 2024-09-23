'use client';
import FlowBar from '@/components/FlowBar';
import { cn } from '@/lib/utils';
import GridPattern from '@/components/ui/grid-pattern';
import { useState, useEffect } from 'react';

const Home = () => {
  const examplePrompts = [
    'Schedule a meeting for October 16th at 2 PM for an orientation session on the new HR rules.',
    'Assign John and Sarah to the marketing campaign tasks and draft an email to the team outlining their responsibilities.',
    'Create a team-building event for Friday, November 10th at 10 AM, and send an email invite to the team with an attached agenda.',
    'Set up a weekly sync meeting every Monday at 10 AM for the sales team and include a meeting link.',
    'Create a shared document for the new product launch strategy and send an email to Jane asking for her feedback by Friday.',
  ];

  const [currentPrompt, setCurrentPrompt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt((prev) => (prev + 1) % examplePrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden text-center'>
        <GridPattern
          width={60}
          height={60}
          x={0}
          y={0}
          className={cn(
            'absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom_right,rgba(0,0,0,0.2),rgba(0,0,0,1))]'
          )}
        />
        <section className='z-10'>
          <div className='py-6'>
            <h1 className='relative mb-2 text-3xl font-bold text-gray-900 sm:text-5xl'>
              Automate <span className='italic'>your</span> workflow
              <div className='absolute -left-8 -top-24 hidden -rotate-12 rounded-xl bg-white py-0.5 pl-2 sm:block'>
                <img
                  src={'/applogos/connectx.svg'}
                  alt='ConnectX'
                  className='h-12 w-12'
                />
              </div>
              <div className='absolute -top-32 left-24 hidden -rotate-12 rounded-xl bg-white p-2 sm:block'>
                <img
                  src={'/applogos/mailx.svg'}
                  alt='MailX'
                  className='h-10 w-10'
                />
              </div>
              <div className='absolute -top-36 left-[240px] hidden rounded-xl bg-white p-2 sm:block'>
                <img
                  src={'/applogos/docx.svg'}
                  alt='DocX'
                  className='h-10 w-10'
                />
              </div>
              <div className='absolute -top-32 right-24 hidden rotate-6 rounded-xl bg-white pl-2 pt-2 sm:block'>
                <img
                  src={'/applogos/calx.svg'}
                  alt='CalX'
                  className='h-12 w-12'
                />
              </div>
              <div className='absolute -right-8 -top-24 hidden rotate-12 rounded-xl bg-white p-2 sm:block'>
                <img
                  src={'/applogos/storex.svg'}
                  alt='StoreX'
                  className='h-10 w-10'
                />
              </div>
            </h1>
            <p className='text-2xl font-semibold text-primary sm:text-4xl'>
              Make work 10x <span className='italic'>faster</span>
            </p>
          </div>
          <FlowBar />

          <div className='mt-6'>
            <div className='relative h-12'>
              {examplePrompts.map((prompt, index) => (
                <p
                  key={index}
                  className={`absolute left-0 right-0 text-lg font-medium italic text-gray-700 transition-opacity ${
                    index === currentPrompt
                      ? 'animate-slideUpFade'
                      : 'opacity-0'
                  }`}
                >
                  "{prompt}"
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }

        .animate-slideUpFade {
          animation: slideUpFade 4s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Home;
