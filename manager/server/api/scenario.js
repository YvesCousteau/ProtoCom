function scenario(app,db) {
    app.get("/api/scenario/all/full", (req, res, next) => {
        db.all(
            `SELECT 
                scenario.id,
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
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/all/basic", (req, res, next) => {
        db.all(
            `SELECT
                scenario.id,
                scenario.scenario
            FROM scenario`, 
            [], function (err, rows) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/single/full/:name", (req, res, next) => {
        db.all(
            `SELECT 
                scenario.id,
                scenario.scenario,
                device.device,
                service.service,
                argument.argument,
                action.id AS id_action
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
                res.json({
                    "message": "success",
                    "data": rows,
                })
            });
    });
    app.get("/api/scenario/single/basic/:name", (req, res, next) => {
        db.all(
            `SELECT
                scenario.id,
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
    // =========================================================== //
    app.post("/api/scenario/add/single", (req, res, next) => {
        db.run(
            `INSERT INTO 
                scenario (scenario) 
            VALUES 
                (?)`, 
            [req.body.scenario], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.patch("/api/scenario/update/single/:name", (req, res, next) => {
        db.run(
            `UPDATE 
                scenario 
            SET
                scenario = COALESCE(?,scenario)
            WHERE scenario LIKE ?`,
            [req.body.scenario, req.params.name],
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
    app.delete("/api/scenario/delete/single/:name", (req, res, next) => {
        console.log(req.params.name);
        db.run(
            'DELETE FROM scenario WHERE scenario.scenario LIKE ?',
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

module.exports = { scenario };