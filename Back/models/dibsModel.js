const { executeQuery } = require('../config/database');

// 찜 추가
const addDibs = async (userNum, placeId) => {
    try {
        await executeQuery('INSERT INTO dibs(users_num,database_id) VALUES (?,?)', [userNum, placeId]);
        return { success: true };
    } catch (error) {
        console.error('찜 추가 실패:', error);
        return { success: false };
    }
};

// 찜 삭제
const removeDibs = async (userNum, placeId) => {
    try {
        await executeQuery('DELETE FROM dibs WHERE users_num = ? AND database_id = ?', [userNum, placeId]);
        return { success: true };
    } catch (error) {
        console.error('찜 삭제 실패:', error);
        return { success: false };
    }
};

// 찜 확인
const checkDibs = async (userNum, placeId) => {
    try {
        const data = await executeQuery('SELECT users_num,database_id FROM dibs WHERE users_num = ? AND database_id = ?', 
            [userNum, placeId]);
        return { result: data.length > 0 };
    } catch (error) {
        console.error('찜 확인 실패:', error);
        return { result: false };
    }
};

// 찜 목록 조회
const getDibsList = async (userNum) => {
    try {
        return await executeQuery(
            `SELECT p.id, p.placeName, p.address, p.imgName
             FROM \`database\` p 
             INNER JOIN dibs d ON p.id = d.database_id 
             WHERE d.users_num = ? 
             ORDER BY d.num DESC`,
            [userNum]
        );
    } catch (error) {
        console.error('찜 목록 조회 실패:', error);
        return [];
    }
};

module.exports = {
    addDibs,
    removeDibs,
    checkDibs,
    getDibsList
}; 