import React from "react";
import { useState } from "react";



export default function Footer() {

  

  const [userEmail, setUserEmail] = useState("");
  

  
  const subscribeUser = async () => {
    if (!userEmail) {
      alert("Please enter an email");
      return;
    }

    const res = await fetch("http://localhost:3000/subscribe", {
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
      <section className="w-full justify-items-center bg-gradient-to-r from-blue-600 to-violet-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl footer-cont md:text-4xl font-bold mb-3">
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
                className="flex-1  px-5 py-4 rounded-lg bg-white/10 placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-5 py-4  rounded-lg bg-white text-blue-600 font-semibold shadow-md hover:opacity-45"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-6  text-sm opacity-80">
              Join 100,000+ readers who trust Gnews-Your News for reliable news
            </p>
          </div>
        </div>
      </section>

      {/* Dark footer columns */}
      <section className="bg-[#0f1724] justify-items-center  text-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

              <div className="flex gap-4">
                {/* simple inline SVG icons */}
                <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.66 9.14 8.44 9.92v-7.02H8.6V12.07h2.7V9.85c0-2.66 1.6-4.13 4.03-4.13 1.17 0 2.39.21 2.39.21v2.63h-1.34c-1.32 0-1.73.82-1.73 1.66v2h2.95l-.47 2.9h-2.48v7.02c4.78-.78 8.44-4.93 8.44-9.92z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter" className="opacity-80 hover:opacity-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.63.28-1.3.48-2 .56.72-.43 1.27-1.1 1.53-1.9-.68.4-1.43.7-2.24.86C18.7 4.6 17.78 4 16.72 4c-1.44 0-2.6 1.16-2.6 2.6 0 .2.02.4.06.59C11.6 7.03 8.2 5.1 6 2.44c-.22.4-.35.85-.35 1.34 0 .92.47 1.72 1.19 2.2-.55-.02-1.07-.17-1.52-.42v.04c0 1.26.9 2.31 2.1 2.55-.22.06-.46.09-.7.09-.17 0-.34-.02-.5-.05.34 1.07 1.33 1.85 2.5 1.87C7.3 12.98 6 13.45 4.6 13.45c-.28 0-.56-.02-.83-.05 1.06.68 2.33 1.08 3.68 1.08 4.42 0 6.83-3.66 6.83-6.84v-.31c.47-.34.88-.77 1.2-1.25-.43.19-.9.32-1.38.37z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.055 1.95.25 2.4.42.6.23 1.03.5 1.48.95.45.45.72.88.95 1.48.17.45.37 1.23.42 2.4.06 1.27.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.25 1.95-.42 2.4-.23.6-.5 1.03-.95 1.48-.45.45-.88.72-1.48.95-.45.17-1.23.37-2.4.42-1.27.06-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.95-.25-2.4-.42-.6-.23-1.03-.5-1.48-.95-.45-.45-.72-.88-.95-1.48-.17-.45-.37-1.23-.42-2.4C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.055-1.17.25-1.95.42-2.4.23-.6.5-1.03.95-1.48.45-.45.88-.72 1.48-.95.45-.17 1.23-.37 2.4-.42C8.416 2.212 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm0 11a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.8-11.8a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0z"></path></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm opacity-85">
                <li><a className="hover:underline" href="#">Latest News</a></li>
                <li><a className="hover:underline" href="#">News Reels</a></li>
                <li><a className="hover:underline" href="#">Categories</a></li>
                <li><a className="hover:underline" href="#">Trending</a></li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div>
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
            <div>
              <h4 className="text-white font-semibold mb-4">For Publishers</h4>
              <ul className="space-y-3 text-sm opacity-85">
                <li><a className="hover:underline" href="#">Become a Reporter</a></li>
                <li><a className="hover:underline" href="#">Advertise with Us</a></li>
                <li><a className="hover:underline" href="#">Contact Us</a></li>
                <li><a className="hover:underline" href="#">About Us</a></li>
              </ul>
            </div>
          </div>

          {/* bottom row */}
          <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm opacity-80">
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
