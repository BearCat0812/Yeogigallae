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
                        <pre>
                            {placeEx || '상세 설명을 불러오는 중...'}
                        </pre>
                    </li>
                </ul>
            </div>
        </div>
        <Review placeId={placeData.num} />
        <CardLayout onCardClick={handleCardClick} />
    </div>
  )
}

export default About
