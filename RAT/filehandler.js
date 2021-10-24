/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require("fs");
var path = require("path");

// Container for module (to be exported)
var lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "../database");

// Write data to a file
lib.create = function (file, data, callback) {
  // Open the file for writing
  fs.open(
    lib.baseDir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

// Read data from a file
lib.read = function (file, callback) {
  fs.readFile(lib.baseDir + "/" + file + ".json", "utf8", function (err, data) {
    if (!err && data) {
      var parsedData = JSON.parse(data);

      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data in a file
lib.update = function (file, data, callback) {
  // Open the file for writing
  fs.open(
    lib.baseDir + "/" + file + ".json",
    "r+",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        // Truncate the file
        fs.truncate(fileDescriptor, function (err) {
          if (!err) {
            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing existing file");
                  }
                });
              } else {
                callback("Error writing to existing file");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        callback("Could not open file for updating, it may not exist yet");
      }
    }
  );
};

// Delete a file
lib.delete = function (file, callback) {
  // Unlink the file from the filesystem
  fs.unlink(lib.baseDir + "/" + file + ".json", function (err) {
    callback(err);
  });
};

// List all the items in a directory
lib.list = function (callback) {
  fs.readdir(lib.baseDir + "/", function (err, data) {
    if (!err && data && data.length > 0) {
      var trimmedFileNames = [];
      data.forEach(function (fileName) {
        trimmedFileNames.push(fileName.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

// Export the module
module.exports = lib;
