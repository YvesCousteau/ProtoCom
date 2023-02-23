/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3001;
// JSON CONFIG
const fs = require('fs');
const systemName = '../config/system.json';
const system = require(systemName);
const devicesName = '../config/devices.json';
const devices = require(devicesName);
const functionsName = '../config/functions.json';
const functions = require(functionsName);
const scenariosName = '../config/scenarios.json';
const scenarios = require(scenariosName);
// API File
import { Api } from "api.js";
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
app.get('/api', (req, res) => {
    if (system == null || devices == null || functions == null) {
        res.status(400).json({ "error": "Missing config JSON file" });
        return;
    }
    res.json({"message": "Server is UP !"});
});

/***************/
Api.equipements(app);
/***************/
Api.services(app);
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

