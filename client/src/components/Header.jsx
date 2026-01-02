import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import countries from "./countries";
import downArrow from './../assets/downarrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import {
  faSearch,
  faUserCircle,
  faCog,
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";









function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);



  const [theme, setTheme] = useState("light-theme");
  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology","politics"]
  useEffect(() => {
    document.body.className = theme;
  }, [theme])
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme")
    }
    else {
      setTheme("light-theme")
    }
  }
  return (
    <header className="">
     <nav className="fixed top-0  w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
      
      <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">News_Aggregator</h3>

        <ul className={active ? "nav-ul  flex gap-5 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : " nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li ><Link className="no-underline menu font-semibold" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
          <li className="dropdown-li "><Link className="no-underline menu font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCategoryDropdown(!showCategoryDropdown) }}>

                    <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      {element}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
          <li className="dropdown-li menu"><Link className="no-underline menu  font-semibold flex items-center gap-2" onClick={() => { setShowCountryDropdown(!showCountryDropdown); setShowCategoryDropdown(false) }}>Country <FontAwesomeIcon className={showCountryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCountryDropdown(!showCountryDropdown) }}>
                    <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      <img
                        src={element?.png}
                        srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                   
                        alt={element?.countryName} />
                      <span>{element?.countryName}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

           <li>
          <Link className="menu font-semibold" to="/e-paper">
          E-Paper
           </Link>
          </li>



            <li>
           <Link
          className="no-underline menu secondary font-semibold"
           to="/about"
           onClick={() => setActive(false)}
           >
             About
           </Link>
           </li>

            <li>
            <Link
          className="no-underline menu secondary font-semibold"
          to="/contact"
          onClick={() => setActive(false)}
            >
           Contact
          </Link>
          </li>
        </ul>
       
       
  <div className="flex items-center gap-5 relative">

  
  {/* 🔍 Search */}
<button
  className="icon-btn"
  title="Search"
  onClick={() => setShowSearch(!showSearch)}
>
  <FontAwesomeIcon icon={faSearch} />
</button>

{/* 🔽 INLINE SEARCH INPUT (TOP RIGHT) */}
{showSearch && (
  <div className="search-dropdown">
    <input
      type="text"
      placeholder="Search news..."
      autoFocus
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          window.location.href = `/search?q=${encodeURIComponent(
            e.target.value
          )}`;
          setShowSearch(false);
        }
      }}
    />
    <button onClick={() => setShowSearch(false)}>✕</button>
  </div>
)}



  {/* 👤 Profile */}
  <button
    className="icon-btn"
    onClick={() => {
      setShowProfileMenu(!showProfileMenu);
      setShowSettings(false);
    }}
  >
    <FontAwesomeIcon icon={faUserCircle} />
  </button>

  {/* PROFILE DROPDOWN */}
  {showProfileMenu && (
    <div className="profile-dropdown">

      {/* SETTINGS */}
      <button
        className="dropdown-item"
        onClick={() => setShowSettings(!showSettings)}
      >
        <FontAwesomeIcon icon={faCog} />
        <span>Settings</span>
      </button>

      {showSettings && (
        <div className="settings-panel">
          <span>
            <FontAwesomeIcon
              icon={theme === "dark-theme" ? faMoon : faSun}
            />
            &nbsp; Dark Mode
          </span>

          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark-theme"}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      )}

    </div>
  )}
</div>



        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>

      

    </header>
  );
}

export default Header;