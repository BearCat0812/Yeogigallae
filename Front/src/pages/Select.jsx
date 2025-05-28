import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Select.css';

const indoorOptions = [
  { id: 'cafe', label: '카페' },
  { id: 'restaurant', label: '레스토랑' },
  { id: 'museum', label: '미술관/박물관' },
  { id: 'movie', label: '영화관' },
  { id: 'exhibition', label: '전시회' },
];

const outdoorOptions = [
  { id: 'park', label: '공원' },
  { id: 'street', label: '거리 산책' },
  { id: 'beach', label: '해변' },
  { id: 'festival', label: '축제' },
  { id: 'hiking', label: '등산' },
];

const Select = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [dateType, setDateType] = useState('');
  const [indoorPlaces, setIndoorPlaces] = useState([]);
  const [outdoorPlaces, setOutdoorPlaces] = useState([]);
  const navigate = useNavigate();

  const handleRegionClick = (id) => {
    setSelectedRegion((prev) => (prev === id ? '' : id));
    setDateType('');
    setIndoorPlaces([]);
    setOutdoorPlaces([]);
  };

  const handleDateTypeClick = (type) => {
    setDateType((prev) => (prev === type ? '' : type));
    setIndoorPlaces([]);
    setOutdoorPlaces([]);
  };

  const handleMultiSelect = (id, selectedList, setSelectedList) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item) => item !== id));
    } else if (selectedList.length < 2) {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleSubmit = () => {
    if (!selectedRegion) {
      alert('거주 지역을 선택해주세요.');
      return;
    }
    if (!dateType) {
      alert('실내 또는 실외를 선택해주세요.');
      return;
    }
    const selectedPlaces = dateType === 'inside' ? indoorPlaces : outdoorPlaces;
    if (selectedPlaces.length === 0) {
      alert('선호하는 장소를 최소 1곳 선택해주세요.');
      return;
    }
    const data = {
      region: selectedRegion,
      dateType,
      places: selectedPlaces,
    };
    sessionStorage.setItem('datePreferences', JSON.stringify(data));
    alert('설정이 저장되었습니다!');

    navigate('/');
  };

  const hasSelectedPlaces = (dateType === 'inside' && indoorPlaces.length > 0) ||
                            (dateType === 'outside' && outdoorPlaces.length > 0);

  return (
    <div className="select-container container">
      <p className="select-hello">?님, 안녕하세요!</p>
      <p className="selectbar-container-label">현재 거주하시는 지역은 어디인가요?</p>
      <div className="selectbar-container">
        {[
          { id: 'hongdae', label: '홍대/합정/마포/서대문' },
          { id: 'sinsa', label: '신사/청담/압구정' },
          { id: 'gundae', label: '건대입구/성수/왕십리' },
          { id: 'eulji', label: '을지로/명동/중구/동대문' },
          { id: 'yeoui', label: '여의도' },
          { id: 'jamsil', label: '잠실/송파' },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`radio-label ${selectedRegion === id ? 'checked' : ''}`}
            onClick={() => handleRegionClick(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            className="animated-section"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="selectbar-container-label">실내와 실외 중, 어떤 데이트를 더 선호하시나요?</p>
            <div className="selectbar-container">
              {['inside', 'outside'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`radio-label ${dateType === type ? 'checked' : ''}`}
                  onClick={() => handleDateTypeClick(type)}
                >
                  {type === 'inside' ? '실내' : '실외'}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dateType && (
          <motion.div
            className="animated-section"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="selectbar-container-label" style={{ whiteSpace: 'pre-line' }}>
              {dateType === 'inside'
                ? '실내를 선택하셨어요!\n선호하는 장소를 최대 2가지 설정할 수 있어요.'
                : '실외를 선택하셨어요!\n가고 싶은 장소를 최대 2가지 선택해주세요.'}
            </p>
            <div className="selectbar-container">
              {(dateType === 'inside' ? indoorOptions : outdoorOptions).map(({ id, label }) => {
                const selectedList = dateType === 'inside' ? indoorPlaces : outdoorPlaces;
                const setSelectedList = dateType === 'inside' ? setIndoorPlaces : setOutdoorPlaces;
                return (
                  <button
                    key={id}
                    type="button"
                    className={`radio-label ${selectedList.includes(id) ? 'checked' : ''}`}
                    onClick={() => handleMultiSelect(id, selectedList, setSelectedList)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* 제출 버튼 컨테이너에 height 애니메이션 추가 */}
            <AnimatePresence>
              {hasSelectedPlaces && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <motion.button
                    className="submit-button"
                    onClick={handleSubmit}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    시작하기
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
