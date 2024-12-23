// /Users/apple/Documents/TaskManagerProject/routes/AddTask.js
// routes/AddTask.js

const express = require("express");
const router = express.Router();
const fileStream = require("fs");

router.post("/tasks",  (req, res, next) => {
  console.log(req.body);
  const { title='' , description='', completed='' } = req.body;

    afileStream.readFile("./task.json", (err, data) => {
        if (err) {
          console.error("Error reading file", err);
          return res.status(500).send("Internal Server Error");
        }
        try {
          const taskData = JSON.parse(data);
          let id = taskData.tasks.length + 1;
          if (
            typeof title === "string" &&
            title.length > 0 &&
            typeof description === "string" &&
            description.length > 0 &&
            typeof completed === "boolean"
          ) {
            let newTaskList = [...taskData.tasks];
            newTaskList.push({
              id: parseInt(id),
              title: title,
              description: description,
              completed: completed,
            });
            console.log(newTaskList);
    
            let newData = JSON.stringify({ tasks: newTaskList });
            fileStream.writeFile("./task.json", newData, (err) => {
              if (err) {
                return res.status(400).json("Internal Server error");
              } else {
                res.status(200).json("File updated with new task details");
                res.end();
              }
            });
    
           
          } else {
            return res.status(400).json("Incorrect data types");
          }
        } catch (parseError) {
          console.error("Error parsing JSON", parseError);
          return res.status(500).send("Error parsing JSON data");
        }
      });
  
 
  
});

module.exports = router;
