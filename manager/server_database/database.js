
function setup(db) {
    db.serialize(function() {
        db.run(
            `CREATE TABLE action (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_device INTEGER KEY DEFAULT NULL ,
                id_service INTEGER KEY DEFAULT NULL ,
                id_argument INTEGER KEY DEFAULT NULL ,
                id_scenario INTEGER KEY NOT NULL,
                CONSTRAINT action_ibfk_2 FOREIGN KEY (id_argument) REFERENCES argument (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT action_ibfk_3 FOREIGN KEY (id_device) REFERENCES device (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT action_ibfk_4 FOREIGN KEY (id_service) REFERENCES service (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT action_ibfk_5 FOREIGN KEY (id_scenario) REFERENCES scenario (id) ON DELETE CASCADE ON UPDATE CASCADE
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table action just created")
                    db.run(
                        `INSERT INTO action (id, id_device, id_service, id_argument, id_scenario) VALUES
                            (2, 2, 2, 3, 1),
                            (3, 2, 2, 4, 2)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO action just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE argument (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                argument VARCAR(60) DEFAULT NULL,
                id_service INTEGER KEY DEFAULT NULL,
                CONSTRAINT argument_ibfk_1 FOREIGN KEY (id_service) REFERENCES service (id) ON DELETE CASCADE ON UPDATE CASCADE
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table argument just created")
                    db.run(
                        `INSERT INTO argument (id, argument, id_service) VALUES
                            (1, 'reboot', 1),
                            (2, 'powerOff', 1),
                            (3, 'play', 2),
                            (4, 'stop', 2)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO argument just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE device (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCAR(60) DEFAULT NULL,
                ip VARCAR(16) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table device just created")
                    db.run(
                        `INSERT INTO device (name, ip, voltage, amperage) VALUES
                            ('Manager', '192.168.1.23', 5, 3),
                            ('ThinkPad', '192.168.1.7', 20, 7),
                            ('Raspberry_1', '192.168.1.175', 5, 3)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO device just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE project (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCAR(60) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table project just created")
                    db.run(
                        `INSERT INTO project (id, name, voltage, amperage) VALUES
                            (1, 'ProtoCom', 0, 0)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO project just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE service (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCAR(60) DEFAULT NULL,
                com VARCAR(60) DEFAULT NULL,
                api VARCAR(60) DEFAULT NULL,
                removable tinyINT(1) DEFAULT NULL
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table service just created")
                    db.run(
                        `INSERT INTO service (id, name, com, api, removable) VALUES
                            (1, 'power', 'bash', '/api/services/power', 0),
                            (2, 'sound', 'alsa', '/api/services/sound', 1)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO service just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE scenario (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                name VARCAR(60) DEFAULT NULL
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table scenario just created")
                    db.run(
                        `INSERT INTO scenario (id, name) VALUES
                            (1, 'welcome'),
                            (2, 'goodbye')`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO scenario just created")}
                        }
                    );
                }
            }
        );
        db.run(
            `CREATE TABLE rel_device_service (
                id_service INTEGER KEY NOT NULL,
                id_device INTEGER KEY NOT NULL,
                CONSTRAINT rel_device_service_ibfk_1 FOREIGN KEY (id_device) REFERENCES device (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT rel_device_service_ibfk_2 FOREIGN KEY (id_service) REFERENCES service (id) ON DELETE CASCADE ON UPDATE CASCADE
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table rel_device_service just created")
                    db.run(
                        `INSERT INTO rel_device_service (id_service, id_device) VALUES
                            (1, 1),
                            (1, 3),
                            (1, 2),
                            (2, 2)`,
                        (err) => {
                            if (err) {console.log(err)} 
                            else {console.log("INSERT INTO rel_device_service just created")}
                        }
                    );
                }
            }
        );  
    });
}

module.exports = { setup };