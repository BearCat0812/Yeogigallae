import React from 'react';

const TodayBanner = () => {
  const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });

  return (
    <span>오늘, {formattedDate}</span>
  );
};

export default TodayBanner;