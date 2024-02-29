import React, {
  useState,
} from 'react';

import Sidebar from "../components/SideBar/SideBar";
import NavBar from "../components/Navbar";

import {
  useLocation
} from 'react-router-dom';


import BlogPosts from "../components/Blog/BlogPosts";


const Blog = () => {

  const location = useLocation();

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

  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleItemClick = (value: string) => {
    setIsActive(false);
    setSelectedValue(value);
  };

  return (
    <main>
      <Sidebar />
      <div className="main-content">

        <NavBar />

        <article
          className={`blog ${location.pathname === '/blog' ? 'active' : ''}`}
          data-page="blog"
        >
          <header>
            <h2 className="h2 article-title">Blog</h2>
          </header>

          <BlogPosts />

        </article>

      </div>

    </main>
  );
}

export default Blog;
