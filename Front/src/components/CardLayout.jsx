import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardLayout.css';

const dummyCards = Array.from({ length: 20 }, (_, i) => ({
  name: `place ${i + 4}`,
  address: `address ${i + 4}`,
  image: '/images/dummy.jpg',
  link: '/'
}));

const allPlaces = [
  {
    name: '피크니크 홍대경의선숲길점',
    address: '서울 마포구 서강로 13길 24',
    image: '/images/1.jpg',
    link: '/about'
  },
  {
    name: 'LOVEPEACEMAUM',
    address: '서울 마포구 포은로5길 3',
    image: '/images/2.jfif',
    link: '/'
  },
  {
    name: '바이앤드커피',
    address: '서울 마포구 잔다리로3안길 44 2층',
    image: '/images/3.jpg',
    link: '/'
  },
  ...dummyCards
];

const CardLayout = () => {
  const [count, setCount] = useState(12);
  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setCount(c => Math.min(c + 6, allPlaces.length)),
      { threshold: 1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  return (
    <div className="container section-container">
      <p>당신의 하루를<br />설레게 할 장소를 소개할게요</p>
      <div className="section">
        {allPlaces.slice(0, count).map((p, i) => (
          <div key={i}>
            <div className="overlay">
              <ul><li>{p.name}</li><li>{p.address}</li></ul>
              <span><i className="fa-solid fa-location-arrow"></i></span>
            </div>
            <Link to={p.link} className="card-section">
              <img src={p.image} alt={p.name} />
            </Link>
          </div>
        ))}
        {count < allPlaces.length && <div ref={loaderRef} style={{ height: 50 }} />}
      </div>
    </div>
  );
};

export default CardLayout;
