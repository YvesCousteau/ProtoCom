/****************/
/***** Init *****/
/****************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
const api = require("./api/general");
const apiDevice = require("./api/device");
const apiService = require("./api/service");
const apiScenario = require("./api/scenario");
const apiArgument = require("./api/argument");
const apiAction = require("./api/action");
const apiRelDeviceService = require("./api/rel_device_service");
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
apiDevice.device(app,db);
apiService.service(app,db);
apiScenario.scenario(app,db);
apiArgument.argument(app,db);
apiAction.action(app,db);
apiRelDeviceService.rel_device_service(app,db);
/***************/
api.execution(app);
api.ping(app);
api.diagram(app);
/***************/
api.exit(app);
/****************************/
/***** Server Listening *****/
/****************************/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
