import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import TodayBanner from '../components/TodayBanner'

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/" className='logo-container'>
        <TodayBanner />
        <img src="/images/logo.png" alt="logo" className='home-logo'/>
      </Link>
      <div className="container section-container">
        <p>특별한 하루를 찾아드릴게요</p>
        <div className="section">
          <div><img src="/images/1.jpg" alt="카페 온화" /></div>
          <div><img src="/images/2.jpg" alt="홍대 프리마켓" /></div>
          <div><img src="/images/3.jpg" alt="카페 바이앤드커피" /></div>
        </div>
      </div>
    </div>
  )
}

export default Home
