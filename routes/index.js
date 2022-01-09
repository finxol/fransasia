import path from 'path';
import mobile from '../public/js/mobile.js';
import express from 'express';
import {fileURLToPath} from "url";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'index',
        mobile: !!mobile(req.headers['user-agent'])
    });
});

/* GET home page. */
router.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'about',
        mobile: !!mobile(req.headers['user-agent'])
    });
});

router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "images", "favicon", "favicon.ico"))
});

export default router;
