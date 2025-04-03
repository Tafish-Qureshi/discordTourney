const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeplayer')
        .setDescription('Remove a player from a tournament')
        .addStringOption(option =>
            option.setName('tournament_name')
                .setDescription('Name of the tournament')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('player_name')
                .setDescription('Name of the player to remove')
                .setRequired(true)),

    async execute(interaction) {
        const tournamentName = interaction.options.getString('tournament_name');
        const playerName = interaction.options.getString('player_name');

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

        const playerIndex = tournament.players.indexOf(playerName);

        if (playerIndex === -1) {
            return interaction.reply(`❌ Speler "${playerName}" is niet ingeschreven voor het toernooi.`);
        }

        tournament.players.splice(playerIndex, 1); // Verwijder de speler

        fs.writeFileSync(tournamentsFile, JSON.stringify(tournaments, null, 2));

        await interaction.reply(`✅ Speler "${playerName}" is succesvol verwijderd uit het toernooi "${tournamentName}".`);
    },
};
