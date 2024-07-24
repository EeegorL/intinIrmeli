const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require('dotenv').config({path: "../.env"});


const loadCommands = async () => {
    const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

    const commands = [];
    
    const commandsPath = path.join(__dirname, "../commands");
    
    const commandFiles = fs.readdirSync(commandsPath);
    
    for(const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
    
        commands.push(command.data.toJSON());
    };
    
    const rest = new REST().setToken(TOKEN);
    
    (async () => {
        try {
            const data = await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
            );
        } catch (err) {
            console.error(err);
        }
    })();
}

module.exports = { loadCommands };

