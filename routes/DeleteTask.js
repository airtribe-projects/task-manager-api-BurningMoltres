// routes/DeleteTask.js
const express = require("express");
const router = express.Router();
const fileStream = require("fs");

router.delete("/:id",(req,res,next)=>{
console.log("delete request is called");
let taskid=req.params.id;

 const fileData = fileStream.readFile("./task.json", (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            return res.status(500).send("Internal Server Error");
        }
        try {
            let taskData = JSON.parse(data);
            if(taskid > taskData.tasks.length || taskid < 0 )
            {
                return  res.status(404).send('Incorrect id passed');
                
            }
            const deleteIndex= taskData.tasks.find(task => task.id === parseInt(taskid)).id;
            if ( deleteIndex !== undefined && deleteIndex !== null) {
                   
                let newTaskList=taskData.tasks.filter(item => item.id !== deleteIndex)
                let newData = JSON.stringify({ tasks: newTaskList });

                //write to file
                fileStream.writeFile("./task.json", newData, (err) => {
                              if (err) {
                                return res.status(400).json("Internal Server error");
                              } else {
                                console.log("File written successfully");
                              }
                            });
                res.status(200).json("File Deletion Completed");
                res.end();
            }
            else {
                res.status(404).send('Task id to delete does not exist');
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

module.exports=router;