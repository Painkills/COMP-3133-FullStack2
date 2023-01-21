var fs = require("fs")
var csv = require("csv-parser")

const canada_file = 'Canada.txt'
const usa_file = 'USA.txt'
const countries_file = "input_countries.csv"

// Delete file if it exists
fs.unlink(canada_file, (err) => {
    if (err) {
      console.log("---No File to delete")
    } else {
      console.log("---Deleted File successfully.");
    }
});
fs.unlink(usa_file, (err) => {
    if (err) {
      console.log("---No File to delete")
    } else {
      console.log("---Deleted File successfully.");
    }
});

// Write headers for files that will be filled
const can_header = "Country\tYear\tPopulation\n"
const usa_header = "Country\t\t\tYear\tPopulation\n"
fs.writeFileSync(canada_file, can_header)
fs.writeFileSync(usa_file, usa_header)

// Use readstream and csv parser to go through each row, 
// check if it contains the country we're looking for and write it to respective file
fs.createReadStream(countries_file)
  .pipe(csv())
  .on('data', (row) => {
    const data = row.country + "\t" + row.year + "\t" + row.population + "\n"
    if (row.country.includes("Canada")) {
      fs.writeFileSync(canada_file, data, {flag:'a'})
    } else {
      if (row.country.includes("United States")) {
        fs.writeFileSync(usa_file, data, {flag:'a'})
      }
    }
  })
  .on('end', () => {
});




