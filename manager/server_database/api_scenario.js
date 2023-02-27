function scenario(app,db) {
    app.get("/api/scenario/all/full", (req, res, next) => {
        db.all(
            `SELECT 
                scenario.scenario,
                device.device,
                service.service,
                argument.argument
            FROM scenario
            INNER JOIN action ON action.id_scenario = scenario.id
            INNER JOIN device ON device.id = action.id_device
            INNER JOIN service ON service.id = action.id_service
            INNER JOIN argument ON argument.id = action.id_argument`, 
            [], function (err, rows) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                console.log(rows);
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/all/basic", (req, res, next) => {
        db.all(
            `SELECT
                scenario.scenario
            FROM scenario`, 
            [], function (err, rows) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                console.log(rows);
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/single/full/:name", (req, res, next) => {
        db.all(
            `SELECT 
                scenario.scenario,
                device.device,
                service.service,
                argument.argument
            FROM scenario
            INNER JOIN action ON action.id_scenario = scenario.id
            INNER JOIN device ON device.id = action.id_device
            INNER JOIN service ON service.id = action.id_service
            INNER JOIN argument ON argument.id = action.id_argument
            WHERE scenario.scenario LIKE ?`, 
            [req.params.name], function (err, rows) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                console.log(rows);
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/single/basic/:name", (req, res, next) => {
        db.all(
            `SELECT
                scenario.scenario
            FROM scenario WHERE scenario.scenario LIKE ?`, 
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
    // ================================================================
    // app.post("/api/device/", (req, res, next) => {
    //     db.run(
    //         `INSERT INTO 
    //             device (name, ip, voltage, amperage) 
    //         VALUES 
    //             (?,?,?,?)`, 
    //         [req.body.name,req.body.ip,req.body.voltage,req.body.amperage], function (err, result) {
    //         if (err) {
    //             res.status(400).json({ "error": err.message })
    //             return;
    //         }
    //         res.json({
    //             "message": "success"
    //         })
    //     });
    // });
    // app.patch("/api/device/:name", (req, res, next) => {
    //     db.run(
    //         `UPDATE 
    //             device 
    //         SET
    //             device.name = COALESCE(?,name),
    //             device.ip = COALESCE(?,ip),
    //             device.voltage = COALESCE(?,voltage),
    //             device.amperage = COALESCE(?,amperage), 
    //         WHERE device.name LIKE ?`,
    //         [req.body.name, req.body.ip, req.body.voltage, req.body.amperage, req.params.name],
    //         function (err, result) {
    //             if (err) {
    //                 res.status(400).json({ "error": res.message })
    //                 return;
    //             }
    //             res.json({
    //                 "message": "success"
    //             })
    //         });
    // });
    // app.delete("/api/device/:name", (req, res, next) => {
    //     db.run(
    //         'DELETE FROM device WHERE device.name LIKE ?',
    //         [req.params.name], function (err, result) {
    //             if (err) {
    //                 res.status(400).json({ "error": res.message })
    //                 return;
    //             }
    //             res.json({ 
    //                 "message": "success"
    //             })
    //     });
    // });
}

module.exports = { scenario };