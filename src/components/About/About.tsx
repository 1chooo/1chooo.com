import React from "react";
import {
  useLocation
} from 'react-router-dom';

import { aboutHeader } from "../../Config/AboutData";

import NavBar from "../Navbar";
import Sidebar from "../SideBar/SideBar";
import AboutText from "./AboutText";
import LifeStyles from "./LifeStyles";
import Github from "./Github";
import TechStack from "./TechStack";
import Clients from "./Clients";


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
