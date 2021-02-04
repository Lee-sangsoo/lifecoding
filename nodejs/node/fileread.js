const fs = require('fs');

fs.readFile('./node/sample.txt', 'utf8', function(err, data){
    console.log(data);
});