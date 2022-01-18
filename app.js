import createError from 'http-errors';
import express from 'express';
import hbs from 'express-hbs';
import helmet from "helmet";
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/index.js';
import mobile from './public/js/mobile.js';
import fs from "fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const relative = p => path.join(__dirname, p);

// view engine setup
const viewsDir = relative('views');
app.use(express.static(relative('public')));

// Use express-helmet to enhance protection against attacks
app.use(helmet());

// Hook in express-hbs and tell it where known directories reside
app.engine('hbs', hbs.express4({
    layoutsDir: relative('views/layout'),
    defaultLayout: relative('views/layout.hbs'),
}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

hbs.registerHelper('isCurrentPage', (a, b, options) => {
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
});


let format = app.get('env') === "developement" ? 'dev' : 'tiny';
app.use(logger(format));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.year = new Date().getFullYear();

app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: 'index',
        mobile: !!mobile(req.headers['user-agent'])
    });
});

export default app;
