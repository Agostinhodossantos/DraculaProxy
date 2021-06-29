const express = require('express')

const marsWeather = require('./mars-weather')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message: 'API - '
    })
})

router.use('/mars-weather', marsWeather)
module.exports = router