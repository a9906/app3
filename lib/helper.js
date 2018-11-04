// ....helper.js.....

var fs = require('fs');
var dateTime = require('node-datetime');
var config = require('../config/config.js');

// Escreve em ficheiro de texto
function writeFile (file, data, callback) {

    fs.appendFile(file, data, function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      })
}



function writeFile3 (file, data, callback) {
  fs.writeFile(file, data, function(err) {
    if(err) {
        //return console.log(err);
        console.log(err);
        callback(err);
    }

    console.log("The file was saved!");
  }); 

}




function checkForFile(fileName,data, callback)
{
    fs.exists(fileName, function (exists) {
        if(exists)
        {
          fs.appendFile(fileName, data, function(err) {
            if(err) {
                //return console.log(err);
                console.log(err);
                callback(err);
            }
             console.log("The file was saved!");
            });
            //callback();
        }else
        {

            fs.writeFile(fileName, data, function(err) {
              if(err) {
                  //return console.log(err);
                  console.log(err);
                  callback(err);
              }
               console.log("The file was saved!");
          /*
            fs.writeFile(fileName, {flag: 'wx'}, function (err, data) 
            { 
                callback();
            })
        */
          });
        }
      });
}

function writeFile4(fileName,data, callback)
{

var logStream = fs.createWriteStream(fileName, {'flags': 'a'});
// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
//logStream.write('Initial line...');
logStream.write(data);
logStream.end('this is the end line');
}


// Escreve em ficheiro de texto
function writeFile2 (file, data, callback) {
var logger = fs.createWriteStream(file, {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  logger.write(data); // append string to your file
  //logger.write('more data') // again
  logger.end(); // close string

}

function logToFile (result, callback){
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    //if(err) {
    //    console.log(err);
    //    callback(err);
   // }
    checkForFile(config.logFileName, formatted + ' | ' + JSON.stringify(result) + '\r\n', callback);
}

/*
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
 });
 
 console.log("Program Ended");
//-------------------------------------------------------------
 if (!trip)
        res.jsonp({ message: 'Registo não encontrado.' });
    else
        res.jsonp(trip);
*/
/*
// write to a new file named 2pac.txt
fs.writeFile(file, data, (err) => {  
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});
*/

/*
// a funcionar
function save(data, callback) {
    var trips = new tripsModel.Trip(data);
    trips.save(function (err, obj) {
      callback(err, obj);
    });
}
*/

exports.writeFile = writeFile;
exports.writeFile2 = writeFile2;
exports.writeFile3 = writeFile3;
exports.writeFile4 = writeFile4;
exports.checkForFile = checkForFile;
exports.logToFile = logToFile;
