import React, {
  useState, 
  useEffect
} from 'react';


import {
  MdExpandMore
} from "react-icons/md";
import {
  LuEye
} from "react-icons/lu";


import {
  projectTags,
  projectsData,
  Project,
} from '../../Config/PortfolioData';


const Projects: React.FC = () => {

  // element toggle function
  const elementToggleFunc = (elem: HTMLElement) => {
    elem.classList.toggle("active");
  };

  // custom select variables
  const select: HTMLElement | null = document.querySelector("[data-select]");
  const selectItems: NodeListOf<HTMLElement> = document.querySelectorAll("[data-select-item]");
  const selectValue: HTMLElement | null = document.querySelector("[data-select-value]");
  const filterBtn: NodeListOf<HTMLElement> = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
    });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue: string = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      if (select) {
        elementToggleFunc(select);
      }
      filterFunc(selectedValue);
    });
  }

  // filter variables
  const filterItems: NodeListOf<HTMLElement> = document.querySelectorAll("[data-filter-item]");

  const filterFunc = (selectedValue: string) => {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  };

  // add event in all filter button items for large screen
  let lastClickedBtn: HTMLElement | null = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue: string = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }


  const [selectedValue, setSelectedValue] = useState('All');
  const [isActive, setIsActive] = useState(true); // 如果需要 isActive 的話

  useEffect(() => {
    // 在這裡可以執行初始化的邏輯
    // 例如：fetch 初始資料，或者設置預設的 selectedValue
    // 這裡只是一個範例，實際上需要依據你的需求進行修改
    // 這樣確保初始化時 'All' 有 'filter-btn active' 的樣式
    handleItemClick('All');
  }, []); // 空的 dependency array 確保只在初始化時執行

  const handleItemClick = (value: string) => {
    setIsActive(false);
    setSelectedValue(value);
  };

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
          className={`filter-select ${isActive ? 'active' : ''}`}
          data-select
          onClick={() => setIsActive(!isActive)}
        >
          <div className="select-value" data-select-value>
            {selectedValue || 'Select category'}
          </div>
          <div className="select-icon">
            <MdExpandMore />
          </div>
        </button>
        <ul className="select-list">
          {projectTags.map((tag, index) => (
            <li className="select-item" key={index}>
              <button
                data-select-item
                onClick={() => handleItemClick(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="project-list">
        {/* 使用 map 方法動態生成項目 */}
        {projectsData.map((
          project: Project,
          index: number
        ) => (
          <li
            className="project-item active"
            data-filter-item
            data-category={project.category.toLowerCase()} // 使用 project 中的 category 屬性
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
}

export default Projects;
