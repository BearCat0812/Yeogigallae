import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardLayout.css';

const CardLayout = ({ onCardClick }) => {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(12);
  const loaderRef = useRef();
  const navigate = useNavigate();

  // 데이터 페치 로직
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      console.error('데이터 불러오기 실패:', err);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      // 검색 결과 처리
      const searchResults = sessionStorage.getItem('searchResults');
      if (searchResults) {
        setCards(JSON.parse(searchResults));
        sessionStorage.removeItem('searchResults');
        return;
      }

      try {
        const sessionResponse = await fetch('http://localhost:8080/session-check', {
          method: 'GET',
          credentials: 'include'
        });
        const sessionData = await sessionResponse.json();
        const isLoggedIn = sessionData.loggedIn;

        const preferences = sessionStorage.getItem('datePreferences');

        // 로그인/필터링 상태에 따른 데이터 로드
        if (!isLoggedIn) {
          const data = await fetchData('http://localhost:8080/all');
          setCards(data);
          return;
        }

        if (preferences) {
          const data = await fetchData('http://localhost:8080/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(JSON.parse(preferences))
          });
          setCards(data);
        } else {
          const data = await fetchData('http://localhost:8080/all');
          setCards(data);
        }
      } catch (error) {
        console.error('세션 체크 실패:', error);
        const data = await fetchData('http://localhost:8080/all');
        setCards(data);
      }
    };

    loadData();
  }, []);

  // 무한 스크롤 처리
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setCount(c => Math.min(c + 6, cards.length)),
      { threshold: 1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, [cards]);

  // 카드 클릭 핸들러
  const handleCardClick = (card) => {
    if (onCardClick) {
      onCardClick(card);
      return;
    }
    
    navigate('/about', { 
      state: { 
        placeName: card.placeName,
        address: card.address,
        imgName: card.imgName,
        id: card.id
      } 
    });
  };

  // 카드 렌더링
  const renderCard = (card, index) => (
    <div key={index} onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
      <div className="overlay">
        <ul>
          <li>{card.address}</li>
          <li>{card.placeName}</li>
        </ul>
        <span><i className="fa-solid fa-location-arrow"></i></span>
      </div>
      <div className="card-section">
        <img src={'/dbImages/' + card.imgName} alt={card.placeName} />
      </div>
    </div>
  );

  return (
    <div className="container section-container">
      <p>당신의 하루를<br />설레게 할 장소를 소개할게요</p>
      <div className="section">
        {cards.length === 0 ? (
          <p className="no-results">설렘을 줄 장소를 찾지 못했어요<br />다시 한 번 골라볼까요?</p>
        ) : (
          cards.slice(0, count).map(renderCard)
        )}
        {count < cards.length && <div ref={loaderRef} style={{ height: 50 }} />}
      </div>
    </div>
  );
};

export default CardLayout;
