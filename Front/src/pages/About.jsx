import React, { useEffect } from 'react'
import './About.css'
import CardLayout from '../components/CardLayout.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const placeData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  if (!placeData) {
    navigate('/');
    return null;
  }

  const handleCardClick = (card) => {
    navigate('/about', { 
      state: { 
        placeName: card.placeName,
        address: card.address,
        imgName: card.imgName
      },
      replace: true
    });
  };

  return (
    <div className="about-container">
        <div className="about-box">
            <div className="about-box-left">
                <div className="box-img">
                    <img src={`/dbImages/${placeData.imgName}`} alt={placeData.placeName} />
                </div>
                <div className="box-img-shadow"></div>
            </div>
            <div className="about-box-right">
                <ul>
                    <li className="italic">about</li>
                    <li className="placeName">{placeData.placeName}</li>
                    <li className="address">{placeData.address}</li>
                    <li className="placeEx">
                        <pre>
{`상세 설명이 필요한 경우 데이터베이스에서 가져오거나 
별도로 관리해야 할 것 같습니다.`}
                        </pre>
                    </li>
                </ul>
            </div>
        </div>
        <CardLayout onCardClick={handleCardClick} />
    </div>
  )
}

export default About
