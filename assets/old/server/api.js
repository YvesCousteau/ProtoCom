// JSON CONFIG
const fs = require('fs');
const systemName = '../../config/system.json';
const system = require(systemName);
const devicesName = '../../config/devices.json';
const devices = require(devicesName);
const functionsName = '../../config/functions.json';
const functions = require(functionsName);
const scenariosName = '../../config/scenarios.json';
const scenarios = require(scenariosName);

const { exec } = require('child_process');

function init(app) {
    app.get('/api', (req, res) => {
        if (system == null || devices == null || functions == null) {
            res.status(400).json({ "error": "Missing config JSON file" });
            return;
        }
        res.json({ "message": "Server is UP !" });
    });
}
function fcts(app) {
    // Ping Device
    app.get("/api/ping/:ip", (req, res) => {
        try {
            exec("ping -c 1 "+system.ip + req.params.ip + " | grep 100% | wc -l", function (error, stdout, stderr) {
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
function equipements(app) {
    // GetDevices
    app.get("/api/devices", (req, res, next) => {
        if (devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        res.json({
            "message": "success",
            "data": devices
        })
    });
    // GetFunctions
    app.get("/api/functions", (req, res, next) => {
        if (functions == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        res.json({
            "message": "success",
            "data": functions
        })
    });
    // GetScenarios
    app.get("/api/scenarios", (req, res, next) => {
        if (scenarios == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        res.json({
            "message": "success",
            "data": scenarios
        })
    });
    // GetDevice
    app.get("/api/device/:name", (req, res, next) => {
        const name = req.params.name;
        if (devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        for (const item of devices) {
            if (item.name == name) {
                res.json({
                    "message": "success",
                    "data": item
                })
                return;
            }
        }
    });
    // GetFunction
    app.get("/api/function/:name", (req, res, next) => {
        const name = req.params.name;
        if (functions == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        for (const item of functions) {
            if (item.name == name) {
                res.json({
                    "message": "success",
                    "data": item
                })
                return;
            }
        }
    });
    // GetScenario
    app.get("/api/scenario/:name", (req, res, next) => {
        const name = req.params.name;
        if (scenarios == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        for (const item of scenarios) {
            if (item.name == name) {
                res.json({
                    "message": "success",
                    "data": item
                })
                return;
            }
        }
    });
    // AddDeviceFunction
    app.post("/api/device/:name", (req, res, next) => {
        const name = req.params.name;
        var errors = []
        if (devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        // Select the right Device
        for (const item of devices) {
            if (item.name == req.params.name) {
                // Check if we can add the function
                if (!item.functions.includes(req.body.name)) {
                    item.functions.push(req.body.name);
                    fs.writeFile(devicesName, JSON.stringify(devices, null, 4), function writeJSON(err) {
                        if (err) return console.log(err);
                    });
                    res.json({ "message": "success" })
                    return;
                } else {
                    res.status(400).json({ "error": "Already present" });
                    return;
                }
            }
        }
        res.status(400).json({ "error": "No device" });
        return;
    });
    // DeleteDeviceFunction
    app.delete("/api/device/:name", (req, res, next) => {
        const id = req.body.id;
        var errors = []
        if (devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        if (id == null) {
            errors.push("No id specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        // Select the right Device
        for (const item of devices) {
            if (item.name == req.params.name) {
                item.functions.splice(id, 1);
                fs.writeFile(devicesName, JSON.stringify(devices, null, 4), function writeJSON(err) {
                    if (err) return console.log(err);
                });
                res.json({ "message": "success" })
                return;
            }
        }
        res.status(400).json({ "error": "No device" });
        return;
    });
    // AddScenarioFunction
    app.post("/api/scenario", (req, res, next) => {
        var errors = []
        if (scenarios == {}) {
            res.status(400).json({ "error": "No scenario" });
            return;
        }
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (!req.body.scenario) {
            errors.push("No scenario specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        for (const item of scenarios) {
            if (item.name == req.body.name) {
                res.status(400).json({ "error": "Name already used" });
                return;
            }
        }
        const newScenario = scenarios;
        newScenario.push(req.body);
        fs.writeFile(scenariosName, JSON.stringify(newScenario, null, 4), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.json({ "message": "success" })
        return;
    });
    // DeleteDeviceFunction
    app.delete("/api/scenario", (req, res, next) => {
        const id = req.body.id;
        var errors = []
        if (devices == {}) {
            res.status(400).json({ "error": "No scenario" });
            return;
        }
        if (id == null) {
            errors.push("No id specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        scenarios.splice(id, 1);
        fs.writeFile(devicesName, JSON.stringify(devices, null, 4), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.json({ "message": "success" })
        return;
    });
}

function services(app) {
    // ServicePower
    app.post("/api/service/power/:option/:ip", (req, res) => {
        try {
            exec('python3 ../services/power/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option, function (error, stdout, stderr) {
                res.json({ 
                    "message":"success"
                })
            });
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service power" });
            return;
        }
    });
    // ServiceSound
    app.post("/api/service/sound/:output/:ip", (req, res) => {
        try {
            exec('python3 ../services/sound/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option, function (error, stdout, stderr) {
                res.json({ 
                    "message":"success"
                })
            });
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service sound" });
            return;
        }
        res.json({ "message": system.ip + req.params.ip + " is " + req.params.output + " ..." });
    });
    // ServiceMax7219
    app.post("/api/service/max7219/:output/:ip", (req, res) => {
        try {
            exec('python3 ../services/max7219/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option, function (error, stdout, stderr) {
                res.json({ 
                    "message":"success"
                })
            });
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service max7219" });
            return;
        }
        res.json({ "message": system.ip + req.params.ip + " is " + req.params.output + " ..." });
    });
    // ServiceCluster
    app.post("/api/service/cluster/:option/:ip/", (req, res) => {
        try {
            exec('python3 ../services/cluster/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option, function (error, stdout, stderr) {
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
    // ServiceIvi
    app.post("/api/service/ivi/:option/:ip/", (req, res) => {
        try {
            exec('python3 ../services/ivi/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option, function (error, stdout, stderr) {
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
}

module.exports = { equipements, services, fcts, init };