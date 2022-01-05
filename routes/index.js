const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'index'
    });
});

router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "images", "favicon", "favicon.ico"))
});

module.exports = router;
