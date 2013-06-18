var server = require("./server");
var router = require("./router");
var handle = require("./handle");

server.start(router.route, handle);
