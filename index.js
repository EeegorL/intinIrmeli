const {Client, Collection, GatewayIntentBits, Events} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const {loadCommands} = require("./utils/commandDeployer");
require('dotenv').config();

const {TOKEN} = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath);

loadCommands();

for(const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

    client.commands.set(command.data.name, command);
};



client.once(Events.ClientReady, () => {
	console.log("Valmis!");
});

client.on(Events.InteractionCreate, async interaction => {
	const command = interaction.client.commands.get(interaction.commandName);
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: "Virhe, kerroppa Egor-kullalle!\n-> ***"+error.message+"***", ephemeral: true });
	}
});

client.login(TOKEN);