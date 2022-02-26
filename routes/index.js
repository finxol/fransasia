import path from 'path';
import mobile from '../public/js/mobile.js';
import express from 'express';
import {fileURLToPath} from "url";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* GET favicon */
router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "images", "favicon", "favicon.ico"))
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'index',
        mobile: !!mobile(req.headers['user-agent'])
    });
});

/* GET about page. */
router.get(/^\/(about|partner-deal|manage-deal|convergence|green|macau)$/, (req, res, next) => {
    let page = req.path.substring(1);
    res.render(page, {
        title: page,
        mobile: !!mobile(req.headers['user-agent'])
    });
});


export default router;
