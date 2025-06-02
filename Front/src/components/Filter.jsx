import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Filter.css';

const options = {
    region: [
        { id: 'hongdae', label: '홍대/합정/마포/서대문' },
        { id: 'sinsa', label: '신사/청담/압구정' },
        { id: 'gundae', label: '건대입구/성수/왕십리' },
        { id: 'eulji', label: '을지로/명동/중구/동대문' },
        { id: 'yeoui', label: '여의도' },
        { id: 'jamsil', label: '잠실/송파' },
    ],
    dateType: [
        { id: 'inside', label: '실내' },
        { id: 'outside', label: '실외' },
    ],
    places: {
        inside: [
            { id: 'aquarium', label: '아쿠아리움' },
            { id: 'bar', label: '바' },
            { id: 'boardgame_cafe', label: '보드게임 카페' },
            { id: 'book', label: '서점/책방' },
            { id: 'cafe', label: '카페' },
            { id: 'cathedral', label: '성당/교회' },
            { id: 'cooking_class', label: '요리 교실' },
            { id: 'exhibition', label: '전시회' },
            { id: 'game', label: '게임/방탈출' },
            { id: 'karaoke', label: '노래방' },
            { id: 'movie', label: '영화관' },
            { id: 'museum', label: '미술관/박물관' },
            { id: 'observatory', label: '전망대' },
            { id: 'offline_store', label: '오프라인 매장' },
            { id: 'restaurant', label: '레스토랑' },
            { id: 'spa', label: '스파/찜질방' },
            { id: 'sports', label: '실내 스포츠' },
            { id: 'studio', label: '촬영 스튜디오' },
            { id: 'thema_cafe', label: '테마 카페' },
            { id: 'workshop', label: '공방 체험' },
        ],
        outside: [
            { id: 'park', label: '공원' },
            { id: 'beach', label: '해변' },
            { id: 'festival', label: '축제' },
            { id: 'hiking', label: '등산' },
            { id: 'botanical_garden', label: '식물원' },
            { id: 'zoo', label: '동물원' },
            { id: 'picnic_spot', label: '피크닉 장소' },
            { id: 'outdoor_cafe', label: '야외 카페' },
            { id: 'theme_park', label: '테마파크' },
            { id: 'farm', label: '체험 농장' },
        ],
    },
};

const Filter = () => {
    const [region, setRegion] = useState('');
    const [dateType, setDateType] = useState('');
    const [places, setPlaces] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const ref = useRef(null);
    const isLoggedIn = sessionStorage.getItem('name');

    useEffect(() => {
        const handleClickOutside = e => {
            if (ref.current && !ref.current.contains(e.target)) setVisible(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePlace = id =>
        setPlaces(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : prev.length < 2 ? [...prev, id] : prev
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            return;
        }

        // 최소한 하나의 필터 조건이라도 있는지 확인
        if (!region && !dateType && places.length === 0) {
            alert('최소한 하나의 조건을 선택해주세요.');
            return;
        }

        const filterData = {
            region: region || null,
            dateType: dateType || null,
            places: places.length > 0 ? places : null
        };

        sessionStorage.setItem('datePreferences', JSON.stringify(filterData));
        alert('필터가 저장되었습니다!');

        fetch("http://localhost:8080/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filterData)
        })
            .then(res => res.json())
            .finally(() => {
                window.location.reload();
            });
    };

    const handleSearchFocus = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            e.target.blur(); // 포커스 해제
            alert('로그인이 필요한 서비스입니다.');
            return;
        }
        setVisible(true);
    };

    const handleSearch = async (keyword) => {
        if (!keyword.trim()) return;
        
        try {
            const response = await fetch(`http://localhost:8080/search?keyword=${encodeURIComponent(keyword)}`);
            const data = await response.json();
            
            // 검색 결과로 받은 데이터를 sessionStorage에 임시 저장
            sessionStorage.setItem('searchResults', JSON.stringify(data));
            
            // 페이지 새로고침하여 CardLayout에서 검색 결과 표시
            window.location.reload();
        } catch (error) {
            console.error('검색 실패:', error);
        }
    };

    const handleSearchInput = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            return;
        }
        if (searchKeyword.trim()) {
            handleSearch(searchKeyword);
        }
    };

    const renderRadioGroup = (name, items, value, onChange) =>
        items.map(({ id, label }) => (
            <label key={id} className={`radio-label ${value === id ? 'checked' : ''}`}>
                <input
                    type="radio"
                    name={name}
                    value={id}
                    checked={value === id}
                    onChange={() => onChange(id)}
                    onClick={e => {
                        if (value === id) {
                            e.preventDefault();
                            onChange('');
                        }
                    }}
                />
                <span>{label}</span>
            </label>
        ));

    const renderCheckboxGroup = items =>
        items.map(({ id, label }) => (
            <label key={id} className={`radio-label ${places.includes(id) ? 'checked' : ''}`}>
                <input type="checkbox" checked={places.includes(id)} onChange={() => handlePlace(id)} />
                <span>{label}</span>
            </label>
        ));

    return (
        <div className="container" ref={ref}>
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="search" onClick={handleSearchSubmit} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={searchKeyword}
                        onChange={handleSearchInput}
                        placeholder={isLoggedIn ? "지금 딱, 가고 싶은 데이트 장소는?" : "회원 전용 기능입니다"}
                        onFocus={handleSearchFocus}
                        className={!isLoggedIn ? "disabled" : ""}
                    />
                </form>
            </div>

            <AnimatePresence>
                {visible && isLoggedIn && (
                    <motion.div
                        className="filter-container"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 20, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="filter-container-padding">
                            <div className="filter-group-container">
                                <h1 className="filter-name">지역 선택</h1>
                                <div className="filter-group">
                                    {renderRadioGroup('region', options.region, region, setRegion)}
                                </div>
                            </div>

                            <div className="filter-group-container">
                                <h1 className="filter-name">실내/실외</h1>
                                <div className="filter-group">
                                    {renderRadioGroup('dateType', options.dateType, dateType, id => {
                                        setDateType(id);
                                        setPlaces([]);
                                    })}
                                </div>
                            </div>

                            {dateType && (
                                <div className="filter-group-container">
                                    <h1 className="filter-name">장소 선택 (최대 2개)</h1>
                                    <div className="filter-group group-place">{renderCheckboxGroup(options.places[dateType])}</div>
                                </div>
                            )}

                            <button className="filter-submit" onClick={handleSubmit}>
                                검색
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Filter;
