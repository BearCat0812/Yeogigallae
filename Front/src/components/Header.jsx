import { Link } from 'react-router-dom';
import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className="container">
      <div className="header-container">
        <Link to="/"><img src="/images/logoS.png" alt="logo" className="logo"/></Link>
        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
        <button className="login-btn">로그인/회원가입</button>
      </div>
    </div>
  )
}

export default Header
