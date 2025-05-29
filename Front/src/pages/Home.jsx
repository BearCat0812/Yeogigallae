import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import CardLayout from '../components/CardLayout';
import Filter from '../components/Filter';

const Home = () => {
  const handleFilter = (filters) => {
    console.log(filters);
    // 여기서 filters.region, filters.dateType, filters.place를 사용해서 데이터를 필터링
  };

  return (
    <div className="home-container">
      <Banner />
      <Filter onFilter={handleFilter} />
      <CardLayout />
    </div>
  )
}

export default Home
