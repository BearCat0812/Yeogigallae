const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { validateEmail, validatePassword, validatePhoneNumber } = require('../utils/validators');

// 세션 체크
router.get('/session-check', (req, res) => {
    if (req.session.userId) {
        res.json({ 
            loggedIn: true, 
            id: req.session.userId, 
            name: req.session.userName,
            userNum: req.session.userNum 
        });
    } else {
        res.json({ loggedIn: false });
    }
});

// 회원가입
router.post('/regist', async (req, res) => {
    const { stat, id, name, email, pw, tel, ok } = req.body;

    if (stat === "idCompare") {
        const exists = await userModel.checkIdExists(id);
        return res.json({
            success: !exists && id.length > 6,
            duplicateCheck: exists ? 1 : 0
        });
    }

    if (stat === "register" && ok === 0) {
        try {
            if (!name || !email || !id || !pw || !tel) {
                return res.json({ success: false, message: "모든 필드를 입력해주세요." });
            }

            if (!validateEmail(email)) {
                return res.json({ success: false, message: "올바른 이메일 형식이 아닙니다." });
            }

            if (!validatePassword(pw)) {
                return res.json({ success: false, message: "비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다." });
            }

            if (!validatePhoneNumber(tel)) {
                return res.json({ success: false, message: "올바른 전화번호 형식이 아닙니다." });
            }

            const result = await userModel.register(name, email, id, pw, tel);
            return res.json(result);
        } catch (error) {
            console.error('회원가입 오류:', error);
            return res.json({ success: false, message: "서버 오류가 발생했습니다." });
        }
    }

    res.json({ success: false });
});

// 로그인
router.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    const result = await userModel.login(id, pw);

    if (!result) {
        return res.status(401).json({ success: false });
    }

    req.session.userNum = result.userNum;
    req.session.userId = id;
    req.session.userName = result.userName;

    res.status(200).json({ success: true, id, name: result.userName });
});

// 로그아웃
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true });
    });
});

// 사용자 정보 조회
router.post('/user-info', async (req, res) => {
    const { id } = req.body;
    try {
        const user = await userModel.getUserInfo(id);
        if (user.length > 0) {
            res.json({
                success: true,
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                tel: user[0].tel
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// 사용자 정보 업데이트
router.post('/update-user', async (req, res) => {
    const { id, name, email, pw, tel } = req.body;

    try {
        if (!id || !name || !email || !tel) {
            return res.json({ success: false, message: "필수 정보가 누락되었습니다." });
        }

        if (!validateEmail(email)) {
            return res.json({ success: false, message: "올바른 이메일 형식이 아닙니다." });
        }

        if (!validatePhoneNumber(tel)) {
            return res.json({ success: false, message: "올바른 전화번호 형식이 아닙니다." });
        }

        if (pw && !validatePassword(pw)) {
            return res.json({ success: false, message: "비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다." });
        }

        const result = await userModel.updateUser(id, name, email, pw, tel);
        res.json(result);
    } catch (error) {
        console.error('Error updating user:', error);
        res.json({ success: false, message: "서버 오류가 발생했습니다." });
    }
});

// 회원탈퇴
router.post('/delete-user', async (req, res) => {
    if (!req.session.userId) {
        return res.json({ success: false, message: '로그인이 필요합니다.' });
    }

    try {
        const result = await userModel.deleteUser(req.session.userNum);
        if (result.success) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('세션 삭제 실패:', err);
                    return res.json({ success: false, message: '회원탈퇴 중 오류가 발생했습니다.' });
                }
                res.json({ success: true, message: '회원탈퇴가 완료되었습니다.' });
            });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error('회원탈퇴 실패:', error);
        res.json({ success: false, message: '회원탈퇴 중 오류가 발생했습니다.' });
    }
});

// 세션 사용자 이름 조회
router.post('/select', (req, res) => {
    return res.json({ name: req.session.userName });
});

module.exports = router; 