function service(app,db) {
    app.get("/api/service/all/full", (req, res, next) => {
        db.all(
            `SELECT 
                service.id,
                service.service,
                service.communication,
                service.removable,
                argument.id AS id_argument,
                argument.argument
            FROM service
            INNER JOIN argument ON argument.id_service = service.id`, 
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
    app.get("/api/service/all/basic", (req, res, next) => {
        db.all(
            `SELECT 
                service.id,
                service.service,
                service.communication,
                service.removable 
            FROM service`, 
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
    app.get("/api/service/single/full/:name", (req, res, next) => {
        db.all(
            `SELECT 
                service.id,
                service.service,
                service.communication,
                service.removable,
                argument.id AS id_argument,
                argument.argument
            FROM service
            INNER JOIN argument ON argument.id_service = service.id
            WHERE service.service LIKE ?`, 
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
    app.get("/api/service/single/basic/:name", (req, res, next) => {
        db.all(
            `SELECT 
                service.id,
                service.service,
                service.communicatiom,
                service.removable 
            FROM service WHERE service.service LIKE ?`, 
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
    app.delete("/api/service/delete/single/:name", (req, res, next) => {
        db.run(
            'DELETE FROM service WHERE service.service = ?',
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

module.exports = { service };