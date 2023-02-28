function device(app,db) {
    app.get("/api/device/all/full", (req, res, next) => {
        db.all(
            `SELECT
                device.id,
                device.device,
                device.ip,
                device.voltage,
                device.amperage,
                service.id AS id_service,
                service.service,
                service.communication,
                service.removable
            FROM rel_device_service 
            INNER JOIN device ON device.id = rel_device_service.id_device
            INNER JOIN service ON service.id = rel_device_service.id_service`, 
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
    app.get("/api/device/all/basic", (req, res, next) => {
        db.all(
            `SELECT
                device.id,
                device.device,
                device.ip,
                device.voltage,
                device.amperage
            FROM device`, 
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
    app.get("/api/device/single/full/:name", (req, res, next) => {
        db.all(
            `SELECT
                device.id,
                device.device,
                device.ip,
                device.voltage,
                device.amperage,
                service.id AS id_service,
                service.service,
                service.communication,
                service.removable
            FROM rel_device_service 
            INNER JOIN device ON device.id = rel_device_service.id_device
            INNER JOIN service ON service.id = rel_device_service.id_service
            WHERE device.device LIKE ?`, 
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
    app.get("/api/device/single/basic/:name", (req, res, next) => {
        db.all(
            `SELECT
                device.id,
                device.device,
                device.ip,
                device.voltage,
                device.amperage
            FROM device WHERE device.device LIKE ?`, 
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
    app.post("/api/device/add/service/", (req, res, next) => {
        console.log(req.body.id_service,req.body.id_device);
        db.run(
            `INSERT INTO 
            rel_device_service (id_service, id_device) 
            VALUES 
                (?,?)`, 
            [req.body.id_service,req.body.id_device], function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.delete("/api/device/delete/service/", (req, res, next) => {
        db.run(
            'DELETE FROM rel_device_service WHERE rel_device_service.id_service = ? AND rel_device_service.id_device = ?',
            [req.body.id_service,req.body.id_device], function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
    app.delete("/api/device/delete/single/:name", (req, res, next) => {
        db.run(
            'DELETE FROM device WHERE device.device = ?',
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

module.exports = { device };