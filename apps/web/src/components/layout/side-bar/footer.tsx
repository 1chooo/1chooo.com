import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-4 px-8 text-center text-sm text-light-gray">
      <div className="mb-2">
        &copy; 2024 - 2025{" "}
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://1chooo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          1chooo
        </Link>
      </div>
      <div className="space-x-4">
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://github.com/1chooo/1chooo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vcard
        </Link>
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://docs.1chooo.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </Link>
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://docs.1chooo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
