// routes/UpdateRecord.js
const express = require("express");
const router = express.Router();
const fileStream = require("fs");

router.put("/:id", (req, res, next) => {
  let taskid = req.params.id;
  if (isNaN(taskid) || taskid < 0) {
    return res.status(400).json("Incorrect task id passed");
  } else {
    const { title = "", description = "", completed = "" } = req.body;
    if (
      typeof title === "string" &&
      title.length > 0 &&
      typeof description === "string" &&
      description.length > 0 &&
      typeof completed === "boolean"
    ) {
      fileStream.readFile("./task.json", (err, data) => {
        if (err) {
          console.error("Error reading file", err);
          return res.status(500).send("Internal Server Error");
        }

        try {
          const taskData = JSON.parse(data);

          for (let i = 0; i < taskData.tasks.length; i++) {
            if (taskData.tasks[i].id === parseInt(taskid)) {
              console.log("Hello");
              taskData.tasks[i].id = taskid;
              taskData.tasks[i].title = title;
              taskData.tasks[i].description = description;
              taskData.tasks[i].completed = completed;
              break;
            }
          }

          console.log(taskData);
          let newData = JSON.stringify(taskData);
          fileStream.writeFile("./task.json", newData, (err) => {
            if (err) {
              return res.status(400).json("Internal Server error");
            } else {
              res.status(200).json("File updated with new task details");
              res.end();
            }
          });
        } catch (error) {
          if (error instanceof SyntaxError) {
            res.status(400).json("Invalid JSON data");
            res.end();
          } else {
            res.status(400).json("Something went wrong while updating");
            res.end();
          }
        }
      });
    } else {
      return res.status(200).json("Incorrect paramters passed ");
    }
  }
});

module.exports = router;
