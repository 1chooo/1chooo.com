import React, {
  useState, useEffect
} from 'react';


import {
  MdExpandMore
} from "react-icons/md";
import {
  LuEye
} from "react-icons/lu";

import reactVcardPortfolioImage from "../../Assets/images/projects/react_vcard_portfolio.png";

const Posts: React.FC = () => {

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

        {/* 
        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Web design' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Web design')}
          >
            Web design
          </button>
        </li> 
        */}

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Applications' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Applications')}
          >
            Applications
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Web development' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Web development')}
          >
            Web development
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Line Bot' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Line Bot')}
          >
            Line Bot
          </button>
        </li>

        <li className="filter-item">
          <button
            className={`filter-btn ${selectedValue === 'Data Science' ? 'active' : ''}`}
            data-filter-btn
            onClick={() => handleItemClick('Data')}
          >
            Data Science
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

          {/* 
          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Web design')}
            >
              Web design
            </button>
          </li> 
          */}

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Applications')}
            >
              Applications
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Web development')}
            >
              Web development
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Line Bot')}
            >
              Line Bot
            </button>
          </li>

          <li className="select-item">
            <button
              data-select-item
              onClick={() => handleItemClick('Data Science')}
            >
              Data Science
            </button>
          </li>
        </ul>

      </div>

      <ul className="blog-posts-list">

        <li className="blog-post-item">
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="Design conferences in 2022"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Design conferences in 2022</h3>

              <p className="blog-text">
                Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
              </p>

            </div>

          </a>
        </li>

        <li className="blog-post-item">
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="Best fonts every designer"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Best fonts every designer</h3>

              <p className="blog-text">
                Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.
              </p>

            </div>

          </a>
        </li>

        <li className="blog-post-item">
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="Design digest #80"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Design digest #80</h3>

              <p className="blog-text">
                Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis
                suscipit.
              </p>

            </div>

          </a>
        </li>

        <li className="blog-post-item">
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="UI interactions of the week"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">UI interactions of the week</h3>

              <p className="blog-text">
                Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris
                nisi.
              </p>

            </div>

          </a>
        </li>

        <li className="blog-post-item">
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="The forgotten art of spacing"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">The forgotten art of spacing</h3>

              <p className="blog-text">
                Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

            </div>

          </a>
        </li>

        <li
          className="blog-post-item"
          data-filter-item
        >
          <a href="#">

            <figure className="blog-banner-box">
              <img
                src={reactVcardPortfolioImage}
                alt="Design digest #79"
                loading="lazy"
              />
            </figure>

            <div className="blog-content">

              <div className="blog-meta">
                <p className="blog-category">Design</p>

                <span className="dot"></span>

                <time dateTime="2022-02-23">Fab 23, 2022</time>
              </div>

              <h3 className="h3 blog-item-title">Design digest #79</h3>

              <p className="blog-text">
                Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.
              </p>

            </div>

          </a>
        </li>

      </ul>

    </section>
  );
}

export default Posts;
