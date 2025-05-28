import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <img src="/images/logoS.png" alt="logo" className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}/>
      <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
      <button className="login-btn" onClick={() => navigate('/login')}>로그인/회원가입</button>
      <button className="mypage-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
};

export default Header;
