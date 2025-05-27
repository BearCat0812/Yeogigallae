import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div class="header-container">
      <img src="/images/logo.png" alt="logo" class="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}/>
      <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
      <button class="login-btn" onClick={() => navigate('/login')}>로그인</button>
      <button class="regist-btn" onClick={() => navigate('/regist')}>회원가입</button>
      <button class="mypage-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
};

export default Header;
