var parseString = require('xml2js').parseString
  , _ = require('underscore')
  , util = require('util')
  , unzip = require('unzip')
  , fs = require('fs')
  , path = require('path')

/* change this back to exports = function(doc) after testing */

module.exports = function() { 
  var doc = fs.createReadStream(path.join(__dirname, "../../public/docs/test.docx"))
    .pipe(unzip.Parse())
    .on("entry", function(entry) { 

      var fileName = entry.path
      console.log("files in zip: " + fileName)

      if (fileName == "word/document.xml") {
        fs.createWriteStream('./output.xml')
          .pipe(entry)
          .on('finish', function() {
            fs.readFile('./output.xml', { encoding : 'utf-8' }, function(err, data) { 
              if (err) return callback(err)
              if (data != undefined) {
                //data = data.toString().replace('\ufeff', '')
                console.log('the data is: ' + data)
                parseString("data", function(err, result) {
                  if (err) return console.log(err)

                  console.log(util.inspect(result, false, null))
                  console.dir(result["w:body"])
                  console.dir(result["w:p"])
                  console.dir(result["w:pStyle"])
                  console.dir(result["w:u"])
                  console.dir(result["w:b"])
                  console.dir(result["w:i"])
              })
            }
          })
        })
      } else {
        entry.autodrain()
    }
  })
}
