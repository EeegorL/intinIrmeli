const { SlashCommandBuilder } = require("discord.js");
const path = require("path");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pispalankovinbruh")
		.setDescription("Pispalan kovin bruh 🐱😌"),
	async execute(interaction) {
        const imagePath = path.join(__dirname, "..", "utils", "pispalanKovinBruh", "pispalanKovinBruh.jpg");
        interaction.reply({files: [{attachment: imagePath}]});
	}
};