import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:8080/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          localStorage.removeItem('userId');
          sessionStorage.removeItem('datePreferences');
          sessionStorage.removeItem('searchResults');
          setIsLoggedIn(false);
          navigate('/');
          window.location.reload();
        }
      });
  };

  return (
    <div className="header-container">
      <img src="/images/logoS.png" alt="logo" onClick={() => navigate('/')} className="logo" />
      {!isLoggedIn ? (
        <button className="login-btn" onClick={() => navigate('/login')}>로그인/회원가입</button>
      ) : (
        <>
          <button className="login-btn" onClick={handleLogout}>로그아웃</button>
          <button className="mypage-btn" onClick={() => navigate('/mypage')}>마이페이지</button>
        </>
      )}
    </div>
  );
};

export default Header;