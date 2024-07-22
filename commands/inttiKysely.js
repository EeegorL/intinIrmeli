const { SlashCommandBuilder, addStringOption } = require("discord.js");
const {inttiKysely} = require("../utils/inttiKysely/inttiKysely");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("inttimeininki")
		.setDescription("Kerropas Irmelille kuulumisia")
        .addStringOption(option =>
            option.setName("arvio")
            .setRequired(true)
            .addChoices(
                {name: "0/10", value: "0/10"},
                {name: "1/10", value: "1/10"},
                {name: "2/10", value: "2/10"},
                {name: "3/10", value: "3/10"},
                {name: "4/10", value: "4/10"},
                {name: "5/10", value: "5/10"},
                {name: "6/10", value: "6/10"},
                {name: "7/10", value: "7/10"},
                {name: "8/10", value: "8/10"},
                {name: "9/10", value: "9/10"},
                {name: "10/10", value: "10/10"},
            )
            .setDescription("1-10/10"))
        .addStringOption(option =>
            option.setName("kuvaus")
            .setRequired(false)
            .setDescription("Vapaa kuvaus siitä miten meni, voi jättää tyhjäksi")),
	async execute(interaction) {
        await inttiKysely(interaction);
		await interaction.reply("Kirjattu!");
	}
};