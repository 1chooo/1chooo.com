import {
  IoSchoolOutline
} from "react-icons/io5";

import {
  ResumeProps,
  schools,
} from '../../Config/ResumeData';

const Education: React.FC = () => {
  return (
    <section className="timeline">

      <div className="title-wrapper">
        <div className="icon-box">
          <IoSchoolOutline />
        </div>

        <h3 className="h3">Education</h3>
      </div>

      <ol className="timeline-list">
        {schools.map((
          school: ResumeProps,
          index: number,
        ) => (
          <li className="timeline-item" key={index}>
            <h4 className="h4 timeline-item-title">{school.title}</h4>
            <span>{school.duration}</span>
            {school.description}
          </li>
        ))}
      </ol>


    </section>
  );
}

export default Education;
