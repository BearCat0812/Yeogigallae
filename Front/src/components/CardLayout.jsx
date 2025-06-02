import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardLayout.css';

const CardLayout = ({ onCardClick }) => {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(12);
  const loaderRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const searchResults = sessionStorage.getItem('searchResults');
    if (searchResults) {
      setCards(JSON.parse(searchResults));
      sessionStorage.removeItem('searchResults');
      return;
    }

    const preferences = sessionStorage.getItem('datePreferences');
    const isLoggedIn = sessionStorage.getItem('name');

    if (!isLoggedIn) {
      fetch('http://localhost:8080/all')
        .then(res => res.json())
        .then(data => {
          setCards(data);
        })
        .catch(err => {
          console.error('데이터 불러오기 실패:', err);
        });
      return;
    }

    if (preferences) {
      const filterData = JSON.parse(preferences);
      fetch('http://localhost:8080/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterData)
      })
        .then(res => res.json())
        .then(data => {
          setCards(data);
        })
        .catch(err => {
          console.error('데이터 불러오기 실패:', err);
        });
    } else {
      fetch('http://localhost:8080/all')
        .then(res => res.json())
        .then(data => {
          setCards(data);
        })
        .catch(err => {
          console.error('데이터 불러오기 실패:', err);
        });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setCount(c => Math.min(c + 6, cards.length)),
      { threshold: 1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, [cards]);

  const handleCardClick = (card) => {
    if (onCardClick) {
      onCardClick(card);
    } else {
      navigate('/about', { 
        state: { 
          placeName: card.placeName,
          address: card.address,
          imgName: card.imgName
        } 
      });
    }
  };

  return (
    <div className="container section-container">
      <p>당신의 하루를<br />설레게 할 장소를 소개할게요</p>
      <div className="section">
        {cards.length === 0 ? (
          <p className="no-results">설렘을 줄 장소를 찾지 못했어요<br />다시 한 번 골라볼까요?</p>
        ) : (
          cards.slice(0, count).map((card, i) => (
            <div key={i} onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
              <div className="overlay">
                <ul>
                  <li>{card.placeName}</li>
                  <li>{card.address}</li>
                </ul>
                <span><i className="fa-solid fa-location-arrow"></i></span>
              </div>
              <div className="card-section">
                <img src={'/dbImages/' + card.imgName} alt={card.placeName} />
              </div>
            </div>
          ))
        )}
        {count < cards.length && <div ref={loaderRef} style={{ height: 50 }} />}
      </div>
    </div>
  );
};

export default CardLayout;
