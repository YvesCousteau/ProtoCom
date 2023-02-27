
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

module.exports = { argument, action };