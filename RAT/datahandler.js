//Dependencies
var fh = require('./filehandler');
var objectPath = require("object-path");
let JSONFormatter = require("simple-json-formatter");

//Container of datahandler.js

var data = {

    dashboard : {},
    api : {}
};

//handlers for dashboard

data.dashboard.index = function(callback){

    fh.list(function(err,data){

        if(!err){
    
            var returnData = {

                jsonData : 'Select DB',
                dataOut : data,
                file : 'index'

            }

            callback(returnData);
          
        }
    
    
      });   


};

data.dashboard.view = function(file,callback){

    fh.list(function(err,data){

        if(!err){
    
          fh.read(file, function (err, data2) {
    
    
            if (!err) {
        
              let formattedJson = JSONFormatter.format(JSON.stringify(data2));
              
              var returnData = {

                jsonData : formattedJson,
                dataOut : data,
                file : 'index'

                }

             callback(false,returnData);
        
        
        
        
            } else {
        
              callback(true,returnData);
            }
        
        
          });
    
        }
    
    
      });  




};

//handlers for api requests


//create file
data.api.create = function(file,callback){

    var dt = {};
    objectPath.set(dt, file, {});
    
    

    fh.create(file, dt, function (err) {

        if (!err) {

            callback(false,'DB Created Successfully');

        } else {

            callback(true,'DB Creation UnSuccessfull');
        }

    });


};

//view file

data.api.view = function(file,callback){

    fh.read(file, function (err, data) {


        if (!err) {
    
          
          
          callback(false,JSON.stringify(data));
    
    
    
    
        } else {
    
            callback(false,'Error in file loading');
        }
    
    
      });

};

//view file

data.api.delete = function(file,callback){

    fh.delete(file, function (err) {

        if (!err) {
    
          callback(false,'File Deleted Successfully');
    
        } else {
    
          res.send(true,'File Not Deleted');
        }
    
    
      });

};


//insert data

data.api.insert = function(file,callback){

    var _location = file.location;
    var _data = file.data;
    console.log(file.location);
    fh.read(file.id, function (err, data) {
       
        _data = JSON.parse(_data);
        
        if (!err) {
    
    
          objectPath.push(data, _location, _data);
          fh.update(file.id, data, function (err) {
    
            if (!err) {
    
                    callback(false,"File Updated");

            } else {
    
                    callback(true,"Error in File Updation");
            }
    
          });
    
        } else {
    
          callback(true,"Error in reading file");
        }
    
    
      });
    


};

//delete data
data.api.deleteData = function(file,callback){

    var _location = file.location;
    var _index = file.index;
    console.log(file.location);
    fh.read(file.id, function (err, data) {
    
        if (!err) {
    
    
          //JSON.parse(_location)

            objectPath.del(data,_location); 

            
          fh.update(file.id, data, function (err) {
    
            if (!err) {
    
                    callback(false,"File Updated");

            } else {
    
                    callback(true,"Error in File Updation");
            }
    
          });
    
        } else {
    
          callback(true,"Error in reading file");
        }
    
    
      });
    


};

//set data
data.api.setData = function(file,callback){

    var _location = file.location;
    var _data = file.data;
    console.log(file.location);
    fh.read(file.id, function (err, data) {
    
        if (!err) {
    
    
          //JSON.parse(_location)

            objectPath.set(data,_location,JSON.parse(_data)); 

            
          fh.update(file.id, data, function (err) {
    
            if (!err) {
    
                    callback(false,"File Updated");

            } else {
    
                    callback(true,"Error in File Updation");
            }
    
          });
    
        } else {
    
          callback(true,"Error in reading file");
        }
    
    
      });
    


};




//Export the Module

module.exports = data;