import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });

  return (
    <Link to="/" className='logo-container'>
        <span>오늘, {formattedDate}</span>
        <img src="/images/logo.png" alt="logo" className='home-logo'/>
    </Link>
  );
};

export default Banner;