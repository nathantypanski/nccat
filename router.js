/* router.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * This file sends processed http requests (in the form of pathnames and data)
 * to handlers, which react based on their provided events.
 */

var path = require("path");

function route(handle, pathname, response, postData) {
    console.log("About to route a request for " + pathname.split(path.sep)[1] + '.');
    if(handle(pathname.split(path.sep)[1], response, postData)){
        ;
    } else {
        console.log("No request handler for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;
