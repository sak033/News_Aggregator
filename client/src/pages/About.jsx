import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faJs,
  faNodeJs,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faServer } from "@fortawesome/free-solid-svg-icons";
import photo from "../assets/sakshi.png"


const About = () => {
  return (
    <div className="about-page">
      {/* Back button */}
      <div className="back-home">
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>

      <div className="about-container">

        {/* LEFT — MAIN CONTENT */}
        <div className="about-main">
          <h2 className="font-extrabold text-2xl ">About News Aggregator</h2>
          <p className="subtitle">
            A modern platform to stay informed with the latest news from around the world.
          </p>

          <section className="about-section">
            <h3 className="text-blue-300 font-bold">Our Mission</h3>
            <p>
              Our mission is to make news consumption simple, fast, and accessible.
              We bring together trusted news sources so users can stay updated without clutter.
            </p>
          </section>

          <section className="about-section">
            <h3 className="text-blue-300 font-bold">Why News Aggregator?</h3>
            <p>
              In today’s fast-paced world, staying informed is essential.
              News Aggregator helps users save time by delivering important headlines
              across categories and countries in one place.
            </p>
          </section>
          {/* CARD 1 */}
          <div className="info-card ">
            <h3 className="text-blue-300 font-bold">Key Features</h3>
            <ul>
              <li> Global & country-wise news</li>
              <li> Category-based browsing</li>
              <li> Email subscription updates</li>
              <li> Fast & responsive UI</li>
            </ul>
          </div>
        </div>

        {/* RIGHT — INFO CARDS */}
        <div className="about-info">

          

          {/* CARD 2 — ABOUT THE CREATOR */}
<div className="info-card creator-card">
  <img
    src={photo}
    alt="Sakshi Kuthe"
    className="creator-photo"
  />

  <h3 className="text-blue-300 font-extrabold">About the Creator</h3>
  <p className="font-semibold">
    Hi, I’m <strong>Sakshi Kuthe</strong>, a passionate Frontend / Full-Stack
    Developer. I built this project to gain real-world experience and strengthen
    my skills in modern web development.
  </p>
</div>


          {/* CARD 3 — TECH STACK */}
<div className="info-card">
  <h3 className="text-blue-300 font-bold">Tech Stack</h3>

  <div className="tech-stack">
    <div className="tech-item">
      <FontAwesomeIcon icon={faReact} />
      <span>React</span>
    </div>

    <div className="tech-item">
      <FontAwesomeIcon icon={faJs} />
      <span>JavaScript</span>
    </div>

    <div className="tech-item">
      <FontAwesomeIcon icon={faNodeJs} />
      <span>Node.js</span>
    </div>

    <div className="tech-item">
      <FontAwesomeIcon icon={faServer} />
      <span>Express</span>
    </div>

    <div className="tech-item">
      <FontAwesomeIcon icon={faDatabase} />
      <span>MongoDB</span>
    </div>

    <div className="tech-item">
      <FontAwesomeIcon icon={faGithub} />
      <span>GitHub</span>
    </div>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default About;
