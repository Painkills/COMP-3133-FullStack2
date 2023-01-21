var fs = require("fs")

const input_stream = "input_stream.txt"
const output_stream = "output_stream.txt"

var readStream = fs.createReadStream(input_stream)

// Data Available
readStream.on("data", (rawData) => {
    console.log(rawData.toString())
})

// Data read Done
readStream.on("end", () => {
    console.log("-----Data reading from stream is complete.")
})

// Error
readStream.on("error", (err) => {
    console.log(`Error: Read Stream: ${err}`)
})


// Write Stream
var writeStream = fs.createWriteStream(output_stream)

writeStream.on('finish', () => {
    console.log("--- Data written to Stream")
})

writeStream.on('error', (err) => {
    console.log(`---Error  ${err}`)
})

writeStream.write("gbc - 1\n")
writeStream.write("gbc - 2\n")
writeStream.write("gbc - 3")


writeStream.end()