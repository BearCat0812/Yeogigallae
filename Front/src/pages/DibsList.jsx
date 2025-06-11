import React, { useState, useEffect } from 'react';
import '../components/CardLayout.css';
import { useNavigate } from 'react-router-dom';

const DibsList = () => {
    const [dibsList, setDibsList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태 확인
        fetch('http://localhost:8080/session-check', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log('세션 체크 결과:', data);
            setIsLoggedIn(data.loggedIn);
            if (data.loggedIn) {
                // 찜 목록 가져오기
                fetch('http://localhost:8080/dibs-list', {
                    method: 'GET',
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => {
                    console.log('찜 목록 데이터:', data);
                    if (data.error) {
                        setError(data.error);
                    } else if (Array.isArray(data)) {
                        setDibsList(data);
                    } else {
                        setError('데이터 형식이 올바르지 않습니다.');
                    }
                })
                .catch(error => {
                    console.error('찜 목록을 가져오는데 실패했습니다:', error);
                    setError('찜 목록을 가져오는데 실패했습니다.');
                });
            }
        });
    }, []);

    const handleCardClick = (place) => {
        navigate('/about', { 
            state: { 
                placeName: place.placeName,
                address: place.address,
                imgName: place.imgName,
                id: place.id
            } 
        });
    };

    if (!isLoggedIn) {
        return (
            <div className="section-container container">
                <p>나만의 특별한 장소들</p>
                <p>로그인이 필요한 서비스입니다.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section-container">
                <p>나만의 특별한 장소들</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="section-container container">
                <p>나만의 특별한 장소들</p>
                {dibsList.length === 0 ? (
                    <p className="no-results">아직 찜한 장소가 없습니다.</p>
                ) : (
                    <div className="section">
                        {dibsList.map((place) => (
                            <div key={place.id} onClick={() => handleCardClick(place)} style={{ cursor: 'pointer' }}>
                                <div className="overlay">
                                    <ul>
                                        <li>{place.address}</li>
                                        <li>{place.placeName}</li>
                                    </ul>
                                    <span>
                                        <i className="fa-solid fa-heart"></i>
                                    </span>
                                </div>
                                <div className="card-section">
                                    <img src={'/dbImages/' + place.imgName} alt={place.placeName} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DibsList; 