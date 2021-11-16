const fields = require("../models/schema/field")
var http = require('http');
const request = require("request")

const { v4: uuidv4 } = require('uuid');

exports.createUuid = async (req,res) => {
    try{
        let inputData = req.body;
        inputData.uuid = uuidv4();
        const newData = new fields(inputData)
        const data  = await newData.save();

        res.status(200).json({message : data})
    }catch(err){
        res.status(500).json({message : err})
    }
    
}
exports.updateSSL = async (req,res) => {
    try{
        const id = req.params.id;
        let message = "";
        const randomNumber = Math.floor(Math.random() * 100);
        if(randomNumber % 2 == 0){
           const update =  await fields.findOneAndUpdate({_id: id},{$set: { sslready: true }})
            message = "updated successfully"
        }else{
            message = "not a even number"
        }

        res.status(200).send({message : message})
    }catch(err){
        res.status(500).json({message : err})
    }
    
}
exports.checkSsl = async (req,res) => {
    try{
        const getData = await fields.findOne({sslready : true});
        let count = 1;
        let ssl = false
        while(count < 3 && ssl == false){
            const randomNumber = Math.floor(Math.random() * 100);
            if(randomNumber % 2 == 0){
             req.id = getData._id;
                const data = await request.patch(`http://localhost:3002/updateSSL/${getData._id}`, function (error, response, body) {
                    res.status(200).send({message : JSON.parse(response.body)})
                    ssl = true;
                });   
                return 
              }else{
                  //try again
                  count ++;
              }
        }
        res.status(200).json({message : "odd number"})
    }catch(err){
        console.log(err)
        res.status(500).json({message : err})
    }
    
}