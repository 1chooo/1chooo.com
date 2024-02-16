import { PiBooks } from "react-icons/pi";

import {
  ResumeProps,
  courses
} from '../Config/ResumeData';


const Teaching: React.FC = () => {

  const items: String[] = [
    'Item 1',
    'Item 2',
    'Item 3'
  ];
  const symbol: String = '☁️';

  return (
    <section className="timeline">

      <div className="title-wrapper">
        <div className="icon-box">
          <PiBooks />
        </div>

        <h3 className="h3">Teaching</h3>
      </div>

      <ol className="timeline-list">
        {courses.map((course: ResumeProps, index: number) => (
          <li className="timeline-item" key={index}>
            <h4 className="h4 timeline-item-title">{course.title}</h4>
            <span>{course.duration}</span>
            {course.description}
          </li>
        ))}
      </ol>

    </section>
  );
}

export default Teaching;
