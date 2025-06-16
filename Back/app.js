const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');

const userRoutes = require('./routes/userRoutes');
const placeRoutes = require('./routes/placeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const dibsRoutes = require('./routes/dibsRoutes');

const app = express();

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

// 라우터 설정
app.use('/', userRoutes);
app.use('/', placeRoutes);
app.use('/', reviewRoutes);
app.use('/', dibsRoutes);

module.exports = app;