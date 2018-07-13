var fs = require('fs');

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

// Escreve em ficheiro de texto
function writeFile2 (file, data, callback) {
var logger = fs.createWriteStream(file, {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  logger.write(data); // append string to your file
  //logger.write('more data') // again
  logger.end(); // close string

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

