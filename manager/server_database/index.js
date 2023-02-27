/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { exec } = require('child_process')
const PORT = process.env.PORT || 3001;
// =======================================
var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
    }
});
const database = require("./database");
database.setup(db);
// API File
const api = require("./api");
const api_device = require("./api_device");
const api_service = require("./api_service");
const api_scenario = require("./api_scenario");
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
app.get('/api', (req, res) => {
    res.json({ "message": "Server is UP !" });
});
/***************/
api_device.device(app,db);
api_service.service(app,db);
api_scenario.scenario(app,db);
api.argument(app,db);
api.action(app,db);
/***************/
app.post("/api/execution/:name/:option/:ip/", (req, res) => {
    try {
        exec('python3 ../services/'+req.params.name+'/client_master.py ' +req.params.ip+' '+req.params.option, function (error, stdout, stderr) {
            res.json({ 
                "message":"success"
            })
        });
    } catch {
        console.log("error");
        res.status(400).json({ "error": "No service HMI" });
        return;
    }
});
/***************/
fcts(app)
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


function fcts(app) {
    // Ping Device
    app.get("/api/ping/:ip", (req, res) => {
        try {
            console.log("ping -c 1 "+req.params.ip + " | grep 100% | wc -l");
            exec("ping -c 1 "+req.params.ip + " | grep 100% | wc -l", function (error, stdout, stderr) {
                if (stdout > 0) {
                    stdout = false;
                } else {
                    stdout = true;
                }
                res.json({ 
                    "message":"success",
                    "data": stdout
                })
            });
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No device up" });
            return;
        }
    });
    // Diagram Devices
    app.get("/api/diagram", (req, res) => {
        try {
            exec("python3 ../../assets/graphiz/graphiz.py", function (error, stdout, stderr) {
                res.json({ 
                    "message":"success"
                })
            });
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No device up" });
            return;
        }
    });
}