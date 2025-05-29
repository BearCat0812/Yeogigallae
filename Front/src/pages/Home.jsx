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
        <p>당신의 하루를<br />설레게 할 장소를 소개할게요</p>
        <div className="section">
          <div>
            <div className="overlay">
              <ul>
                <li>피크니크 홍대경의선숲길점</li>
                <li>서울 마포구 서강로 13길 24</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/1.jpg" alt="피크니크 홍대경의선숲길점" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>LOVEPEACEMAUM</li>
                <li>서울 마포구 포은로5길 3</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/2.jfif" alt="LOVEPEACEMAUM" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>바이앤드커피</li>
                <li>서울 마포구 잔다리로3안길 44 2층</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/3.jpg" alt="바이앤드커피" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>
        </div>
      </div>

      <div className="container section-container marginTop100">
        <p>특별한 하루를 찾아드릴게요</p>
        <div className="section">
          <div>
            <div className="overlay">
              <ul>
                <li>홍대 프리마켓</li>
                <li>마포구 와우산로 21</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/4.jpg" alt="홍대 프리마켓" /></Link>
          </div>
          <div>
            <div className="overlay">
              <ul>
                <li>망원시장</li>
                <li>서울 마포구 망원동 400-15</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/5.png" alt="망원시장" /></Link>
          </div>
          <div>
            <div className="overlay">
              <ul>
                <li>홍대 VR 스퀘어</li>
                <li>서울 마포구 어울마당로 68</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/6.jpg" alt="홍대 VR 스퀘어" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>

          <div>
            <div className="overlay">
              <ul>
                <li>place</li>
                <li>address</li>
              </ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to="/" className="card-section"><img src="/images/dummy.jpg" alt="dummy" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
