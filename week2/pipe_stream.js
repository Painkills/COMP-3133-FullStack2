var fs = require("fs")
var zlib = require("zlib")

const input_stream = "input_stream.txt"
const output_stream = "output_stream.txt"

var readStream = fs.createReadStream(input_stream)
var writeStream = fs.createWriteStream(output_stream)

readStream.pipe(writeStream)

// ZIP using Pipe
var zlib_writeStream = fs.createWriteStream("data.gz")
readStream.pipe(zlib.createGzip()).pipe(zlib_writeStream)