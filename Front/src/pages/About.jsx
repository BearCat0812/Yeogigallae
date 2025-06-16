import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './About.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CardLayout from '../components/CardLayout.jsx';
import Review from '../components/Review.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const placeData = location.state;
  const [placeEx, setPlaceEx] = useState(null);
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // 세션 체크
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('http://localhost:8080/session-check', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error('Session check failed:', error);
      }
    };
    checkSession();
  }, []);

  // 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state]);

  // 장소 상세 정보 가져오기
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!placeData?.id) return;
      
      try {
        const res = await fetch(`http://localhost:8080/place-details/${placeData.id}`);
        const data = await res.json();
        if (data.success) {
          setPlaceEx(data.placeEx);
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlaceDetails();
  }, [placeData?.id]);

  // 찜 상태 확인
  useEffect(() => {
    const checkDibs = async () => {
      if (!placeData?.id) return;
      
      try {
        const res = await fetch(`http://localhost:8080/dibs/${placeData.id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        setClick(data.result);
      } catch (error) {
        console.error('Error checking dibs:', error);
      }
    };
    checkDibs();
  }, [placeData?.id]);

  // 카카오맵 초기화
  useEffect(() => {
    if (!placeData?.address) return;

    const script = document.createElement('script');
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=95722e7d3aa313d7f037366c279c7e2d&autoload=false&libraries=services";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(0, 0),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(placeData.address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);

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
    return () => {
      document.head.removeChild(script);
    };
  }, [placeData?.address, showMap]);

  // 찜하기 핸들러
  const handleDibs = useCallback(async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    const newClickState = !click;
    setClick(newClickState);

    try {
      const endpoint = !click ? "http://localhost:8080/dibs" : "http://localhost:8080/dibs-delete";
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ placeId: placeData.id }),
      });
      const data = await res.json();
      
      if (!data.success) {
        setClick(!newClickState);
      } else {
        alert(!click ? '찜 목록에 추가되었어요.' : '찜 목록에서 제거되었어요.');
      }
    } catch (error) {
      console.error('Dibs operation failed:', error);
      setClick(!newClickState);
    }
  }, [click, isLoggedIn, navigate, placeData?.id]);

  // 카드 클릭 핸들러
  const handleCardClick = useCallback((card) => {
    navigate('/about', {
      state: {
        ...card,
        id: card.id
      },
      replace: true
    });
  }, [navigate]);

  // 지도 토글 핸들러
  const toggleMap = useCallback(() => {
    setShowMap(prev => !prev);
  }, []);

  if (!placeData) {
    navigate('/');
    return null;
  }

  // 메모이제이션된 컴포넌트
  const MapComponent = useMemo(() => (
    <motion.div
      id="map"
      className="box-img-map"
      style={{ width: '100%', height: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  ), []);

  const ImageComponent = useMemo(() => (
    <motion.img
      src={`/dbImages/${placeData.imgName}`}
      alt={placeData.placeName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  ), [placeData.imgName, placeData.placeName]);

  return (
    <div className="about-container">
      <div className="about-box">
        <div className="about-box-left">
          <div className="box-img">
            <AnimatePresence mode="wait">
              {showMap ? MapComponent : ImageComponent}
            </AnimatePresence>
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
                onClick={handleDibs}
                className={`like-button ${click ? 'liked' : ''}`}
              >
                <i className={`fa-${click ? 'solid' : 'regular'} fa-heart`}></i>
              </button>
              <button
                onClick={toggleMap}
                className="map-toggle-button"
              >
                <i className={`fa-solid fa-${showMap ? 'image' : 'map-location-dot'}`}></i>
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
  );
};

export default React.memo(About);
