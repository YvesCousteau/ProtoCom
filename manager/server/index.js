/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
// API File
// import { init, equipements, services } from "api.js";
const api = require("./api");
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
api.init(app);
/***************/
api.equipements(app);
/***************/
api.services(app);
/***************/

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

