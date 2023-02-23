function equipements(app) {
    // GetDevices
    app.get("/api/devices", (req, res, next) => {
        if (devices.devices == {}) {
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
        if (functions.functions == {}) {
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
        if (scenarios.scenarios == {}) {
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
        if (devices.devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        for (const item of devices.devices) {
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
        if (functions.functions == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        for (const item of functions.functions) {
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
        if (scenarios.scenarios == {}) {
            res.status(400).json({ "error": "No function" });
            return;
        }
        for (const item of scenarios.scenarios) {
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
        if (devices.devices == {}) {
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
        for (const item of devices.devices) {
            if (item.name == req.params.name) {
                // Check if we can add the function
                if (!item.functions.includes(req.body.name)) {
                    item.functions.push(req.body.name);
                    fs.writeFile(devicesName, JSON.stringify(devices), function writeJSON(err) {
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
        const name = req.body.name;
        var errors = []
        if (devices.devices == {}) {
            res.status(400).json({ "error": "No device" });
            return;
        }
        if (!name) {
            errors.push("No name specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        // Select the right Device
        for (const item of devices.devices) {
            if (item.name == req.params.name) {
                // Check if we can remove the function
                if (item.functions.includes(name) && item.functions) {
                    let counter = 0;
                    // Search where is the function 
                    for (const fct of item.functions) {
                        // Check if where the function has to be remove
                        if (fct == name) {
                            item.functions.splice(counter, 1);
                            fs.writeFile(devicesName, JSON.stringify(devices), function writeJSON(err) {
                                if (err) return console.log(err);
                            });
                            console.log(item.functions);
                            res.json({ "message": "success" })
                            return;
                        }
                        counter = counter + 1;
                    }
                }

            }
        }
        res.status(400).json({ "error": "No device" });
        return;
    });
}

function services(app) {
    // ServicePower
    app.post("/api/service/power/:option/:ip", (req, res) => {
        try {
            exec('python3 ../services/power/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option)
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service power" });
            return;
        }
        res.json({ "message": system.ip + req.params.ip + " is " + req.params.option + " ..." });
    });
    // ServiceSound
    app.post("/api/service/sound/:output/:ip", (req, res) => {
        try {
            exec('python3 ../services/sound/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.output)
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
            exec('python3 ../services/max7219/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.output)
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
            exec('python3 ../services/cluster/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option)
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service HMI" });
            return;
        }
        res.json({ "message": system.ip + req.params.ip + " is " + req.params.option + " ..." });
    });
    // ServiceIvi
    app.post("/api/service/ivi/:option/:ip/", (req, res) => {
        try {
            exec('python3 ../services/ivi/client_master.py ' + system.ip + req.params.ip + ' ' + req.params.option)
        } catch {
            console.log("error");
            res.status(400).json({ "error": "No service HMI" });
            return;
        }
        res.json({ "message": system.ip + req.params.ip + " is " + req.params.option + " ..." });
    });
}