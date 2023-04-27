const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const router = express.Router();
require('../db/conn');
const User = require('../model/UserSchema');
const upload = require('express-fileupload');
router.use(upload());
const jsonHelper = require("./createJSON")


router.get('/', (req, res) => {
    res.send(`home`);
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;    
    if( !name || !email || !password ){
        return res.status(422).json({ error : 'Please fill all fields' });
    }
    try {
        const userExists = await User.findOne({ email: email }); 
        if(userExists){
            return res.status(422).json({ error : "Email already exists" });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    } 
    catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
 
    try {
        const { email, password } = req.body;
        if( !email || !password ) {
            return res.status(400).json({ error : 'Please fill all fields' });
        }
        const userLogin = await User.findOne({ email: email});
        if(!userLogin){
            res.status(400).json({ error: "No such email exists" });
        }
        if(userLogin.password == password) {
            res.json({ message: "Login Succesfull"});
        } else {
            res.status(400).json({ error: "Incorrect Password" });
        }
    }
    catch (err) {
        console.log(err);
    }
   
});

router.post('/push', async (req, res) => {
    
    var filename = '';
    
    if(req.files) {
        var file = req.files.file;
        filename = req.files.file.name
        await req.files.file.mv(`${__dirname}/uploads/${req.files.file.name}`)
    }

    // funcion to push csv file to data base
    new Promise((resolve, reject) => {
        // buffer to hold row data, pushes 100 at a time
        let buffer = {};              
        // objects to hold schema, model, row data, json objects
        let rowJSON = {}; 
        let promises = [];
        let JSON_Template = {};
        let headerList = [];
        let bufferSize = 0;
        let rowCount = 0;
        let stream = fs.createReadStream(`${__dirname}/uploads/${req.files.file.name}`)
        .pipe(csv())
        .on('headers', (headers) => {
          JSON_Template = jsonHelper.createJSON(headers);
          headerList = jsonHelper.getHeaderList(headers);
          collectionList = jsonHelper.getCollectionList(headers);
          model = jsonHelper.JSON_to_model(JSON_Template);
        })
        .on("error", reject)
        .on("data", async row => {
            stream.pause();
            console.log(rowCount++);
            rowJSON = jsonHelper.rowToJSON(row, headerList);
    
            try {
              collectionList.forEach(function(collection, index) {
    
                if(!(collection in buffer)){
                  buffer[collection] = []
                  buffer[collection].push(rowJSON[collection]);
                }
                else{
                  buffer[collection].push(rowJSON[collection]);
                }
    
              });
              bufferSize++;
              if ( bufferSize > 100 ) {
                  collectionList.forEach(function(collection, index) {
                    model[collection].insertMany(buffer[collection]);
                  });
                buffer = {};
                bufferSize = 0;
              }
              
          } catch(e) {
            stream.destroy(e);
          }
          stream.resume();
        })
        .on("end", async () => {
          try {
            if ( bufferSize > 1 ) {
                collectionList.forEach(function(collection, index) {
                  model[collection].insertMany(buffer[collection]);
                });
              buffer = {};
              bufferSize = 0;
            }  
            console.log("DONE!");
            res.json({ message: "Upload Succesfull"});
          } 
          catch(e) {
              console.log(e);
              stream.destroy(e);
          }
        });
    
    });
    
    
    
});



 
module.exports = router;


