import Sidebar from "../components/SideBar/SideBar";
import NavBar from "../components/Navbar";

import {
  useLocation
} from 'react-router-dom';


import Projects from "../components/Portfolio/Projects";


const Portfolio = () => {

  const location = useLocation();

  // element toggle function
  const elementToggleFunc = (elem: HTMLElement) => {
    elem.classList.toggle("active");
  };

  // custom select variables
  const select: HTMLElement | null = document.querySelector("[data-select]");
  const selectItems: NodeListOf<HTMLElement> = document.querySelectorAll("[data-select-item]");
  const selectValue: HTMLElement | null = document.querySelector("[data-select-value]");

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

  return (
    <main>
      <Sidebar />
      <div className="main-content">

        <NavBar />

        <article
          className={`portfolio ${location.pathname === '/portfolio' ? 'active' : ''}`}
          data-page="portfolio"
        >
          <header>
            <h2 className="h2 article-title">Portfolio</h2>
          </header>

          <Projects />

        </article>

      </div>

    </main>
  );
}

export default Portfolio;
