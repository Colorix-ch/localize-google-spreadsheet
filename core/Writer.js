const fs = require('fs')
const EOL = require('./Constants').EOL

const FileWriter = function() {
}

FileWriter.prototype.write = function(filePath, encoding, lines, transformer, options) {
  let fileContent = ''
  if (fs.existsSync(filePath)) {
    fileContent = fs.readFileSync(filePath, encoding);
  }

  const valueToInsert = this.getTransformedLines(lines, transformer)

  const output = transformer.insert(fileContent, valueToInsert, options)

  writeFileAndCreateDirectoriesSync(filePath, output, 'utf8')
}

//https://gist.github.com/jrajav/4140206
const writeFileAndCreateDirectoriesSync = function(filepath, content, encoding) {
  const mkpath = require('mkpath')
  const path = require('path')

  const dirname = path.dirname(filepath)
  mkpath.sync(dirname)

  fs.writeFileSync(filepath, content, encoding)
}

//

const FakeWriter = function() {

}

FileWriter.prototype.getTransformedLines = function(lines, transformer) {
  let valueToInsert = ''

  // Small modification to have a better presentation of the file
  var lineToInsert = '';
  var doesAddALine = 1;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    doesAddALine = 1;
      if (!line.isEmpty()) {
          if (line.isComment()) {
              valueToInsert += '// ********************************************************' + EOL + transformer.transformComment(line.getComment()) + EOL + '// ********************************************************' + EOL;
          } else {
            lineToInsert = transformer.transformKeyValue(line.getKey(), line.getValue());
              if (lineToInsert != '') {
                  valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue()) + EOL;
              } else {
                  doesAddALine = 0;
              }
              
          }
      } else {
          doesAddALine = 0;
      }
      if (i != lines.length - 1 && doesAddALine == 1) {
          valueToInsert += EOL;
      }
  }


  // for (let i = 0; i < lines.length; i++) {
  //   const line = lines[i]

  //   if (!line.isEmpty()) {
  //     if (line.isComment()) {
  //       const transformed = transformer.transformComment(line.getComment())

  //       if (transformed !== null) {
  //         valueToInsert += transformed

  //         if (i !== lines.length - 1) {
  //           valueToInsert += EOL
  //         }
  //       }
  //     } else {
  //       valueToInsert += transformer.transformKeyValue(line.getKey(), line.getValue())

  //       if (i !== lines.length - 1) {
  //         valueToInsert += EOL
  //       }
  //     }
  //   }
  // }

  return valueToInsert
}

FakeWriter.prototype.write = function(filePath, lines, transformer) {

}

module.exports = { File: FileWriter, Fake: FakeWriter }
