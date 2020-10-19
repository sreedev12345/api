import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyparser from 'body-parser'
var logger = require('morgan');
import mongoose from 'mongoose';
import config from './database/config';
const indexRouter = require('./routes/index');
const env = require('dotenv').config();


mongoose.connect(config.development.db,{useNewParser:true,useUnifiedTopology:true});
var db = mongoose.connection;
db.on('error',console.log.bind(console,'error mongodb'))


if(process.env.DEVELOPMENT === 'development') {
	mongoose.set('debug',true)
}

var app = express();
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
