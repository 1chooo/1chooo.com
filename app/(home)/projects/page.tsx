import type { Metadata } from "next";

import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source and personal projects.",
  alternates: {
    canonical: "/projects",
    types: {
      "text/markdown": "/llm/projects",
    },
  },
};

export default function ProjectsPage() {
  return (
    <article className="max-w-2xl">
      <h1 className="font-semibold mb-7 text-rurikon-600">Projects</h1>
      <div className="space-y-10">
        {PROJECTS.map(([name, href, description]) => (
          <section key={name}>
            <h2 className="font-semibold text-rurikon-600"><a className="underline decoration-rurikon-300 hover:decoration-rurikon-600" href={href}>{name}</a></h2>
            <p className="mt-3">{description}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
