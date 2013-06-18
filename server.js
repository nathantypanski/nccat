var http = require("http");
var os = require("os");
var path = require("path");
var util = require("util");
var fs = require("fs");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response);
    }
    /*
    fs.watch('./', function (event, filename) {
      console.log('event is: ' + event);
      if (filename != "*.swp") {
        console.log('filename provided: ' + filename);
      } else {
        console.log('filename not provided');
      }
    });
    */

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");

    console.log(os.hostname() + "@" + os.release());
//    util.puts("uname -r");
}

exports.start = start;
