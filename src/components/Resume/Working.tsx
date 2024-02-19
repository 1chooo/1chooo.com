import {
  MdOutlineDevices,
} from "react-icons/md";

import {
  ResumeProps,
  careers
} from '../../Config/ResumeData';


const Working: React.FC = () => {
  return (
    <section className="timeline">

      <div className="title-wrapper">
        <div className="icon-box">
          <MdOutlineDevices />
        </div>

        <h3 className="h3">Working</h3>
      </div>

      <ol className="timeline-list">
        {careers.map((
          career: ResumeProps,
          index: number,
        ) => (
          <li className="timeline-item" key={index}>
            <h4 className="h4 timeline-item-title">{career.title}</h4>
            <span>{career.duration}</span>
            {career.description}
          </li>
        ))}
      </ol>

    </section>
  );
}

export default Working;
