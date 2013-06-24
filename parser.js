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

        if(i==0) {
//            console.log('files: %j', files);
//            console.log('       (%d entries)', files.length);
        }

        // Sets a default value in a healthy manner.
        i = (null == i ? 0 : i);


        if (i < files.length ) {
            this.readFile(
                    files[i],
                    response,
                    function increment (err) {
                        if (err) {
                            console.log('error: ' + err);
                        }
                        else {
         //                   console.log('Finished working on file ' + files[i] + '.');
                            parser.readFiles(files, response, i+1);
                        }
            });
        }
        else {
            response.end();
        }
    },

    // Read just one file.
    readFile : function (file, response, callback) {
//        console.log('Working on file ' + file + '.');
        this.openFile(file, function read(err, fd) {
            if (err) throw err;
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) throw err;
                response.write(data);
                fs.close(fd);
//                console.log('Successfully closed %s.',  file);
                callback(err);
            });
        });
    },

    // Open a file for reading.
    openFile : function (file, callback) {
        fs.exists(file, function (exists) {
            if (exists) {
                fs.stat(file, function open (err, stats) {
                    if (err) {
                        throw err;
                    }
                    fs.open(file,
                        'r',
                        function read (err, fd) {
                            callback(err, fd);
                        }
                    );
                });
            }
        });
    }
}

module.exports = parser;

// response.writeHead(200, {"Content-Type": "text/html"});
