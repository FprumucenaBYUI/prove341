const path = require('path');

const express = require('express');


const router = express.Router();
var jsonEngine = require('../controllers/shop');

router.get('/', jsonEngine.processJson)
    .post('/', jsonEngine.getIndex)
module.exports = router;

module.exports = router;