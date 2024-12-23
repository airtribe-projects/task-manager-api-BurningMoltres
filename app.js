// app.js
const express = require('express');
const app = express();
const port = 3000;
const homeRoute=require("./routes/Home");
const individualRecordRoute=require('./routes/IndividualRecord');
const addTaskRoute=require('./routes/AddTask');
const deleteTaskRoute=require('./routes/DeleteTask');
const updateRoute=require('./routes/UpdateRecord');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",homeRoute);
app.use("/",individualRecordRoute);
app.use("/",addTaskRoute);
app.use("/",deleteTaskRoute);
app.use("/",updateRoute);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;