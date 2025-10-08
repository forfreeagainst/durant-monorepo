const express = require('express');
const router = express.Router();
const clockInModel = require('../../model/clockIn.js');

router.get('/add', async (req, res) => {
    const clockInObj = new clockInModel({
        isSign: false,
        signTime: ''
    })
    await clockInObj.save()

    res.send('A模块，签到记录增加');
})

module.exports = router;