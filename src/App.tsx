import React, {
  useState,
  useEffect
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import './App.css';


import About from "./Page/About";
import Contact from "./components/Contact/Contact";
import Resume from "./Page/Resume";
import Preloader from "../src/components/Pre";
import Blog from "./Page/Blog";
import Portfolio from "./Page/Portfolio";
import ScrollToTop from "./components/ScrollToTop";
import Docs from "./components/Docs/Docs";

function App() {

  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <About />
            </>
          }
        />

        <Route
          path="/resume"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <Resume />
            </>
          }
        />

        <Route
          path="/portfolio"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <Portfolio />
            </>
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <Blog />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <Contact />
            </>
          }
        />

        <Route
          path="/docs"
          element={
            <>
              <ScrollToTop />
              <Preloader load={load} />
              <Docs />
            </>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
