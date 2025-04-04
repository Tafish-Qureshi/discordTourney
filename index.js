// Inladen van de omgevingsvariabelen
require('dotenv').config();

// Discord.js en andere benodigde modules inladen
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

// Maak een nieuwe client aan
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Laad de commando's dynamisch vanuit de /commands map
client.commands = new Collection();

// Functie om commando's te laden
const loadCommands = () => {
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', file));
        client.commands.set(command.data.name, command);
        console.log(`Commando geladen: ${command.data.name}`);
    }
};

// Laad de commando's wanneer de bot start
loadCommands();

// Registreer commando's bij Discord
const registerCommands = async () => {
    const commands = [];
    client.commands.forEach(command => {
        commands.push(command.data);
    });

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands,
        });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
};

// Registreer de commando's wanneer de bot start
registerCommands();

// Wanneer de bot klaar is, wordt dit geprint
client.once('ready', () => {
    console.log(`✅ ${client.user.tag} is ingelogd en klaar om te draaien!`);
});

// Luister naar interacties (slash-commando's)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const command = client.commands.get(commandName);

    if (command) {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Er is iets misgegaan met het uitvoeren van dit commando.', ephemeral: true });
        }
    }
});

// Inloggen bij Discord met behulp van de token uit .env
client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error("❌ Inloggen mislukt:", err);
});
