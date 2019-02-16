// Dependencies
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.set('view engine', 'ejs');
app.use(fileUpload());


var path = require('path');


var config = require('../config');
var dH = require('./datahandler');
var oH = require('./objecthandler');


// Container for server 
var server = {};

server.init = function () {


    //Server Connection
    app.listen(config.serverDetails.port, () => {
        console.log('\x1b[35m%s\x1b[0m', 'Server started on port ' + config.serverDetails.port + '.');
    });



}


app.get('/', function (req, res) {

    res.send("Hello world");

});

//??????????????????????????????//

//Funtions for handling the dashboard

//Index View
app.get('/dashboard', function (req, res) {

    dH.dashboard.index(function (data) {


        res.render(data.file, {
            jsonData: data.jsonData,
            dataOut: data.dataOut,
            projectName: config.projectDetails["projectName"]
        });


    });

});

//View the DB
app.get('/dashboard/view/:id', function (req, res) {

    dH.dashboard.view(req.params.id, function (err, data) {


        if (!err) {
            res.render(data.file, {
                jsonData: data.jsonData,
                dataOut: data.dataOut,
                projectName: config.projectDetails["projectName"]

            });

        } else {

            res.send("Error: File Not Found");

        }



    });

});
//??????????????????????????//

app.get('/help/', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/pages/', 'help.html'));

});

//??????????????????????????//
//Funtions for handling the api

//create file 
app.post('/api/create/', (req, res) => {

    var _file = req.body.file;

    dH.api.create(_file, function (err, result) {

        if (!err) {

            res.send(result);
        } else {

            res.send(result);
        }


    });



});

//view file  

app.post('/api/view/', (req, res) => {

    var _file = req.body.file;

    dH.api.view(_file, function (err, result) {

        if (!err) {

            res.send(result);
        } else {

            res.send(result);
        }


    });



});

//Delete File 
app.post('/api/delete/', (req, res) => {

    var _file = req.body.file;

    dH.api.delete(_file, function (err, result) {

        if (!err) {

            res.send(result);
        } else {

            res.send(result);
        }

    });



});


//Insert Data

app.post('/api/insert/', (req, res) => {


    var _location = req.body.location;
    var _data = req.body.data;

    var file = {

        "id": req.body.file,
        "location": _location,
        "data": _data

    }

    dH.api.insert(file, function (err, result) {

        if (!err) {

            res.send(JSON.stringify(result));
        } else {

            res.send(JSON.stringify(result));
        }

    });


});


//Delete Data

app.post('/api/deletedata/', (req, res) => {


    var _location = req.body.location;

    var file = {

        "id": req.body.file,
        "location": _location,

    }

    dH.api.deleteData(file, function (err, result) {

        if (!err) {

            res.send(result);
        } else {

            res.send(result);
        }

    });


});

//set Data
app.post('/api/setdata/', (req, res) => {


    var _location = req.body.location;
    var _data = req.body.data;

    var file = {

        "id": req.body.file,
        "location": _location,
        "data": _data

    }

    dH.api.setData(file, function (err, result) {

        if (!err) {

            res.send(result);
        } else {

            res.send(result);
        }

    });


});


//findindex 

app.post('/api/findindex/', (req, res) => {


    var _location = req.body.location;
    var _compareto = req.body.compareto;
    var _comparedata = req.body.comparedata;
    


    var file = {

        "id": req.body.file,
        "location": _location,
        "compareto" : _compareto,
        "comparedata" : _comparedata

    }

    oH.findIndex(file,function(err,result){

        if(!err){

            res.send(result);

        }else{

            res.send(result);

        }


    });

    


});


//post method for file upload


app.post('/api/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
  
    // Use the mv() method to place the file somewhere on your server
    var uploadPath = path.join(__dirname, '../Uploads/', sampleFile.name);
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  });


//Export the module 
module.exports = server;