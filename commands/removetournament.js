const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetournament')
        .setDescription('Remove a specific tournament')
        .addStringOption(option =>
            option.setName('tournament_name')
                .setDescription('Name of the tournament to remove')
                .setRequired(true)),

    async execute(interaction) {
        const tournamentName = interaction.options.getString('tournament_name');

        let tournaments;
        try {
            tournaments = JSON.parse(fs.readFileSync(tournamentsFile));
        } catch (error) {
            return interaction.reply("Er is een fout opgetreden bij het lezen van het toernooienbestand.");
        }

        const tournamentIndex = tournaments.findIndex(t => t.name.toLowerCase() === tournamentName.toLowerCase());

        if (tournamentIndex === -1) {
            return interaction.reply(`❌ Toernooi "${tournamentName}" niet gevonden.`);
        }

        tournaments.splice(tournamentIndex, 1); // Verwijder het toernooi uit de lijst

        fs.writeFileSync(tournamentsFile, JSON.stringify(tournaments, null, 2));

        await interaction.reply(`✅ Toernooi "${tournamentName}" is succesvol verwijderd.`);
    },
};
