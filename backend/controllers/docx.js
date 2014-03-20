var parseString = require('xml2js').parseString
  , _ = require('underscore')
  , util = require('util')
  , unzip = require('unzip')
  , fs = require('fs')
  , path = require('path')

/* change this back to exports = function(doc) after testing */

module.exports = function() { 
  fs.createReadStream(path.join(__dirname, "../../public/docs/test.docx"))
    .pipe(unzip.Parse())
    .on("entry", function(entry) { 
      var fileName = entry.path
      console.log(fileName)
      if (fileName == "word/document.xml") {
        var oStream = fs.createWriteStream('./output.xml')
        //entry.pipe(oStream)
        process.stdout.pipe(oStream)
        /*oStream.on('finish', function() { 
          parseString("./output.xml", function(err, result) {
            if (err) return console.log(err)

            console.log(util.inspect(result, false, null))
            console.dir(result["w:body"])
            console.dir(result["w:p"])
            console.dir(result["w:pStyle"])
            console.dir(result["w:u"])
            console.dir(result["w:b"])
            console.dir(result["w:i"])

          })
        }) */
      }
    })
}
