
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
                        `INSERT INTO argument (argument, id_service) VALUES
                            ('reboot', 1),
                            ('powerOff', 1),
                            ('play', 2),
                            ('stop', 2),
                            ('hello', 3),
                            ('goodbye', 3)`,
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
                device VARCAR(60) DEFAULT NULL,
                ip VARCAR(16) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL,
                CONSTRAINT device_unique UNIQUE (device)
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table device just created")
                    db.run(
                        `INSERT INTO device (device, ip, voltage, amperage) VALUES
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
                project VARCAR(60) DEFAULT NULL,
                voltage INTEGER DEFAULT NULL,
                amperage INTEGER DEFAULT NULL,
                CONSTRAINT project_unique UNIQUE (project)
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table project just created")
                    db.run(
                        `INSERT INTO project (project, voltage, amperage) VALUES
                            ('ProtoCom', 0, 0)`,
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
                service VARCAR(60) DEFAULT NULL,
                communication VARCAR(60) DEFAULT NULL,
                removable tinyINT(1) DEFAULT NULL,
                CONSTRAINT service_unique UNIQUE (service)
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table service just created")
                    db.run(
                        `INSERT INTO service (service, communication, removable) VALUES
                            ('power', 'bash', 0),
                            ('sound', 'alsa', 1),
                            ('max7219', 'uart', 1),
                            ('cluster', 'unity', 1),
                            ('ivi', 'unity', 1)`,
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
                scenario VARCAR(60) DEFAULT NULL,
                CONSTRAINT scenario_unique UNIQUE (scenario)
            )`,
            (err) => {
                if (err) {console.log(err)} 
                else {
                    console.log("Table scenario just created")
                    db.run(
                        `INSERT INTO scenario (scenario) VALUES
                            ('welcome'),
                            ('goodbye')`,
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
                            (1, 2),
                            (1, 3),
                            (3, 3),
                            (4, 2),
                            (5, 2),
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