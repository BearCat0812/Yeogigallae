const express = require('express');
const router = express.Router();
const reviewModel = require('../models/reviewModel');

// 리뷰 작성
router.post('/about', async (req, res) => {
    const { title, detail, now, placeId } = req.body;
    try {
        const setDB = await reviewModel.createReview(
            req.session.userNum,
            placeId,
            req.session.userName,
            title,
            detail,
            now
        );

        if (setDB) {
            const reviews = await reviewModel.getReviews(placeId);
            return res.json({
                success: true,
                reviews: reviews
            });
        }

        res.json({
            success: false,
            message: "댓글 저장에 실패했습니다."
        });
    } catch (error) {
        console.error('Error in /about:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

// 리뷰 조회
router.get('/reviews/:placeId', async (req, res) => {
    try {
        const placeId = req.params.placeId;
        const reviews = await reviewModel.getReviews(placeId);

        res.json({
            success: true,
            reviews: reviews
        });
    } catch (error) {
        console.error('Error in /reviews:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

// 리뷰 삭제
router.delete('/reviews/:placeId/:userId/:reviewId', async (req, res) => {
    const { placeId, userId, reviewId } = req.params;
    
    if (!req.session.userId) {
        return res.json({ success: false, message: '로그인이 필요합니다.' });
    }

    try {
        const success = await reviewModel.deleteReview(reviewId, userId, placeId);
        if (success) {
            res.json({ success: true, message: '리뷰가 삭제되었습니다.' });
        } else {
            res.json({ success: false, message: '삭제할 수 없는 리뷰입니다.' });
        }
    } catch (error) {
        console.error('리뷰 삭제 실패:', error);
        res.json({ success: false, message: '리뷰 삭제 중 오류가 발생했습니다.' });
    }
});

module.exports = router; 