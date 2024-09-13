import FlowBar from "@/components/FlowBar";
import Image from "next/image";

export default function Home() {
  return (
    <section className='flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-center'>
      <div className="py-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-5xl"> Automate <span className="italic"> your </span> workflow</h1>
        <p className="text-2xl font-semibold text-primary sm:text-4xl">Make work 10x <span className="italic"> faster </span> </p>
      </div>
      <FlowBar />
    </section>
  );
}
