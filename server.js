/* server.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * This file listens and responsds to http requests.
 * It uses listeners to respond to the various kinds of requests it can
 * receive, then sends the results to the router.
 */

var http = require("http");
var util = require("util");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        console.log("Headers: " + request.headers);
        request.setEncoding("utf8");

        console.log("adding data listener ...");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
                postDataChunk + "'.");
        });

        console.log("adding request listener ...");
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
