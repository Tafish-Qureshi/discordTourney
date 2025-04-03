const { SlashCommandBuilder } = require('discord.js'); 
const fs = require('fs');
const path = require('path');

// Pad naar het JSON-bestand waar de toernooien worden opgeslagen
const tournamentsFile = path.join(__dirname, '../tournaments.json');

// Controleer of het toernooienbestand al bestaat, anders maak het aan
if (!fs.existsSync(tournamentsFile)) {
    fs.writeFileSync(tournamentsFile, JSON.stringify([])); // Maak een leeg JSON-bestand aan
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtourney')
        .setDescription('Create a new tournament')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the tournament')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Game of the tournament')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date of the tournament')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Time of the tournament')
                .setRequired(true)),

    async execute(interaction) {
        const name = interaction.options.getString('name');
        const game = interaction.options.getString('game');
        const date = interaction.options.getString('date');
        const time = interaction.options.getString('time');

        // Lees het bestaande toernooienbestand
        const tournaments = JSON.parse(fs.readFileSync(tournamentsFile));

        // Voeg het nieuwe toernooi toe aan de lijst
        tournaments.push({ name, game, date, time, players: [] });

        // Schrijf de bijgewerkte lijst van toernooien terug naar het bestand
        fs.writeFileSync(tournamentsFile, JSON.stringify(tournaments, null, 2));

        // Reageer op het Discord-commando
        await interaction.reply(`🏆 **Toernooi "${name}" aangemaakt!**\n🎮 Game: ${game}\n📅 Datum: ${date}\n⏰ Tijd: ${time}`);
    },
};
