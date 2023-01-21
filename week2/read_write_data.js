var fs = require("fs")

fs.open("input.txt", 'r+', (err, fd) => {
    if(err) {
        console.log(err)
        return
    }

    var bufferData = Buffer.alloc(10)
    fs.read(fd, bufferData, 0, bufferData.length, 0, (err, n, b) => {
        console.log(bufferData.toString())
        console.log(err, n, b.toString())
    })

    // WRiting data
    var bufferToWrite = Buffer.from("New Info")
    fs.write(fd, bufferToWrite, (err, n, b) => {
        if(err) {
            console.log(err)
            return
        }

        console.log("Data Written successfully!")
    })

    fs.close(fd, () => {
        console.log("FD Closed")
    })
})