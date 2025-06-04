const mariadb = require('mariadb');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const expressSession = require('express-session');
const app = express();
const pool = mariadb.createPool({
    host: "192.168.0.191",
    user: "1team",
    password: "1team",
    database: "1team",
    port: "3306"
});

// DB 쿼리 실행 헬퍼 함수
const executeQuery = async (query, params = []) => {
    const conn = await pool.getConnection();
    try {
        return await conn.query(query, params);
    } finally {
        conn.release();
    }
};

// 필터링된 데이터 조회
async function print(region, dateType, places) {
    if (!region && !dateType && (!places || places.length === 0)) {
        return await executeQuery('SELECT region,placeName,address,dateType,place,imgName FROM database');
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
        SELECT region,placeName,address,dateType,place,imgName 
        FROM database 
        ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
    `;

    return await executeQuery(query, params);
}

// 회원가입 처리
async function registData(name, email, id, pw, tel) {
    if (!name || !email || !id || !pw || !tel) return false;

    const existingUser = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
    if (existingUser.length > 0) return false;

    await executeQuery(
        "INSERT INTO users(name,email,id,pw,tel) VALUES (?,?,?,?,?)",
        [name, email, id, pw, tel]
    );
    return true;
}

// 로그인 처리
async function login(id, pw) {
    const users = await executeQuery('SELECT id, pw FROM users WHERE id = ?', [id]);
    if (!users.length) return false;

    return await bcrypt.compare(pw, users[0].pw);
}

// 검색 처리
async function searchData(keyword) {
    const searchPattern = `%${keyword}%`;
    return await executeQuery(
        `SELECT region,placeName,address,dateType,place,imgName 
         FROM database 
         WHERE placeName LIKE ? OR address LIKE ? OR place LIKE ?`,
        [searchPattern, searchPattern, searchPattern]
    );
}

async function comment(num, name, title, detail, now) {
    if (num != undefined && name != null) {
        const db = await executeQuery("INSERT INTO comment(num,name,title,detail,date) VALUES (?,?,?,?,?)", [num, name, title, detail, now]);

        return db.affectedRows > 0;
    }
}

// 비밀번호 해싱
const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pw, salt);
};

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(expressSession({
    secret: 'KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 20, // 20분
    }
}));

// 라우트 설정
app.post('/regist', async (req, res) => {
    const { stat, id, name, email, pw, tel, ok } = req.body;

    if (stat === "idCompare") {
        const exists = await executeQuery('SELECT id FROM users WHERE id = ?', [id]);
        return res.json({
            success: !exists.length && id.length > 6,
            duplicateCheck: exists.length ? 1 : 0
        });
    }

    if (stat === "register" && ok === 0) {
        const success = await registData(name, email, id, await hashPassword(pw), tel);
        return res.json({ success, id: success ? id : null });
    }

    res.json({ success: false });
});

app.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    const isValid = await login(id, pw);

    if (!isValid) {
        return res.status(401).json({ success: false });
    }

    const user = await executeQuery('SELECT name,num FROM users WHERE id = ?', [id]);

    req.session.userNum = user[0].num;
    req.session.userId = id;
    req.session.userName = user[0].name;

    res.status(200).json({ success: true, id, name: req.session.userName });
});

app.post('/about', async (req, res) => {
    const { title, detail, now } = req.body;
    const setDB = await comment(req.session.userNum, req.session.userName, title, detail, now);

    if (setDB) {
        return res.json({ title, detail, now });
    }
});

app.post('/', async (req, res) => {
    const result = await print(req.body.region, req.body.dateType, req.body.places);
    res.json(result);
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false });
        }
        res.clearCookie('connect.sid'); // 기본 세션 쿠키 이름
        res.json({ success: true });
    });
});

app.post('/select', (req, res) => {

    return res.json({ name: req.session.userName })
})

app.get('/all', async (req, res) => {
    const result = await executeQuery('SELECT region,placeName,address,dateType,place,imgName FROM database');
    res.json(result);
});

app.get('/search', async (req, res) => {
    const result = req.query.keyword ? await searchData(req.query.keyword) : [];
    res.json(result);
});

app.get('/session-check', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, id: req.session.userId, name: req.session.userName });
    } else {
        res.json({ loggedIn: false });
    }
});

app.listen(8080, () => console.log('서버 실행 중...'));
