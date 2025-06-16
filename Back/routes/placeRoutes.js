const express = require('express');
const router = express.Router();
const placeModel = require('../models/placeModel');

// 필터링된 장소 조회
router.post('/', async (req, res) => {
    try {
        const result = await placeModel.getFilteredPlaces(req.body.region, req.body.dateType, req.body.places);
        res.json(result);
    } catch (error) {
        console.error('장소 조회 오류:', error);
        res.status(500).json({ error: '장소를 불러오는 중 오류가 발생했습니다.' });
    }
});

// 모든 장소 조회
router.get('/all', async (req, res) => {
    try {
        const data = await placeModel.getAllPlaces();
        res.json(data);
    } catch (error) {
        console.error('데이터 조회 오류:', error);
        res.status(500).json({ error: '데이터를 불러오는 중 오류가 발생했습니다.' });
    }
});

// 장소 검색
router.get('/search', async (req, res) => {
    try {
        const result = req.query.keyword ? await placeModel.searchPlaces(req.query.keyword) : [];
        res.json(result);
    } catch (error) {
        console.error('검색 오류:', error);
        res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
    }
});

// 장소 상세 정보 조회
router.get('/place-details/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        const placeEx = await placeModel.getPlaceDetails(placeId);

        if (placeEx.length > 0) {
            res.json({
                success: true,
                placeEx: placeEx[0].placeEx
            });
        } else {
            res.json({
                success: false,
                message: "장소를 찾을 수 없습니다."
            });
        }
    } catch (error) {
        console.error('Error in /place-details:', error);
        res.json({
            success: false,
            message: "서버 오류가 발생했습니다."
        });
    }
});

module.exports = router; 