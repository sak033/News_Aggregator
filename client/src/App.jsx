import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CountryNews from './components/CountryNews'
import News from './components/News'
import TopHeadlines from './components/TopHeadlines'
import Footer from './components/Footer'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
        <BrowserRouter>
        <Header/>
         
        <Routes>
          <Route path="/" element={<News/>}/>
          <Route path="/top-headlines/:country" element={<TopHeadlines/>}/>
          <Route path="/country/:iso" element={<CountryNews/>}/>
        </Routes>
        <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
