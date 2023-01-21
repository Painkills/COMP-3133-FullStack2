var fs = require("fs")

console.log("Week 02 - File Handling")

console.log("---------START ASYNC-------")
fs.readFile("input.txt", (err, data) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(data.toString())
})
console.log("---------END ASYNC-------")

console.log("---------START SYNC-------")
var data = fs.readFileSync("input.txt")
console.log(data.toString())
console.log("---------END SYNC-------")

