import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div class="header">
        <img src="/images/logo.png" alt="logo" class="logo"/>
        <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        <button class="login-btn">로그인/회원가입</button>
    </div>
  )
}

export default Header
