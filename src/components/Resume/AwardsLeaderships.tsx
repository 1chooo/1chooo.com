import { PiTrophy } from "react-icons/pi";
import { GrTrophy } from "react-icons/gr";


const AwardsLeaderships: React.FC = () => {
  return (
    <section className="timeline">

      <div className="title-wrapper">
        <div className="icon-box">
          <PiTrophy />
        </div>

        <h3 className="h3">Award & Leaderships</h3>
      </div>

      <ol className="timeline-list">

        <li className="timeline-item">

          <h4 className="h4 timeline-item-title">
            2023 Weather Hackathon
          </h4>

          <span>May, 2023 - Aug, 2023</span>

          <p className="timeline-text">
            2nd Place
          </p>

          <p className="timeline-text">
            GitHub: <a
              href="https://github.com/Weather-Shakespeare/"
              target="_blank"
              className="code-highlight-yellow"
              rel="noreferrer"
            >
              Weather Shakespeare
            </a>
          </p>

        </li>


      </ol>

    </section>
  );
}

export default AwardsLeaderships;
