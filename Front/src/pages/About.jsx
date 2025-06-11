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
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    fetch('http://localhost:8080/session-check', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        setIsLoggedIn(res.loggedIn);
      });
  }, []);


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

  /* 찜 데이터 호출 */
  useEffect(() => {
    fetch(`http://localhost:8080/dibs/${placeData.id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        setClick(res.result);
      })
  }, [placeData?.id]);


  if (!placeData) {
    navigate('/');
    return null;
  }

  /* 찜 눌리면 작동 */
  const dibs = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const newClickState = !click;
    setClick(newClickState); // 즉시 상태 업데이트

    if (!click) {
      fetch("http://localhost:8080/dibs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ placeId: placeData.id }),
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('찜 목록에 추가되었어요.');
          } else {
            setClick(!newClickState); // 실패 시 원래 상태로 되돌림
          }
        });
    } else if (click) {
      fetch("http://localhost:8080/dibs-delete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ placeId: placeData.id }),
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('찜 목록에서 제거되었어요.');
          } else {
            setClick(!newClickState); // 실패 시 원래 상태로 되돌림
          }
        });
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
            <li className="placeName">
              {placeData.placeName}
              <button
                id='dibs'
                onClick={dibs}
                className={`like-button ${click ? 'liked' : ''}`}
              >
                <i className={`fa-${click ? 'solid' : 'regular'} fa-heart`}></i>
              </button>
            </li>
            <li className="address">{placeData.address}</li>
            <li className="placeEx">
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
