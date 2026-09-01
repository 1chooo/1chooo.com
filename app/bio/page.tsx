import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Life in Five Minutes" };

export default function BioPage() {
  return (
    <article className="max-w-2xl">
      <h1 className="font-semibold mb-7 text-rurikon-600">My Life in Five Minutes</h1>
      <blockquote className="border-l-2 border-rurikon-200 pl-4 italic text-rurikon-600">You are too focused on the future without realizing that today is exactly what you prayed for years ago.</blockquote>
      <p className="mt-7">I&apos;m Lin Hugo — a software builder pursuing a Master of Science in Computer Science at the <a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://viterbischool.usc.edu/">USC Viterbi School of Engineering</a>. I care deeply about quality, reliability, and efficiency in web development and large-scale software systems.</p>
      <p className="mt-7">I studied Atmospheric Sciences at National Central University in Taiwan, with a minor specialty in Programming Design, and graduated in June 2024.</p>
      <h2 className="font-semibold mt-14 mb-7 text-rurikon-600">Work</h2>
      <ul className="list-disc pl-5 space-y-4 marker:text-rurikon-200">
        <li><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://www.hayden.ai">Hayden AI</a> — Software Engineer Intern, San Francisco Bay Area, Summer 2026.</li>
        <li><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://futurenest.ai">Futurenest</a> — R&amp;D Engineer Intern, 2025.</li>
        <li><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://www.ecloudvalley.com">eCloudvalley</a> — Cloud Engineer Intern, 2024.</li>
        <li><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href="https://www.pegatron.com">PEGATRON</a> — AI Engineer Intern, 2023.</li>
      </ul>
      <h2 className="font-semibold mt-14 mb-7 text-rurikon-600">Beyond code</h2>
      <p>I shoot film and digital photography — mostly street and travel — and enjoy visiting art museums, making procedural visual experiments, and finding a little more room to notice the world.</p>
    </article>
  );
}
