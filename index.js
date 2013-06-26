/* index.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * Run our server. Keep it simple.
 */

var server = require("./server");
var router = require("./router");
var handle = require("./handle");

module.exports = server.start(router.route, handle);
