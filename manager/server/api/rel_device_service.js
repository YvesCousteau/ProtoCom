function rel_device_service(app,db) {
    app.post("/api/rel_device_service/add/", (req, res, next) => {
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
    app.delete("/api/rel_device_service/delete/", (req, res, next) => {
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
}

module.exports = { rel_device_service };