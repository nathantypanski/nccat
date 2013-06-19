var fs = require('fs');

function Parser(files, response) {
    this.files = files;
    this.response = response;
}

Parser.prototype.readFile = function (file, response) {
    fs.exists(file, function (exists) {
        if (exists) {
            console.log(file + ' exists.');
            fs.stat(file, function(err, stats) {
                if (err) throw err;
                if (stats.isFile()) console.log(file + ' is a file.');
                else console.log(file + ' is not a file');
                fs.open(file, 'r', function(err, fd) {
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
};

// response.writeHead(200, {"Content-Type": "text/html"});
