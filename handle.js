/* handle.js
 * This module provides request handler functions.
 */

var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var files = require('./files.js');

function load(response, file) {
    console.log('Trying to read ' + path.normalize(file) + ' from ' + path.dirname(path.normalize(file)));
    files.readFile(file, response);
}

var handlers = {
    start : function start(response) {
        console.log("Request handler 'start' was called.");
        response.writeHead(200, {"Content-Type": "text/html"});
        puts(response, './data/head.html');
        puts(response, './data/form.html');
        puts(response, './data/footer.html');
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
