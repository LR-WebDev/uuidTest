const express = require("express");
const mongoose = require("mongoose")
const port = 3002;

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/meetupDb",{
    useNewUrlParser: true, //for avoiding warning
    useUnifiedTopology: true,
}).then(() =>{
    console.log("connection successfuly");
}).catch((error) => {
    console.log(error)
});

//without router
const uuids = require("./module/uuid.routers");
uuids.uuidRoutes(app);


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
