//const express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../shared/app-constants');
const router = require('express').Router();
const chartsController = require('../controller/charts.controller');
const multer = require('multer');
const uploadFile = multer();

//Function to validate token
router.use(function (req, res, next) {

    //Check if CORS Request
    if(req.method === 'OPTIONS') next();

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                return res.status(400).json({success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.post('/createPieChart', uploadFile.single('file'), chartsController.createPieChart);

router.post('/createBarChart', uploadFile.single('file'), chartsController.createBarChart);

router.post('/createLineChart', uploadFile.single('file'), chartsController.createLineChart);

router.post('/createDonutChart', uploadFile.single('file'), chartsController.createDonutChart);

router.post('/saveChart', chartsController.saveGeneratedChart);

router.get('/getAllCharts', chartsController.getCharts);

module.exports = router;
