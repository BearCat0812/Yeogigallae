<<<<<<< Updated upstream
import { Link } from 'react-router-dom';
import React from 'react'
=======
import React from 'react';
>>>>>>> Stashed changes
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
<<<<<<< Updated upstream
    <div className="container">
      <div className="header-container">
        <Link to="/"><img src="/images/logoS.png" alt="logo" className="logo"/></Link>
        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
        <button className="login-btn">로그인/회원가입</button>
      </div>
=======
    <div class="header">
      <img src="/images/logo.png" alt="logo" class="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}/>
      <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button class="login-btn" onClick={() => navigate('/login')}>로그인</button>
      <button class="regist-btn" onClick={() => navigate('/regist')}>회원가입</button>
      <button class="mypage-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
>>>>>>> Stashed changes
    </div>
  );
};

export default Header;
