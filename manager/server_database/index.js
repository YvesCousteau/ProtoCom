/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
// =======================================
const db = require("./database");
// API File
const api = require("./api");
/*****************/
/***** Start *****/
/*****************/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/***************/
/***** API *****/
/***************/
api.init(app,db);
/***************/
api.device(app,db);
api.service(app,db);
api.scenario(app,db);
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

