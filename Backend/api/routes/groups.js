const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Tier = require('../models/group')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Groups" })
})


router.get('/:tierID', (req, res, next) => {
    const tierID = req.params.tierID
    res.status(200).json({ name: tierID })
})


module.exports = router
