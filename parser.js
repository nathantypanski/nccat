/* parser.js
 * Author: Nathan Typanski <ntypanski at gmail>
 *
 * Takes a list of files, reads and concatenates them, and pushes a http
 * request.
 */

var fs = require('fs');

var parser = {
    readFiles : function (files, i) {
        if(i==0) {
            console.log('files: %j', files);
            console.log('       (%d entries)', files.length);
        }
        console.log('Working on file ' + files[i] + '.');
        i = (null == i ? 0 : i);
        if (i < files.length ) {
            this.readFile(files[i], response, function(err) {
                if (err) throw err;
                else this.readFiles(files, i+1);
            });
        }
    },

    readFile : function (file, response, callback) {
        fs.exists(file, function (exists) {
            if (exists) {
                console.log(file + ' exists.');
                fs.stat(file, function open (err, stats) {
                    if (err) throw err;
                    if (stats.isFile()) console.log(file + ' is a file.');
                    else console.log(file + ' is not a file');
                    fs.open(file, 'r', function read (err, fd) {
                        if (err) throw err;
                        fs.readFile(file, 'utf8', function (err, data) {
                            if (err) throw err;
                            response.write(data);
                            console.log('post_data:');
                            console.log(data);
                            fs.close(fd);
                        });
                    });
                });
            }
        });
    },

}

module.exports = parser;

// response.writeHead(200, {"Content-Type": "text/html"});
