import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";




export default function Footer() {

  

  const [userEmail, setUserEmail] = useState("");
  

  
  const subscribeUser = async () => {
    if (!userEmail) {
      alert("Please enter an email");
      return;
    }

    const res = await fetch("https://news-aggregator-api-bm7g.onrender.com/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        
      }),
    });

    const data = await res.json();
    alert(data.message);

    setUserEmail(""); // clear input
    
  };

  return (
    <footer className=" footer ">
      {/* Newsletter CTA */}
      <section className="w-full justify-items-center bg-gradient-to-r from-blue-600 to-violet-600 text-white ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Stay Updated with News_Aggregator!!!
            </h2>
            <p className="mb-8 footer-cont text-lg opacity-90">
              Get breaking news, exclusive stories, and trending content delivered to your inbox
            </p>

            <form
              onSubmit={(e) =>{e.preventDefault();
                subscribeUser();} 
              }
              className="flex flex-col footer-cont sm:flex-row mt-5 items-center gap-4 max-w-4xl mx-auto"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={userEmail}
                onChange={(e)=> setUserEmail(e.target.value)}
                className="flex-1 email-input rounded-lg bg-white/10 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="submit-btn px-5 py-4  rounded-lg bg-white text-blue-600 font-semibold shadow-md hover:opacity-45"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-6  text-sm opacity-80">
              Join 100,000+ readers who trust News_Aggregator for reliable news
            </p>
          </div>
        </div>
      </section>

      {/* Dark footer columns */}
      <section className="dark-footer bg-[#0f1724] justify-items-center  text-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10">

            {/* Column 1: logo + blurb */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                  N
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">News_Aggregator</h3>
                  <p className="text-sm opacity-80">International News Portal</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-6">
                Your trusted source for breaking news, in-depth analysis, and trending stories from around the world.
              </p>

              <div className="flex gap-4 text-xl">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/_saksheehh_"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="opacity-80 hover:opacity-100 transition"
  >
    <FontAwesomeIcon icon={faInstagram} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/sakshi-kuthe-49869124b"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    className="opacity-80 hover:opacity-100 transition"
  >
    <FontAwesomeIcon icon={faLinkedin} />
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/sak033"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
    className="opacity-80 hover:opacity-100 transition"
  >
    <FontAwesomeIcon icon={faGithub} />
  </a>

  {/* Gmail */}
  <a
    href="mailto:sakshikuthe336@gmail.com"
    aria-label="Email"
    className="opacity-80 hover:opacity-100 transition"
  >
    <FontAwesomeIcon icon={faEnvelope} />
  </a>
</div>

</div>

            
            
          
            {/* Column 3: Categories */}
            <div className="lg:ml-10">
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-3 text-sm opacity-85">
                <li><a className="hover:underline" href="#">Breaking News</a></li>
                <li><a className="hover:underline" href="#">Business</a></li>
                <li><a className="hover:underline" href="#">Entertainment</a></li>
                <li><a className="hover:underline" href="#">Health</a></li>
                <li><a className="hover:underline" href="#">Local</a></li>
              </ul>
            </div>

            {/* Column 4: For Publishers */}
            <div className="lg:ml-10">
              <h4 className="text-white font-semibold mb-4">For Publishers</h4>
              <ul className="space-y-3 text-sm opacity-85">
                <li><a className="hover:underline" href="#">Become a Reporter</a></li>
                <li> 
                <Link to="/contact" className="hover:underline">
                 Contact Us
                </Link>
                 </li>

                  <li>
                  <Link to="/about" className="hover:underline">
                   About Us
                   </Link>
                  </li>
               </ul>

            </div>
            
          </div>

          {/* bottom row */}
          <div className="reserved border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm opacity-80">
            <p>© {new Date().getFullYear()} News_Aggregator. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
