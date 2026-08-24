import Header from "./components/Header/index.jsx";
import Hero from "./components/Hero/index.jsx";
import Projects from "./components/Projects/index.jsx";
import Skills from "./components/Skills/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Footer from "./components/Footer/index.jsx";

export default function App() {
  return (
    <div className="portfolio-app">
      <Header />
      <main className="main-content">
        <div id="about">
          <Hero />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}