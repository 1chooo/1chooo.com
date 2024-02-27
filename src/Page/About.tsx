import React from "react";
import {
  useLocation
} from 'react-router-dom';

import { aboutHeader } from "../Config/AboutData";

import NavBar from "../components/Navbar";
import Sidebar from "../components/SideBar/SideBar";
import AboutText from "../components/About/AboutText";
import LifeStyles from "../components/About/LifeStyles";
import Github from "../components/About/Github";
import TechStack from "../components/About/TechStack";
import Clients from "../components/About/Clients";


const About: React.FC = () => {

  const location = useLocation();

  return (
    <main>

      <Sidebar />
      <div className="main-content">

        <NavBar />

        <article
          className={`about ${location.pathname === '/' ? 'active' : ''}`}
          data-page="about"
        >

          <header>
            <h2 className="h2 article-title">
              {aboutHeader}
            </h2>
          </header>

          <AboutText />

          <TechStack />

          <LifeStyles />

          <Github />

          {/* <Clients /> */}

        </article>
      </div>
    </main>

  );
}

export default About;
