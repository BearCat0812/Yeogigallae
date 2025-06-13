import React, { useEffect, useState } from 'react';
import './About.css';
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

  useEffect(() => {
    fetch(`http://localhost:8080/dibs/${placeData.id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        setClick(res.result);
      })
  }, [placeData?.id]);

  // Kakao 지도 스크립트 로드 및 지도 생성
  useEffect(() => {
    if (!placeData?.address) return;

    console.log('주소:', placeData.address);

    const script = document.createElement('script');
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=95722e7d3aa313d7f037366c279c7e2d&autoload=false&libraries=services";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(0, 0), // 임시 중심 좌표
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        // placeData.address를 바로 사용
        geocoder.addressSearch(placeData.address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 지도 중심을 검색된 좌표로 이동
            map.setCenter(coords);

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords
            });
          } else {
            alert('주소 검색 결과가 없습니다.');
          }
        });
      });
    };
    document.head.appendChild(script);

    // 클린업: 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, [placeData?.address]);

  if (!placeData) {
    navigate('/');
    return null;
  }

  const dibs = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const newClickState = !click;
    setClick(newClickState);

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
            setClick(!newClickState);
          }
        });
    } else {
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
            setClick(!newClickState);
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
            <div id="map"></div>
          </ul>
        </div>
      </div>
      <Review placeId={placeData.id} />
      <CardLayout onCardClick={handleCardClick} />
    </div>
  )
}

export default About;
