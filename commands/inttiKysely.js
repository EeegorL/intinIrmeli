const { SlashCommandBuilder } = require("discord.js");
const { writeToCSV } = require("../utils/csvHandler");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("inttimielentila")
		.setDescription("Kerropas Irmelille kuulumisia")
        .addStringOption(option =>
            option.setName("arvio")
            .setRequired(true)
            .addChoices(
                {name: "0/10", value: "0"},
                {name: "1/10", value: "1"},
                {name: "2/10", value: "2"},
                {name: "3/10", value: "3"},
                {name: "4/10", value: "4"},
                {name: "5/10", value: "5"},
                {name: "6/10", value: "6"},
                {name: "7/10", value: "7"},
                {name: "8/10", value: "8"},
                {name: "9/10", value: "9"},
                {name: "10/10", value: "10"},
            )
            .setDescription("0-10/10"))
        .addStringOption(option =>
            option.setName("kuvaus")
            .setRequired(false)
            .setDescription("Vapaa kuvaus siitä miten meni")),
	async execute(interaction) {
        const nimi = interaction.user.username;
        const arvio = interaction.options._hoistedOptions[0]?.value;
        const kuvaus = interaction.options._hoistedOptions[1]?.value ||null;
        const aika = new Date().toISOString().slice(0, 10);
    
    
        const data = {
            nimi: nimi,
            arvio: arvio,
            kuvaus: kuvaus,
            aika: aika
        };
    
        writeToCSV(data);
        interaction.reply(`Kirjattu!\n${arvio}/10${kuvaus === null ? "" : `: ${kuvaus}`}`);
	}
};