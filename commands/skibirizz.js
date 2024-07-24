const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skibidi")
		.setDescription("Gyatt"),
	async execute(interaction) {
		await interaction.reply("Rizz");
	}
};