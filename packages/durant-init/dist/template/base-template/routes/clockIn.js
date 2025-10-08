const express = require('express');
const router = express.Router();

// 引入模块
const clockInA = require('./clockIn/clockInA');

router.get('/', (req, res) => {
    res.send('各类记录');
})

router.use('/clockInA', clockInA)

module.exports = router;