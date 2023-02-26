function device(app,db) {
    app.get("/api/device/all", (req, res, next) => {
        db.run(
            `SELECT
                device.id,
                device.name,
                device.ip,
                device.voltage,
                device.amperage
            FROM device`, 
            [], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/device/basic/:name", (req, res, next) => {
        db.run(
            `SELECT
                device.id,
                device.name,
                device.ip,
                device.voltage,
                device.amperage
            FROM device WHERE device.name LIKE ?`, 
            [req.params.name], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/device/full/:name", (req, res, next) => {
        db.run(
            `SELECT
                device.id,
                device.name,
                device.ip,
                device.voltage,
                device.amperage,
                service.id,
                service.name,
                service.com,
                service.api,
                service.removable
            FROM rel_device_service 
            INNER JOIN device ON device.id = rel_device_service.id_device
            INNER JOIN service ON service.id = rel_device_service.id_service
            WHERE device.name LIKE ?`, 
            [req.params.name], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.post("/api/device/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                device (name, ip, voltage, amperage) 
            VALUES 
                (?,?,?,?)`, 
            [req.body.name,req.body.ip,req.body.voltage,req.body.amperage], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.patch("/api/device/:name", (req, res, next) => {
        db.run(
            `UPDATE 
                device 
            SET
                device.name = COALESCE(?,name),
                device.ip = COALESCE(?,ip),
                device.voltage = COALESCE(?,voltage),
                device.amperage = COALESCE(?,amperage), 
            WHERE device.name LIKE ?`,
            [req.body.name, req.body.ip, req.body.voltage, req.body.amperage, req.params.name],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success"
                })
            });
    });
    app.delete("/api/device/:name", (req, res, next) => {
        db.run(
            'DELETE FROM device WHERE device.name LIKE ?',
            [req.params.name], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

function service(app,db) {
    app.get("/api/service/all", (req, res, next) => {
        db.run(
            `SELECT
                service.id,
                service.name,
                service.com,
                service.api,
                service.removable
            FROM service`, 
            [], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/service/basic/:name", (req, res, next) => {
        db.run(
            `SELECT
                service.id,
                service.name,
                service.com,
                service.api,
                service.removable
            FROM service WHERE service.name LIKE ?`, 
            [req.params.name], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/service/full/:name", (req, res, next) => {

    });
    app.get("/api/service/arguments/:id", (req, res, next) => {
        db.run(
            `SELECT
                argument.id,
                argument.argument
            FROM argument
            WHERE argument.id_service = ?`, 
            [req.params.id], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.post("/api/service/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                service (name, com, api, removable) 
            VALUES 
                (?,?,?,?)`, 
            [req.body.name,req.body.com,req.body.api,req.body.removable], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.patch("/api/service/:name", (req, res, next) => {
        db.run(
            `UPDATE 
                service 
            SET
                service.name = COALESCE(?,name),
                service.com = COALESCE(?,com),
                service.api = COALESCE(?,api),
                service.removable = COALESCE(?,removable)
            WHERE service.name LIKE ?`,
            [req.body.name, req.body.com, req.body.api, req.body.removable, req.params.name],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success"
                })
            });
    });
    app.delete("/api/service/:name", (req, res, next) => {
        db.run(
            'DELETE FROM service WHERE service.name LIKE ?',
            [req.params.name], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

function scenario(app,db) {
    app.get("/api/scenario/all", (req, res, next) => {
        db.run(
            `SELECT
                scenario.name
            FROM scenario`, 
            [], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/scenario/basic/:name", (req, res, next) => {
        db.run(
            `SELECT
                scenario.name
            FROM scenario WHERE scenario.name LIKE ?`, 
            [], function (err, row) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": row,
                })
            });
    });
    app.get("/api/scenario/full/:name", (req, res, next) => {});
    app.post("/api/scenario/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                scenario (name) 
            VALUES 
                (?)`, 
            [req.body.name], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.patch("/api/scenario/:name", (req, res, next) => {
        db.run(
            `UPDATE 
                scenario 
            SET
                scenario.name = COALESCE(?,name),
            WHERE scenario.name LIKE ?`,
            [req.body.name, req.params.name],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success"
                })
            });
    });
    app.delete("/api/scenario/:name", (req, res, next) => {
        db.run(
            'DELETE FROM scenario WHERE scenario.name LIKE ?',
            [req.params.id], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

function argument(app,db) {
    app.post("/api/argument/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                argument (name, id_service) 
            VALUES 
                (?,?)`, 
            [req.body.argument,req.body.id_service], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.delete("/api/argument/:name", (req, res, next) => {
        db.run(
            'DELETE FROM argument WHERE argument.id = ?',
            [req.params.name], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

function action(app,db) {
    app.post("/api/action/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                action (name, id_device, id_service, id_argument, id_scenario) 
            VALUES 
                (?,?,?,?,?)`, 
            [req.body.name,req.body.id_device,req.body.id_service,req.body.id_argument,req.body.id_scenario], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.delete("/api/action/:id", (req, res, next) => {
        db.run(
            'DELETE FROM action WHERE action.id = ?',
            [req.params.id], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

function init(app) {
    app.get('/api', (req, res) => {
        res.json({ "message": "Server is UP !" });
    });
}

module.exports = { init, device, service, scenario, argument, action };