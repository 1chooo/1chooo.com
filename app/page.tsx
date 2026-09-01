import { CobeGlobe } from "@/components/bio/cobe-globe";
import Navbar from "@/components/layout/navbar";
import { HomeMain } from "@/components/layout/home-main";

export default function Home() {
  return (
    <div className="flex flex-col mobile:flex-row">
      <Navbar />
      <HomeMain>
        <h1 className="font-semibold mb-7 text-rurikon-600 text-balance">Lin Hugo</h1>
        <p>I <a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="/bio">build software and write</a> about it. Studying Computer Science at <a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://viterbischool.usc.edu/">USC Viterbi</a>.</p>
        <p className="mt-7">By day, I design and build scalable, high-quality software systems. On weekends, I&apos;m a photographer capturing the human touch in fleeting moments.</p>
        <p className="mt-7">Explore more through my <a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="/projects">projects</a> or <a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://github.com/1chooo">code</a>.</p>
        <CobeGlobe showList={false} />
      </HomeMain>
    </div>
  );
}
