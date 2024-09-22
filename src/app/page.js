/* eslint-disable @next/next/no-img-element */
import FlowBar from '@/components/FlowBar';
import { cn } from '@/lib/utils';
import GridPattern from '@/components/ui/grid-pattern';

const Home = () => {
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
        </section>
      </div>
    </>
  );
};

export default Home;
