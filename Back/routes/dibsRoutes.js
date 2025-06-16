const express = require('express');
const router = express.Router();
const dibsModel = require('../models/dibsModel');

// 찜 추가
router.post('/dibs', async (req, res) => {
    const { placeId } = req.body;
    const check = await dibsModel.checkDibs(req.session.userNum, placeId);

    if (req.session.userId && !check.result) {
        const result = await dibsModel.addDibs(req.session.userNum, placeId);
        res.json(result);
    } else {
        res.json({ success: false });
    }
});

// 찜 삭제
router.post('/dibs-delete', async (req, res) => {
    const { placeId } = req.body;
    const check = await dibsModel.checkDibs(req.session.userNum, placeId);

    if (req.session.userId && check.result) {
        const result = await dibsModel.removeDibs(req.session.userNum, placeId);
        res.json(result);
    } else {
        res.json({ success: false });
    }
});

// 찜 확인
router.get('/dibs/:id', async (req, res) => {
    const result = await dibsModel.checkDibs(req.session.userNum, req.params.id);
    res.json(result);
});

// 찜 목록 조회
router.get('/dibs-list', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: '로그인이 필요합니다.' });
    }

    try {
        const dibsList = await dibsModel.getDibsList(req.session.userNum);
        res.json(dibsList);
    } catch (error) {
        console.error('찜 목록 조회 실패:', error);
        res.status(500).json({ error: '찜 목록을 가져오는데 실패했습니다.' });
    }
});

module.exports = router; 