/* handle.js
 * This module provides request handler functions.
 */

var exec = require("child_process").exec;
var querystring = require("querystring");

var handlers = {
    start : function start(response) {
        console.log("Request handler 'start' was called.");

        var body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; '+
                'charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" method="post">'+
                '<textarea name="text" rows ="20" cols="60"></textarea>'+
                '<input type="submit" value="Submit text" />'+
                '</form>'+
                '</body>'+
                '</html>';

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
    },

    upload : function upload(response, postData) {
        console.log('Request handler for "upload" was called.');
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("You've sent: " +
                querystring.parse(postData).text);
        response.end();
    }
};

module.exports = function handleRequest(name, response, postData) {
  if (handlers[name] !== undefined) {
    handlers[name](response, postData);
    return true;
  }
  // do special cases (if there are any)
  if (name === '') {
    handlers.start(response);
    return true;
  }
  return false; // not found
}
