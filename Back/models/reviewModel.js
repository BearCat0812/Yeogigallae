const { executeQuery } = require('../config/database');

// 한국어 날짜 문자열을 Date 객체로 변환하는 함수
const parseKoreanDate = (dateStr) => {
    try {
        const matches = dateStr.match(/(\d+)\.\s*(\d+)\.\s*(\d+)\.\s*(오전|오후)\s*(\d+):(\d+):(\d+)/);
        if (!matches) return new Date();

        let [_, year, month, day, ampm, hours, minutes, seconds] = matches;

        hours = parseInt(hours);
        if (ampm === '오후' && hours < 12) hours += 12;
        if (ampm === '오전' && hours === 12) hours = 0;

        return new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            hours,
            parseInt(minutes),
            parseInt(seconds)
        );
    } catch (error) {
        console.error('Date parsing error:', error);
        return new Date();
    }
};

// 리뷰 조회
const getReviews = async (placeId) => {
    try {
        const reviews = await executeQuery(
            `SELECT c.num, c.users_num, c.title, c.detail, c.date, c.name as userName 
             FROM comment c 
             WHERE c.database_id = ? 
             ORDER BY c.date DESC`,
            [placeId]
        );

        return reviews.map(review => ({
            ...review,
            date: review.date ? parseKoreanDate(review.date).toISOString() : new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error in getReviews:', error);
        return [];
    }
};

// 리뷰 작성
const createReview = async (userNum, placeId, name, title, detail, now) => {
    try {
        const result = await executeQuery(
            `INSERT INTO comment(users_num, database_id, name, title, detail, date)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [userNum, placeId, name, title, detail, now]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in createReview:', error);
        return false;
    }
};

// 리뷰 삭제
const deleteReview = async (reviewId, userId, placeId) => {
    try {
        const result = await executeQuery(
            'DELETE FROM comment WHERE num = ? AND users_num = ? AND database_id = ?',
            [reviewId, userId, placeId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteReview:', error);
        return false;
    }
};

module.exports = {
    getReviews,
    createReview,
    deleteReview
}; 