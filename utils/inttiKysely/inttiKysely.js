const Handler = require("node-xlsx");


const inttiKysely = async (interaction) => {
    const excelPath = __dirname + "\\inttidata.xlsx";
    const excel = Handler.parse(excelPath);
    // console.log(excel[0].data)

    // console.log(interaction.options.string("arvio"));
    const arvio = interaction.options._hoistedOptions[0]?.value;
    const kuvaus = interaction.options._hoistedOptions[1]?.value ||null;

    console.log(`Arvio: ${arvio}, Kuvaus: ${kuvaus}`)
};

module.exports = {inttiKysely};