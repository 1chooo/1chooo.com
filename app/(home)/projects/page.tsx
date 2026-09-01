import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects" };

const projects = [
  ["1chooo.com", "https://1chooo.com", "A personal site built with Next.js and Tailwind CSS."],
  ["JustHold", "https://justhold.1chooo.com", "Independent market research for long-term thinkers."],
  ["Tawny", "https://tawny.1chooo.com", "A collection of handcrafted web designs and reusable UI components."],
  ["PowLaw", "https://github.com/powlaw", "A project about the power law of self-growth."],
  ["VCard", "https://github.com/1chooo/portfolio", "An open-source portfolio template."],
] as const;

export default function ProjectsPage() {
  return (
    <article className="max-w-2xl">
      <h1 className="font-semibold mb-7 text-rurikon-600">Projects</h1>
      <div className="space-y-10">
        {projects.map(([name, href, description]) => (
          <section key={name}>
            <h2 className="font-semibold text-rurikon-600"><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href={href}>{name}</a></h2>
            <p className="mt-3">{description}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
