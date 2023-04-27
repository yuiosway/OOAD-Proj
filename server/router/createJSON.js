const fs = require('fs')
const mongoose = require('mongoose')
const { Schema } = mongoose;
const GenerateSchema = require('generate-schema')


// function to print JSON to console

const printJSON = (json_data) => {
    var col = JSON.stringify(json_data);
    let indent = 0;
    let space = "    ";
    for(var i = 0  ; i < col.length ; i++){
        if(col[i] == "{"){
            process.stdout.write(col[i] + "\n" + space.repeat(++indent));
        } else if(col[i] == "}"){
            process.stdout.write("\n" + space.repeat(--indent) + col[i]);
            if(col[i+1] == ","){
                process.stdout.write(col[i+1] + "\n");
                i++;
            }
            process.stdout.write(space.repeat(indent));
        } else if(col[i] == ","){
            process.stdout.write(col[i] + "\n" + space.repeat(indent));
        } else {
            process.stdout.write(col[i]);
        }
    }
}

// function to return column headers

const getHeaderList = (headers) => {
    let headerList = [];
    headers.forEach(function (item, index) {
        headerList.push(item);
    });
    return headerList;
}

//function to return path from headers

const getPathList = (headers) => {
    let pathList = [];
    headers.forEach(function (item, index) {
        var path = item.split(".").slice(1).join(".");
        pathList.push(path);
    });
    return pathList;
}

//function to get list of collections 

const getCollectionList = (headers) => {
    let collectionList = [];
    headers.forEach(function (item, index) {
        var collection = item.split(".")[0].trim();
        if(!collectionList.includes(collection)){
            collectionList.push(collection);
        }
    });
    return collectionList;
}

// function to create the template file

const createTemplateFile = (file, obj) => {
    fs.writeFile(file, JSON.stringify(obj), function(err) {
        if (err) {
            console.log(err);
        }
    });
}

//function to create JSON object to store data entries

const createJSON = (headers) => {
    let collections = {};
    headers.forEach(function (item, index) {
        const attributes = item.split(".");
        var pathLength = attributes.length;
        let path = collections;
        attributes.forEach(function (attr, index1) { 
            attr = attr.trim();
            if((attr in path) === true){
                path = path[attr];
            } else if((attr in path) === false) {
                if(index1 === pathLength - 1){
                    path[attr] = "String";
                }else  {
                    path[attr] = {};
                }
                path = path[attr];
                if(index1 === 0){
                    path["entry_id"] = "String";
                }
            }
            
        });
    });

    return collections;
}


//function to create JSON object with row entries

const rowToJSON = (row, headerList) => {
    var collectionList = getCollectionList(headerList);
    var pathList = getPathList(headerList);
    let entry_id =  new mongoose.Types.ObjectId();
    let data = {};
    for(var i = 0 ; i < headerList.length ; ++i) {
        var collection = headerList[i].split(".")[0];
        if((collection in data) === false){
            data[collection] = {
                "entry_id": entry_id
            };
        }
        var path = data[collection];
        path[pathList[i]] = row[headerList[i]];
        
        
    }
    
    return data;
}

//Function to create mongoose model from the JSON object

const JSON_to_model = (JSON_Template) => {
    var models = {};
    for(var collection in JSON_Template){
        var collectionSchema = GenerateSchema.mongoose(JSON_Template[collection]);
        var mongooseSchema = new Schema(collectionSchema);
        models[collection] = mongoose.model(collection, mongooseSchema)
    }
    return models;
}






module.exports = {
    createJSON: createJSON,
    printJSON: printJSON,
    createTemplateFile: createTemplateFile,
    rowToJSON: rowToJSON,
    getHeaderList: getHeaderList,
    getCollectionList: getCollectionList,
    getPathList: getPathList,
    JSON_to_model: JSON_to_model
};
