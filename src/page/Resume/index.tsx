import React, {useEffect} from "react";
import NavBar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import DownloadCV from "../../components/resume/DownloadCV";
import Education from "../../components/resume/Education";
import Working from "../../components/resume/Working";
import Teaching from "../../components/resume/Teaching";
import AwardLeaderships from "../../components/resume/AwardLeaderships";
import Header from "../../components/Header";


import {
  useLocation
} from 'react-router-dom';


const Resume: React.FC = () => {

  const location = useLocation();
  useEffect(() => {
    document.title = "Resume - Hugo ChunHo Lin (1chooo) | Open Source Enthusiast";
  }, []);

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

