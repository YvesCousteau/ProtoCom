var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(
            `CREATE TABLE project (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(60) DEFAULT NULL,
                ip VARCHAR(60) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table system already created")
                } else {
                    console.log("Table system just created")
                
                }
            }
        );
        db.run(
            `CREATE TABLE service (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(60) DEFAULT NULL,
                com VARCHAR(60) DEFAULT NULL,
                api VARCHAR(60) DEFAULT NULL,
                removable BOOLEAN DEFAULT NULL,
                
                fk_devices INTEGER DEFAULT NULL,
                pk_argument INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table service already created")
                } else {
                    console.log("Table service just created")
                
                }
            }
        );
        db.run(
            `CREATE TABLE devices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(60) DEFAULT NULL,
                ip VARCHAR(16) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL,

                pk_function INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created")
                }
            }
        );
        db.run(
            `CREATE TABLE scenarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(60) DEFAULT NULL,
                pk_scenario INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created")
                }
            }
        );
        db.run(
            `CREATE TABLE scenario (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                device VARCHAR(60) DEFAULT NULL,
                function VARCHAR(60) DEFAULT NULL,
                option VARCHAR(60) DEFAULT NULL,
                fk_scenarios INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created")
                }
            }
        );
        db.run(
            `CREATE TABLE argument (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                argument VARCHAR(60) DEFAULT NULL,

                fk_service INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {
                    console.log("Table devices already created")
                } else {
                    console.log("Table devices just created")
                }
            }
        );
        
    }
});
module.exports = db