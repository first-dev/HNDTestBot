import fs from 'fs'
let data = ''

let readerStream = fs.createReadStream('./streamTest/file.txt') //Create a readable stream

readerStream.setEncoding('UTF8') // Set the encoding to be utf8. 

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   console.log('chunck:', chunk)
   data += chunk
})

readerStream.on('end',function() {
//    console.log(data)
})

readerStream.on('error', function(err) {
   console.log(err.stack)
})

console.log("Program Ended")