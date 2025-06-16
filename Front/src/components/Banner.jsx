import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const reset = () => {
    sessionStorage.removeItem('datePreferences');
    sessionStorage.removeItem('searchResults');
    navigate('/');
    window.location.reload();
  }


  return (
    <Link to="/" onClick={reset} className='logo-container'>
      <span >오늘, {formattedDate}</span>
      <img src="/images/logo.png" alt="logo" className='home-logo' />
    </Link>
  );
};

export default Banner;