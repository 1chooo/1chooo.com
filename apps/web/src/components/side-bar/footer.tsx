import React from "react";
import Link from "next/link";

import "@/styles/side-bar/footer.css";

// All rights reserved and subject to the Privacy Policy and Terms and Conditions.
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-copyright">© 2024 1chooo</div>
      <div className="footer-links">
        <Link
          href="https://docs.1chooo.com"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Docs
        </Link>
        <Link
          href="https://github.com/1chooo/1chooo.com"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Vcard Theme
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
