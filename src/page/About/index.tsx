import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

import { abouts } from "../../config/about";

import NavBar from "../../components/Navbar";
import Sidebar from "../../components/sideBar/SideBar";
import AboutText from "../../components/about/AboutText";
import LifeStyles from "../../components/about/LifeStyles";
import GitHubStats from "../../components/about/GitHubStats";
import TechStack from "../../components/about/TechStack";
import Header from "../../components/Header";


const About: React.FC = () => {

  const location = useLocation();
  useEffect(() => {
    document.title = "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <NavBar />
        <article
          className={`about ${location.pathname === '/' ? 'active' : ''}`}
          data-page="about"
        >
          <Header title={abouts.header} />
          <AboutText />
          <GitHubStats />
          <TechStack />
          <LifeStyles />
        </article>
      </div>
    </main>
  );
}

export default About;
