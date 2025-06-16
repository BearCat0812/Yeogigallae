const { executeQuery } = require('../config/database');

// 필터링된 데이터 조회
const getFilteredPlaces = async (region, dateType, places) => {
    if (!region && !dateType && (!places || places.length === 0)) {
        return await executeQuery('SELECT id,region,placeName,address,dateType,place,imgName FROM `database`');
    }

    const conditions = [];
    const params = [];

    if (region) {
        conditions.push('region = ?');
        params.push(region);
    }
    if (dateType) {
        conditions.push('dateType = ?');
        params.push(dateType);
    }
    if (places?.length) {
        const placeCondition = places.length === 1
            ? 'place = ?'
            : '(place = ? OR place = ?)';
        conditions.push(placeCondition);
        params.push(...places);
    }

    const query = `
        SELECT id,region,placeName,address,dateType,place,imgName 
        FROM \`database\` 
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
    `;

    return await executeQuery(query, params);
};

// 검색 처리
const searchPlaces = async (keyword) => {
    const searchPattern = `%${keyword}%`;
    return await executeQuery(
        `SELECT id,region,placeName,address,dateType,place,imgName 
         FROM \`database\` 
         WHERE placeName LIKE ? OR address LIKE ? OR place LIKE ?`,
        [searchPattern, searchPattern, searchPattern]
    );
};

// 장소 상세 정보 조회
const getPlaceDetails = async (placeId) => {
    return await executeQuery('SELECT placeEx FROM `database` WHERE id = ?', [placeId]);
};

// 모든 장소 조회
const getAllPlaces = async () => {
    return await executeQuery('SELECT id,region,placeName,address,dateType,place,imgName FROM `database`');
};

module.exports = {
    getFilteredPlaces,
    searchPlaces,
    getPlaceDetails,
    getAllPlaces
}; 