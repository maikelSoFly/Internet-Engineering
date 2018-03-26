const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Tier = require('../models/tier')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Tiers were fetched'
    })
})

router.get('/:tierID', (req, res, next) => {
    const tierID = req.params.tierID

    if (tierID === 'urgents') {
        res.status(200).json({
            message: 'Urgent tasks',
            tierID: tierID
        })
    } else if (tierID === 'moderates') {
        res.status(200).json({
            message: 'Moderate tasks',
            tierID: tierID
        })
    } else if (tierID === 'optionals') {
        res.status(200).json({
            message: 'Optional tasks',
            tierID: tierID
        })
    } else {
        res.status(404).json({
            message: 'Tier not found',
            tierID: tierID
        })
    }
})


module.exports = router
