/*
 * Primary file for RAT Server
 *
 */

// Dependencies
var server = require('./RAT/server');

// Declare the app
var app = {};

// Init function
app.init = function(){

  // Start the server
  server.init();


};

// Self executing
app.init();


// Export the app
module.exports = app;
