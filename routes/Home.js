// routes/Home.js
const express=require('express');
const router=express.Router();
const fileStream=require('fs');


//handling get all details
router.get("/",(req,res,next)=> {
    fileStream.readFile('./task.json',(err,data)=>{
        if(err)
        {
            console.error('Error reading file',err);
            return res.status(500).send("Internal Server Error");
        }
        try{
            const taskData=JSON.parse(data);
            res.status(200).json(taskData);
        }
        catch(parseError)
        {
            console.error('Error parsing JSON',parseError);
            return res.status(500).send('Error parsing JSON data');
        }
    })
    
})

//exporting the router
module.exports=router