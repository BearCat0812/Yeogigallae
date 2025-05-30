import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardLayout.css';

const CardLayout = () => {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(12);
  const loaderRef = useRef();

  useEffect(() => {
    const preferences = sessionStorage.getItem('datePreferences');
    if (!preferences) return;

    const { region, dateType, places } = JSON.parse(preferences);

    fetch('http://localhost:8080/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ region, dateType, places })
    })
      .then(res => res.json())
      .then(data => {
        // placeName과 imgName을 사용하는 응답에 맞게 처리
        setCards(data);
      })
      .catch(err => {
        console.error('데이터 불러오기 실패:', err);
      });
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

  return (
    <div className="container section-container">
      <p>당신의 하루를<br />설레게 할 장소를 소개할게요</p>
      <div className="section">
        {cards.length === 0 ? (
          <p className="no-results">설렘을 줄 장소를 찾지 못했어요<br />다시 한 번 골라볼까요?</p>
        ) : (
          cards.slice(0, count).map((p, i) => (
            <div key={i}>
              <div className="overlay">
                <ul><li>{p.placeName}</li><li>{p.address}</li></ul>
                <span><i className="fa-solid fa-location-arrow"></i></span>
              </div>
              <Link to={p.link} className="card-section">
                <img src={'/dbImages/' + p.imgName} alt={p.placeName} />
              </Link>
            </div>
          ))
        )}
        {count < cards.length && <div ref={loaderRef} style={{ height: 50 }} />}
      </div>
    </div>
  );
};

export default CardLayout;
