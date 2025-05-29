import React, { useState } from 'react';
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
        { id: 'gourmet', label: '맛집' },
        { id: 'cafe', label: '카페' },
        { id: 'restaurant', label: '레스토랑' },
        { id: 'museum', label: '미술관/박물관' },
        { id: 'movie', label: '영화관' },
        { id: 'exhibition', label: '전시회' },
        { id: 'boardgame_cafe', label: '보드게임 카페' },
        { id: 'karaoke', label: '노래방' },
        { id: 'cooking_class', label: '요리 교실' },
        { id: 'spa', label: '스파/찜질방' },
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

    const togglePlace = (id) => {
        setPlaces((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 2 ? [...prev, id] : prev
        );
    };

    const handleSubmit = () => {
        if (!region || !dateType || places.length === 0) return alert('모든 항목을 선택해주세요.');
        sessionStorage.setItem('datePreferences', JSON.stringify({ region, dateType, places }));
        alert('필터가 저장되었습니다!');
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
            />
            <span>{label}</span>
        </label>
    ));

    return (
    <div className="filter-container container">
        <div className="filter-group-container">
            <h1 className="filter-name">지역 선택</h1>
            <div className="filter-group">
                {renderRadioGroup('region', options.region, region, setRegion)}
            </div>
        </div>

        <div className="filter-group-container">
            <h1 className="filter-name">실내/실외</h1>
            <div className="filter-group">
                {renderRadioGroup('dateType', options.dateType, dateType, (val) => {
                setDateType(val);
                setPlaces([]);
                })}
            </div>
        </div>

        <div className="filter-group-container">
            <h1 className="filter-name">장소 선택 (최대 2개)</h1>
            {dateType && (
                <div className="filter-group group-place">
                {options.places[dateType].map(({ id, label }) => (
                    <label key={id} className={`radio-label ${places.includes(id) ? 'checked' : ''}`}>
                    <input
                        type="checkbox"
                        checked={places.includes(id)}
                        onChange={() => togglePlace(id)}
                    />
                    <span>{label}</span>
                    </label>
                ))}
                </div>
            )}
        </div>

        <button className="filter-submit" onClick={handleSubmit}>검색</button>
    </div>
  );
};

export default Filter;
