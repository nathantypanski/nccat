/* router.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * This file sends processed http requests (in the form of pathnames and data)
 * to handlers, which react based on their provided events.
 */

va path = require("path");
var handle = require('./handle');

function route(handle, pathname, response, postData) {

    var routename = path.basename(
            pathname.split(path.sep)[1],
            path.extname(pathname)
            );
    console.log('Routing %s ...', routename);
    if(handle(
                routename,
                response,
                postData)){
        // in case I ever decide to return something
        ;

    } else {
        console.log("No request handler for " + routename);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;
