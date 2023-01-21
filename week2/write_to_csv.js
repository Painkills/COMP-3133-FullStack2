var fs = require("fs")



const header = "eid, name, salary"
const csv_file = "emp.csv"
fs.writeFileSync(csv_file, header)

var data = "\n1, Pritesh Patel, 500"
fs.writeFileSync(csv_file, data, {flag:'a'})

var data = "\n2, Dav Gar, 41"
fs.writeFileSync(csv_file, data, {flag:'a'})

var data = "\n3, Trae Eabae, 378"
fs.writeFileSync(csv_file, data, {flag:'a'})

var data = fs.readFileSync(csv_file)
console.log(data.toString())

// Delete the file
fs.unlinkSync("emp.csv")