const bodyParser = require('body-parser')
const viewEngine = require('./config/viewEngine')
const initWebRoutes = require('./route/web')
const express = require('express')
const path = require('path')
require('dotenv').config();
// import express from "express"
const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME || "localhost"
import e from 'express'
import connectDB from './config/connextDB'
import cors from 'cors'

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
// console.log("check env", process.env)
//config template
app.use(cors({ origin: true }))
viewEngine(app);
initWebRoutes(app);
connectDB();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, hostname, () => {

    console.log(`Example app listening on port ${port}`)

})