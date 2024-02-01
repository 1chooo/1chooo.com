import React, { FunctionComponent } from "react";
import {
  useLocation
} from 'react-router-dom';

import NavBar from "../Navbar";
import Sidebar from "../SideBar/SideBar";
import AboutHeader from "./AboutHeader";
import AboutText from "./AboutText";
import LifeStyles from "./LifeStyles";
import Github from "./Github";
import Clients from "./Clients";

const About: FunctionComponent = ({ }) => {

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
          <AboutHeader />

          <AboutText />

          <LifeStyles />

          <Github />

          <Clients />

        </article>
      </div>
    </main>

  );
}

export default About;
