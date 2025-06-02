const mariadb = require('mariadb');
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const pool = mariadb.createPool({
    host: "192.168.0.191",
    user: "1team",
    password: "1team",
    database: "1team",
    port: "3306"
})

// try-catch-finally 사용 권장

async function registData(name, email, id, pw, tel) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, pw FROM users WHERE id = ?', [id]);

    if (rows.length == 0 || rows[0].id !== id) {
        if (name !== "" && email !== "" && id !== "" && pw !== "" && tel !== "") {
            await conn.query("INSERT INTO users(name,email,id,pw,tel) VALUES (?,?,?,?,?)", [name, email, id, pw, tel]);
            console.log("회원가입 성공");
            conn.release();

            return true;

        } else {
            console.log("회원가입 실패");
            return false;
        }
    } else {
        console.log("이미 존재하는 아이디 입니다.");
        conn.release();

        return false;
    }
}

async function login(id, pw) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, pw FROM users WHERE id = ?', [id]);
    const result = await bcrypt.compare(pw, rows[0].pw);
    if (rows.length > 0) {
        if (result == true) {
            console.log("로그인 성공");
            conn.release();

            return true;
        } else {
            console.log("비밀번호가 다릅니다");

            return false;
        }
    } else {
        console.log("아이디를 확인해주세요");

        return false;
    }
}

async function searchIdToName(id) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT name FROM users WHERE id = ?', [id]);
    conn.release();

    return rows[0].name;
}

async function compareData(id) {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT id FROM users WHERE id = ?', [id]);
    conn.release();

    if (rows[0] === undefined) {
        return false;
    } else {
        return rows[0].id
    }
}

async function print(region, dateType, places) {
    let conn = await pool.getConnection();
    const place1 = "";
    const place2 = "";
    if (places.length == 2) {
        const rows = await conn.query('SELECT region,placeName,address,dateType,place,imgName FROM database WHERE region = ? AND dateType = ? AND (place = ? OR place = ?)', [region, dateType, places[0], places[1]]);
        conn.release();
        return rows;
    } else {
        const rows = await conn.query('SELECT region,placeName,address,dateType,place,imgName FROM database WHERE region = ? AND dateType = ? AND place = ?', [region, dateType, places[0]]);
        conn.release();
        return rows;
    }
}

const hashingPw = async (pw) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(pw, salt);
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(expressSession({
    secret: 'KEY',
    resave: false,
    saveUninitialized: true
}));

app.post('/regist', async (req, res) => {
    const { stat } = req.body;
    if (stat == "idCompare") {
        const { id } = req.body;
        const comp = await compareData(id);

        if (comp != false) {
            return res.json({ success: false, duplicateCheck: 1 });
        } else {
            if (id.length <= 6) {
                return res.json({ success: false, duplicateCheck: 0 });
            } else {
                return res.json({ success: true, duplicateCheck: 0 });
            }
        }

    } else if (stat == "register") {
        const { name, email, id, pw, tel, ok } = req.body;
        if (ok == 0) {
            const reg = await registData(name, email, id, await hashingPw(pw), tel);

            if (reg == true) {
                return res.json({ success: true, id: id });
            } else {
                return res.json({ success: false });
            }
        } else {
            return res.json({ success: false });
        }
    }
})

app.post('/login', async (req, res) => {
    const { id, pw } = req.body;
    const check = await login(id, pw);
    const name = await searchIdToName(id);
    if (check == true) {
        return res.status(200).json({ success: true, id: id, name: name });
    } else {
        return res.status(401).json({ success: false });
    }
})

app.post('/', async (req, res) => {
    const { region, dateType, places } = req.body;
    const result = await print(region, dateType, places);

    return res.json(result);
})

// app.post('/select', async (req, res) => {
//     const { selectedRegion, dateType, selectedPlaces } = req.body;
//     console.log(selectedPlaces);
//     const result = await print(selectedRegion, dateType, selectedPlaces);

//     return res.json(result);
// })

app.listen(8080, () => {
    console.log('서버 실행 중...');
});
