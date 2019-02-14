/*
 * Create and export configuration variables
 *
 */

// Container for congfiguration

var config = {};

//Enter Your Details Regarding your project
config.projectDetails = {

    "projectName" : "RAT Server",
    "ProjectTitle" : "My Project is awesome",
    "author" : "Me",

};

//Enter Your Server Details
config.serverDetails = {
    
    "port" : 4444,
    "dashboard" : "/dashboard/",
    "api" : "/api/"

}


// Export the module
module.exports = config;