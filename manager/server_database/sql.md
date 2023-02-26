// ---------------------------------------------------- //
// GET ALL DEVICES 
```
SELECT
    device.id,
    device.name,
    device.ip,
    device.voltage,
    device.amperage
FROM device
```
// GET ALL SERVICES 
```
SELECT
    service.id,
    service.name,
    service.com,
    service.api,
    service.removable
FROM service
```
// GET ALL SCENARIOS
```
SELECT
    scenario.id,
    scenario.name
FROM scenario
```
// ---------------------------------------------------- //
// GET A DEVICE ID BY NAME
```
SELECT
    device.id
    device.name,
    device.ip,
    device.voltage,
    device.amperage
FROM
    device
WHERE
    device.name LIKE 'Thinkpad';
```
// ---------------------------------------------------- //
// GET ALL INFO OF A DEVICE BY NAME
```
SELECT
    device.id,
    device.name,
    device.ip,
    device.voltage,
    device.amperage,
    service.id,
    service.name,
    service.com,
    service.api,
    service.removable
FROM rel_device_service 
INNER JOIN device ON device.id = rel_device_service.id_device
INNER JOIN service ON service.id = rel_device_service.id_service
WHERE device.name LIKE "Thinkpad";
```
// ---------------------------------------------------- //
// GET A DEVICE
```
SELECT
    device.id,
    device.name,
    device.ip,
    device.voltage,
    device.amperage
FROM device WHERE device.id = 1;
```
// GET A SERVICE
```
SELECT
    service.id,
    service.name,
    service.com,
    service.api,
    service.removable
FROM service WHERE service.id = 1;
```
// GET A SCENARIO
```
SELECT
    scenario.id,
    scenario.name
FROM scenario WHERE scenario.id = 1;
```
// ---------------------------------------------------- //
// GET ALL SERVICES OF A DEVICE
```
SELECT
    service.id,
    service.name,
    service.com,
    service.api,
    service.removable
FROM rel_device_service 
INNER JOIN device ON device.id = rel_device_service.id_device
INNER JOIN service ON service.id = rel_device_service.id_service
WHERE device.id = 1;
```
// GET ALL ARGUMENTS OF A SERVICE
```
SELECT
    argument.id,
    argument.argument
FROM argument
WHERE argument.id_service = 1
```
// GET ALL ACTIONS OF A SCENARIO
```
SELECT
    action.id as id_action,
    device.id as id_device,
    device.name,
    device.ip,
    device.voltage,
    device.amperage,
    service.id as id_service,
    service.name,
    service.com,
    service.api,
    service.removable,
    argument.id as id_argument,
    argument.argument,
    scenario.id as id_scenario,
    scenario.name
FROM
    action
LEFT JOIN device ON device.id = action.id_device
LEFT JOIN service ON service.id = action.id_service
LEFT JOIN argument ON argument.id = action.id_argument
LEFT JOIN scenario ON scenario.id = action.id_service
WHERE action.id_scenario = 1;
```
// ---------------------------------------------------- //
// ADD DEVICE (NO SERVICES)
```

```
// ADD SERVICE (NO ARGUMENTS)
```

```
// ADD SCENARIO (NO ACTIONS)
```

```
// ---------------------------------------------------- //
// ADD A SERVICE OF A DEVICE
```

```
// ADD A ARGUMENT OF A SERVICE
```

```
// ADD A ACTION OF A SCENARIO
```

```
// ---------------------------------------------------- //
// UPDATE A DEVICE (NO SERVICES)
```
UPDATE 
    device 
SET 
    device.name,
    device.ip,
    device.voltage,
    device.amperage,
WHERE device.id = ?
```
// UPDATE A SERVICE (NO ARGUMENTS)
```
UPDATE 
    service 
SET 
    service.id as id_service,
    service.name,
    service.com,
    service.api,
    service.removable,
WHERE service.id = ?
```
// UPDATE A SCENARIO (NO ACTIONS)
```
UPDATE 
    scenario 
SET 
    scenario.id as id_scenario,
    scenario.name
WHERE scenario.id = ?
```
// ---------------------------------------------------- //
// DELETE A DEVICE 
```
DELETE FROM device WHERE device.id = ?

```
// DELETE A SERVICE 
```
DELETE FROM service WHERE service.id = ?
DELETE FROM argument WHERE argument.id_service = ?
```
// DELETE A SCENARIO 
```
DELETE FROM scenario WHERE scenario.id = ?
DELETE FROM action WHERE action.id_scenario = ?
```
// ---------------------------------------------------- //
// DELETE A SERVICE OF A DEVICE
```
DELETE FROM service WHERE service.id = ?
```
// DELETE A ARGUMENT OF A SERVICE
```
DELETE FROM argument WHERE argument.id = ?
```
// DELETE A ACTION OF A SCENARIO
```
DELETE FROM action WHERE action.id = ?
```
// ---------------------------------------------------- //