function argument(app,db) {
    app.post("/api/argument/add/single/", (req, res, next) => {
        db.run(
            `INSERT INTO 
                argument (argument, id_service) 
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
    app.patch("/api/argument/update/single/:name", (req, res, next) => {
        console.log(req.body);
        db.run(
            `UPDATE 
                argument
            SET
                argument = COALESCE(?,argument),
                id_service = COALESCE(?,id_service)
            WHERE argument LIKE ?`, 
            [req.body.argument,req.body.id_service,req.params.name], function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success"
            })
        });
    });
    app.delete("/api/argument/delete/single/:name", (req, res, next) => {
        db.run(
            'DELETE FROM argument WHERE argument.argument LIKE ?',
            [req.params.name], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ 
                    "message": "success"
                })
        });
    });
}

module.exports = { argument };