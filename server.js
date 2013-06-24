/* server.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * This file listens and responds to http requests.
 * It uses listeners to respond to the various kinds of requests it can
 * receive, then sends the results to the router.
 */

var http = require("http");
var util = require("util");
var url = require("url");

var port = 8888;

function start(route, handle) {
    http.createServer(
        // Grab the request and response from http and send them to onRequest.
        function (request, response) {
            onRequest (
                request,
                response,
                route,
                handle)
        }
    ).listen(port);

    console.log("Server has started on port %d.", port);
}

// Called whenever a http request on port happens.
function onRequest(request, response, route, handle) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for %s received.", pathname);

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '"+
            postDataChunk + "'.");
    });

    request.addListener("end", function() {
        route(handle, pathname, response, postData);
    });
}

exports.start = start;
