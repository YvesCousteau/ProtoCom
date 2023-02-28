function ping(app) {
    app.get("/api/ping/:ip", (req, res) => {
        try {
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
}

function execution(app) {
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
}

function diagram(app) {
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

function init(app) {
    app.get('/api', (req, res) => {
        res.json({ "message": "Server is UP !" });
    });
}

function exit(app) {
    app.get('*', (req, res) => {
        res.status(404).json({ "error": "Path does not exist" })
        res.json({
            "message": "Path does not exist",
        });
    });
}

module.exports = { init, exit, ping, diagram, execution };