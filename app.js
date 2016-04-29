var alasql = require('alasql'),
    fs = require('fs'),
    path = require('path');

var fileArg = process.argv[2];

if(fileArg === undefined){
  console.warn('Usage: "npm ' + process.argv[1] + ' <<FILE_TO_IMPORT>>"');
  process.exit(1);
}


var fromFile = fileArg,
    toFile = path.basename(fileArg, path.extname(fromFile)) + '.csv' ;
    stats = fs.statSync(fromFile),
    fileSizeInMBytes = stats['size'] / 1000000.0;

console.log('Processing "'  + fromFile + '" file size = ' + fileSizeInMBytes + ' MB');
alasql
    .promise('SELECT * INTO CSV("'+ toFile + '", {separator:","}) from xlsx("' + fromFile + '")')
    .then(function(data){
        console.log('File outputed to "' + toFile + '"')
    }).catch(function(err){
        console.log('Error:', err);
    });
