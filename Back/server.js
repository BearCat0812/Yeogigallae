const mariadb = require('mariadb');
const express = require('express');
const app = express();
const cors = require('cors');

const pool = mariadb.createPool({
	host: "192.168.0.191",
	user: "1team",
	password: "1team",
	database: "1team",
	port: "3306"
})

async function getData() {
    let conn = await pool.getConnection();
    const rows = await conn.query('SELECT test FROM todolist');
    return rows;
    console.log(rows);
}

async function registData(data) {
    let conn = await pool.getConnection();
    conn.query("INSERT INTO todolist(text) VALUES (?)",[data]);
}

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const rows = await getData();
    res.json(rows);
    // let conn = await pool.getConnection();
    // const rows = await conn.query('SELECT text FROM todolist');
    // res.json(rows);
})

app.post('/', async (req, res) => {
    const { text } = req.body;
    registData(text);
    res.json({success:true});
})


app.listen(8080, () => {
    console.log('서버 실행 중');
});
