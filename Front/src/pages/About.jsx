import React, { useEffect, useState } from 'react'
import './About.css'
import { useLocation, useNavigate } from 'react-router-dom';
import CardLayout from '../components/CardLayout.jsx';
import Review from '../components/Review.jsx';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const placeData = location.state;
  const [placeEx, setPlaceEx] = useState(null);
  const [click, setClick] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  useEffect(() => {
    if (placeData?.id) {
      fetch(`http://localhost:8080/place-details/${placeData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPlaceEx(data.placeEx);
          }
        })
        .catch(error => {
          console.error('Error fetching place details:', error);
        });
    }
  }, [placeData?.id]);

  if (!placeData) {
    navigate('/');
    return null;
  }

  /* 찜 눌리면 작동 */
  const dibs = (e) => {
    e.preventDefault();
    if (click) {
      fetch("http://localhost:8080/dibs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ placeId: placeData.id }),
      }).then(setClick(false));
    } else if (!click) {
      fetch("http://localhost:8080/dibs-delete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ placeId: placeData.id }),
      }).then(setClick(true));
    }
  };


  const handleCardClick = (card) => {
    navigate('/about', {
      state: {
        ...card,
        id: card.id
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
              {/* 임시 찜 버튼 */}
              <button onClick={dibs}>찜</button>

              <pre>
                {placeEx || '상세 설명을 불러오는 중...'}
              </pre>
            </li>
          </ul>
        </div>
      </div>
      <Review placeId={placeData.id} />
      <CardLayout onCardClick={handleCardClick} />
    </div>
  )
}

export default About
