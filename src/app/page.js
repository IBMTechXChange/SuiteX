import FlowBar from '@/components/FlowBar';
import { cn } from '@/lib/utils';
import GridPattern from '@/components/ui/grid-pattern';

const Home = () => {
  return (
    <div className='relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden text-center'>
      <GridPattern
        width={60} // Increase the size for better visibility
        height={60}
        x={0}
        y={0}
        className={cn(
          'absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom_right,rgba(0,0,0,0.2),rgba(0,0,0,1))]'
        )}
      />
      <section className='relative z-10'>
        <div className='py-6'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900 sm:text-5xl'>
            Automate <span className='italic'>your</span> workflow
          </h1>
          <p className='text-2xl font-semibold text-primary sm:text-4xl'>
            Make work 10x <span className='italic'>faster</span>
          </p>
        </div>
        <FlowBar />
      </section>
    </div>
  );
};

export default Home;
