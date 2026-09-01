"use client";

import { useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";

interface GitHubMapProps {
  username: string;
  year?: number | "last";
}

const rurikonTheme = {
  light: ["#ebedef", "#b3b9c1", "#8c95a1", "#4a515b", "#1e2125"],
  dark: ["#ebedef", "#b3b9c1", "#8c95a1", "#4a515b", "#1e2125"],
};

function getGitHubProfileYearUrl(username: string, year: number) {
  return `https://github.com/${username}?tab=overview&from=${year}-01-01&to=${year}-12-31`;
}

function linkYearInCountFooter(
  container: HTMLElement,
  username: string,
  year: number,
) {
  const countEl = container.querySelector(".react-activity-calendar__count");
  if (!countEl || countEl.querySelector("a")) return;

  const yearStr = String(year);
  const text = countEl.textContent ?? "";
  if (!text.includes(yearStr)) return;

  const [before, after = ""] = text.split(yearStr);
  countEl.replaceChildren(
    document.createTextNode(before),
    Object.assign(document.createElement("a"), {
      href: getGitHubProfileYearUrl(username, year),
      target: "_blank",
      rel: "noreferrer",
      textContent: yearStr,
      className:
        "cursor-pointer underline decoration-rurikon-400/50 underline-offset-2 hover:decoration-rurikon-600 transition-colors",
    }),
    document.createTextNode(after),
  );
}

function GitHubMap({ year = "last", username = "1chooo" }: GitHubMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof year !== "number") return;

    const container = containerRef.current;
    if (!container) return;

    const linkYear = () => linkYearInCountFooter(container, username, year);

    linkYear();
    const observer = new MutationObserver(linkYear);
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [username, year]);

  return (
    <div ref={containerRef}>
      <GitHubCalendar
        year={year}
        username={username}
        blockSize={12}
        blockMargin={4}
        blockRadius={2}
        fontSize={14}
        theme={rurikonTheme}
        className="my-8 border-rurikon-border p-4 border"
        style={{ fontWeight: "bold" }}
      />
    </div>
  );
}

export { GitHubMap };
