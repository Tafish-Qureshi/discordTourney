const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tournamentinfo')
        .setDescription('Get information about a specific tournament')
        .addStringOption(option =>
            option.setName('tournament_name')
                .setDescription('Name of the tournament')
                .setRequired(true)),

    async execute(interaction) {
        const tournamentName = interaction.options.getString('tournament_name');

        let tournaments;
        try {
            tournaments = JSON.parse(fs.readFileSync(tournamentsFile));
        } catch (error) {
            return interaction.reply("Er is een fout opgetreden bij het lezen van het toernooienbestand.");
        }

        const tournament = tournaments.find(t => t.name.toLowerCase() === tournamentName.toLowerCase());

        if (!tournament) {
            return interaction.reply(`❌ Toernooi "${tournamentName}" niet gevonden.`);
        }

        const playersList = tournament.players.length > 0
            ? tournament.players.join(', ')
            : "Er zijn nog geen deelnemers.";

        await interaction.reply(`
            🏆 **Toernooi: ${tournament.name}**
            - **Game**: ${tournament.game}
            - **Datum**: ${tournament.date}
            - **Tijd**: ${tournament.time}
            - **Deelnemers**: ${playersList}
        `);
    },
};
