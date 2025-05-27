import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <div className="container">
      <div className="footer-container">
        <Link to="/" className="footer-logo"><img src="/images/logoS.png" alt="logo"/></Link>
        <ul className='footer-menu1'>
            <li><Link to="/">FAQs</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">고객센터</Link></li>
        </ul>
        <ul className='footer-menu2'>
            <li><Link to="/">쿠키 정책</Link></li>
            <li><Link to="/">법적 용어</Link></li>
            <li><Link to="/">개인정보보호정책</Link></li>
            <li>Connect:</li>
            <li><Link to="/">Instagram</Link></li>
            <li><Link to="/">Facebook</Link></li>
            <li><Link to="/">Twitter</Link></li>
            <li><Link to="/">Youtube</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
