//Dependencies
var fh = require("./filehandler");
var objectPath = require("object-path");

//Container for object handler

var obj = {};

obj.findIndex = function (file, callback) {
  var f = file.id;
  var l = file.location;
  var c = file.compareto;
  var cd = file.comparedata;
  var check = false;
  fh.read(f, function (err, data) {
    if (!err) {
      if (objectPath.has(data, l)) {
        for (var i = 0; i < Object.keys(objectPath.get(data, l)).length; i++) {
          console.log(file.location + "." + i);
          var strl = l + "." + i;
          var p = objectPath.get(data, strl);

          if (p[c] == cd) {
            callback(false, String(i));
            check = true;
          }
        }
      } else {
        check = false;
      }

      if (!check) {
        callback(true, "Not Found");
      }
    } else {
      callback(true, "Error in reading file");
    }
  });
};

//Module Export

module.exports = obj;
