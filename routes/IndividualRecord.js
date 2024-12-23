// routes/IndividualRecord.js
const express = require('express');
const router = express.Router();
const fileStream = require('fs');

//handling individualRecord by id
router.get("/:id", (req, res, next) => {
    const taskId = req.params.id;
    const fileData = fileStream.readFile("./task.json", (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send("Internal Server Error");
        }
        try {
            let taskData = JSON.parse(data);
            console.log(taskData);
            const matchingTask = taskData.tasks.find(task => task.id === parseInt(taskId));
            if (matchingTask) {
                res.status(200).json(matchingTask);
                res.end();
            }
            else {
                res.status(404).send('Task information  for specified id does not exist');
                res.end();
            }
        }
        catch (error) {
            console.error('Error finding task:', error);
            res.status(500).send('Internal Server error');
            res.end();
        }
    })
})

module.exports = router