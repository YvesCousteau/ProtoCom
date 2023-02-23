/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;
// API File
// import { Api } from "api.js";
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
init(app);
/***************/
equipements(app);
/***************/
services(app);
/***************/
app.get('*', (req, res) => {
    res.status(404).json({ "error": "Path does not exist" })
    res.json({
        "message": "Path does not exist",
    });
});
/****************************/
/***** Server Listening *****/
/****************************/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

