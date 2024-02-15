import React, {
  useState, useEffect
} from 'react';


import {
  MdExpandMore
} from "react-icons/md";


import {
  Post,
  postsData
} from '../Config/BlogData';


const BlogPosts: React.FC = () => {

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
    <section className="blog-posts">

      <ul className="filter-list">

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'All' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('All')}
          >
            All
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'DevOps' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('DevOps')}
          >
            DevOps
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Projects' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Projects')}
          >
            Projects
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Teaching' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Teaching')}
          >
            Teaching
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Technology' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Technology
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Interview' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Interview
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Unboxing' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Unboxing
          </button>
        </li>

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
          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('All')}
            >
              All
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('DevOps')}
            >
              DevOps
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Projects')}
            >
              Projects
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Teaching')}
            >
              Teaching
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Technology')}
            >
              Technology
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Interview')}
            >
              Interview
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Unboxing')}
            >
              Unboxing
            </button>
          </li>
        </ul>

      </div>

      <ul className="blog-posts-list">
        {postsData.map((
          post: Post,
          index: number
        ) => (
          <li
            key={index}
            className={`blog-post-item active`}
            data-filter-item
            data-category={post.category.toLowerCase()}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="blog-banner-box">
                <img
                  src={post.imageUrl}
                  alt={post.alt}
                  loading="lazy"
                />
              </figure>
              <div className="blog-content">
                <div className="blog-meta">
                  <p className="blog-category">{post.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                {post.title}
                {post.content}
              </div>
            </a>
          </li>
        ))}
      </ul>

    </section>
  );
}

export default BlogPosts;
