/* parser.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * Takes a list of files, reads and concatenates them, and pushes a http
 * request.
 */

var fs = require('fs');
// var $ = require('jquery');


var parser = {

    // Read all the files in 'files'.
    readFiles : function (files, response, i) {

        // Sets a default value in a healthy manner.
        i = (null == i ? 0 : i);

        // Read all the files recursively.
        if (i < files.length ) {
            this.readFile (files[i], response, increment);
        }
        else {
            response.end();
        }


        function increment (err) {
            if (err) {
                console.log('error: ' + err);
            }
            else {
                parser.readFiles(files, response, i+1);
            }
        }
    },


    // Read just one file.
    readFile : function (file, response, callback) {

        this.openFile(file, read);


        function read(err, fd) {
            if (err)
                throw err;
            fs.readFile(file, 'utf8', function (err, data) {
                write (err, data, fd);
            });
        }


        function write (err, data, fd) {
            if (err)
                throw err;
            response.write(data);
            fs.close(fd);
            callback(err);
        }
    },


    // Open a file for reading.
    openFile : function (file, callback) {

        fs.exists(file, function (exists) {
            if (exists) stat (file, callback);
        });


        function stat (file, callback) {
            fs.stat(file, function open (err, stats) {
                if (err) console.log('Error opening file!');
                fs.open(file, 'r', callback);
            });
        }
    }
}

module.exports = parser;

// response.writeHead(200, {"Content-Type": "text/html"});
