function devices(app,db) {
    // GET ALL DEVICES 
    app.get("/api/devices", (req, res, next) => {
        var data = {
            name: req.body.name,
            ip: req.body.ip,
        }
        db.run(`UPDATE devices set name = COALESCE(?,name), ip = COALESCE(?,ip) WHERE id = ?`,
            [data.name, data.ip, req.params.id],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "changes": this.changes
                })
            }
        );
    });
    // GET A DEVICE
    app.get("/api/device/:id", (req, res, next) => {
        var sql = "select * from devices where id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    });
    // GET ALL FUNCTIONS OF A DEVICE
    app.get("/api/device/:id/services", (req, res, next) => {
    });
    // ADD DEVICE 
    app.post("/api/device/", (req, res, next) => {
        var errors = []
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (!req.body.ip) {
            errors.push("No ip specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            ip: req.body.ip,
        }
        var sql = 'INSERT INTO devices (name,ip) VALUES (?,?)'
        var params = [data.name,data.ip]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        });
    });
    // ADD A SERVICE OF A DEVICE
    app.post("/api/device/:id/service", (req, res, next) => {
    });
    // UPDATE A DEVICE 
    app.patch("/api/device/:id", (req, res, next) => {
        var data = {
            name: req.body.name,
            ip: req.body.ip,
        }
        db.run(`UPDATE devices set name = COALESCE(?,name), ip = COALESCE(?,ip) WHERE id = ?`,
            [data.name, data.ip, req.params.id],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "changes": this.changes
                })
            }
        );
    });
    // DELETE A DEVICE 
    app.delete("/api/device/:id", (req, res, next) => {
        db.run(
            'DELETE FROM devices WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", changes: this.changes })
            });
    });
    // DELETE A SERVICE OF A DEVICE
    app.delete("/api/device/:id/service/:id_service", (req, res, next) => {
    });
}

function services(app,db) {
    // GET ALL SERVICES
    app.get("/api/functions/", (req, res, next) => {
        var sql = "select * from functions"
        var params = []
        db.all(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    });
    // GET A SERVICE
    app.get("/api/function/:id", (req, res, next) => {
        var sql = "select * from functions where id = ?"
        var params = [req.params.id]
        db.all(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    });
    // GET ALL OPTIONS OF A SERVICE
    app.get("/api/service/:id/options", (req, res, next) => {
    });
    // ADD SERVICE
    app.post("/api/function/", (req, res, next) => {
        var errors = []
        if (!req.body.name) {
            errors.push("No name specified");
        }
        if (!req.body.device) {
            errors.push("No device specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            device: req.body.device,
        }
        var sql = 'INSERT INTO functions (name,device) VALUES (?,?)'
        var params = [data.name,data.device]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        });
    });
    // ADD A ARGUMENT OF A SERVICE
    app.post("/api/service/:id/argument", (req, res, next) => {
    });
    // UPDATE A SERVICE
    app.patch("/api/function/:id", (req, res, next) => {
        var data = {
            name: req.body.name,
            device: req.body.device,
        }
        db.run(`UPDATE functions set name = COALESCE(?,name), device = COALESCE(?,device), WHERE id = ?`,
            [data.name, data.device, req.params.id],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "changes": this.changes
                })
            });
    });
    // DELETE A SERVICE
    app.delete("/api/function/:id", (req, res, next) => {
        db.run('DELETE FROM functions WHERE id = ?',
            req.params.id, function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", changes: this.changes })
        });
    });
    // DELETE A ARGUMENT OF A SERVICE
    app.delete("/api/device/:id/service/:id_service", (req, res, next) => {
    });
}

function scenarios(app,db) {

}