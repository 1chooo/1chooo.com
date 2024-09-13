import React from "react";
import "@/styles/side-bar/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-copyright">© 2024 1chooo</div>
      <div className="footer-links">
        <a href="https://docs.1chooo.com">Docs</a>
        <a href="https://github.com/1chooo/1chooo.com">Vcard Theme</a>
      </div>
    </footer>
  );
};

export default Footer;
