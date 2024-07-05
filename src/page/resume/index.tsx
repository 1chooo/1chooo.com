import React from "react";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/SideBar/SideBar";
import DownloadCV from "../../components/Resume/DownloadCV";
import Education from "../../components/Resume/Education";
import Working from "../../components/Resume/Working";
import Teaching from "../../components/Resume/Teaching";
import AwardLeaderships from "../../components/Resume/AwardLeaderships";
import Header from "../../components/Header";


import {
  useLocation
} from 'react-router-dom';


const Resume: React.FC = () => {

  const location = useLocation();

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <NavBar />
        <article
          className={`resume ${location.pathname === '/resume' ? 'active' : ''}`}
          data-page="resume"
        >
          <Header title="Hugo's Resume" />
          <DownloadCV />
          <Working />
          <Education />
          <AwardLeaderships />
          <Teaching />
        </article>
      </div>
    </main>
  );
}

export default Resume;

