import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardLayout.css';

const CardLayout = () => {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(12);
  const loaderRef = useRef();

  useEffect(() => {
    const preferences = sessionStorage.getItem('datePreferences');
    const isLoggedIn = sessionStorage.getItem('name');

    // 로그아웃 상태일 때는 전체 데이터 가져오기
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

    // 로그인 상태이고 필터링 설정이 있는 경우
    if (preferences) {
      const { region, dateType, places } = JSON.parse(preferences);
      fetch('http://localhost:8080/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ region, dateType, places })
      })
        .then(res => res.json())
        .then(data => {
          setCards(data);
        })
        .catch(err => {
          console.error('데이터 불러오기 실패:', err);
        });
    } else {
      // 로그인은 했지만 필터링 설정이 없는 경우에도 전체 데이터 표시
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
