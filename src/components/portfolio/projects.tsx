import React, { useState, useEffect } from 'react';
import { MdExpandMore } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { projectTags, projectsData, Project } from '../../Config/PortfolioData';


const Projects: React.FC = () => {

  const [selectedValue, setSelectedValue] = useState('All');
  const [isSelectActive, setIsSelectActive] = useState(false);

  useEffect(() => {
    handleItemClick('All');
  }, []);

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
  };

  const filterFunc = (selectedValue: string) => {
    return selectedValue === 'All'
      ? projectsData
      : projectsData.filter((post) => post.category.toLowerCase() === selectedValue.toLowerCase());
  };

  const filteredProjects = filterFunc(selectedValue);

  return (
    <section className="projects">

      <ul className="filter-list">
        {projectTags.map((tag, index) => (
          <li className="filter-item" key={index}>
            <button
              className={`filter-btn ${selectedValue === tag ? 'active' : ''}`}
              data-filter-btn
              onClick={() => handleItemClick(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>

      <div className="filter-select-box">
        <button
          className={`filter-select ${isSelectActive ? 'active' : ''}`}
          onClick={() => setIsSelectActive(!isSelectActive)}
        >
          <div className="select-value">
            {selectedValue || 'Select category'}
          </div>
          <div className="select-icon">
            <MdExpandMore />
          </div>
        </button>
        {isSelectActive && (
          <ul className="select-list">
            {projectTags.map((tag, index) => (
              <li className="select-item" key={index}>
                <button onClick={() => {
                  handleItemClick(tag);
                  setIsSelectActive(false);
                }}>
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="project-list">
        {filteredProjects.map((project: Project, index: number) => (
          <li
            className="project-item active"
            data-filter-item
            data-category={project.category.toLowerCase()}
            key={index}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="project-img">
                <div className="project-item-icon-box">
                  <LuEye />
                </div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                />
              </figure>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-category">{project.category}</p>
            </a>
          </li>
        ))}
      </ul>

    </section>
  );
};

export default Projects;