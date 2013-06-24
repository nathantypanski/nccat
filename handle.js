/* handle.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * This module provides request handler functions.
 */

var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var parser = require('./parser.js');


var handlers = {

    start : function start(response) {
        console.log("Request handler 'start' was called.");

        response.writeHead(200, {"Content-Type": "text/html"});

        files = [
                 './data/head.html',
                 './data/body.html',
                 './data/form.html',
                 './data/footer.html'];
        parser.readFiles(files, response);
    },

    upload : function upload(response, postData) {
        console.log('Request handler for "upload" was called.');

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("You've sent: " +
                querystring.parse(postData).text);

        response.end();
    },

    jquery : function jquery(response) {
        console.log("Request handler 'jquery.js' was called.");

        files = [
                 './data/jquery.js',
                ];
        parser.readFiles(files, response);
    },


    ls : function ls(response, postdata) {
        console.log('Request handler for "ls" was called.');
        response.writeHead(200, {"Content-Type": "text/plain"});
    },
};

// module.exports = handlers;


module.exports = function handleRequest(name, response, postData) {
  if (handlers[name] !== undefined) {
    handlers[name](response, postData);
    return true;
  }

  // If empty, default to /start
  if (name === '') {
    handlers.start(response);
    return true;
  }
  return false;
}
