const fs = require("fs");
const csvPath = __dirname + "\\inttikysely\\inttidata.csv";

const readCSVtoObj = () => {
  const data = fs.readFileSync(csvPath, "utf8");

  let rows = data.split("\n") 
  const attributes = rows[0].split("; ");

  const rowData = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split("; ");
    rowData.push(row);
  }

  let rowsObj = [];
  for (let i = 0; i < rowData.length; i++) {
    let rowObj = {}

    for (let j = 0; j < rowData[i].length; j++) {
      rowObj[attributes[j]] = rowData[i][j];
    }

    rowsObj.push(rowObj);
  }
  return rowsObj
};

const writeToCSV = (data) => {
  const aika = data.aika;
  const nimi = data.nimi;
  const arvio = data.arvio;
  const kuvaus = data.kuvaus;

  const dataString = `\n${aika}; ${nimi}; ${arvio}; ${kuvaus}`;

  if(fs.readFileSync(csvPath, "utf8").indexOf(`${aika}; ${nimi}`) === -1) { // jos kirjausta ei olemassa tältä päivältä tältä henkilöltä
    fs.appendFile(csvPath, dataString, (err) => {
      if(err) {
        console.log(err)
      }
    });
    return {type: "info", message: "Kirjattu!"};
  }
  else { // jos on
    let allRows = fs.readFileSync(csvPath, "utf8").split("\n");

    let rowToEditIndex;

    for(let i = 0; i < allRows.length; i++){
      if(allRows[i].indexOf(`${aika}; ${nimi}`) > -1) {
        rowToEditIndex = i; // muutettava rivi löytyi
      };
    };
    allRows[rowToEditIndex] = `${aika}; ${nimi}; ${arvio}; ${kuvaus}`;

    let newDataString = "";
    for(let row of allRows) {
      if(row == "Aika; Nimi; Arvio; Kuvaus") {
        newDataString += `${row}`; // ensimmäinen rivi ilman rivinvaihtoa
      }
      else newDataString += `\n${row}`;
    }
    fs.writeFileSync(csvPath, newDataString);

    return {type: "info", message: "Päivän kirjaus muutettu!"};
  }
};

module.exports = { readCSVtoObj, writeToCSV };