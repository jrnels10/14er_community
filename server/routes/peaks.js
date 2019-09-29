const express = require('express');
const router = require('express-promise-router')();

// const Peak = require('./../models/peaks');


const { validateBody, schema } = require('../helpers/routeHelpers');
const PeakController = require('../controllers/peaks');


router.route('/peaksDetails')
    .get(PeakController.peaksDetails);

router.route('/peaksUpdate/')
    .put(PeakController.peaksUpdate);

router.route('/peakscompleted/')
    .get(PeakController.peaksCompleted);
module.exports = router;