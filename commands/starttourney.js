const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('starttournament')
        .setDescription('Start a tournament')
        .addStringOption(option =>
            option.setName('tournament_name')
                .setDescription('The name of the tournament to start')
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

        if (tournament.players.length < 2) {
            return interaction.reply(`❌ Er zijn niet genoeg deelnemers om het toernooi te starten. Minimaal 2 deelnemers nodig.`);
        }

        tournament.status = 'started'; // Stel de status in op 'gestart'

        fs.writeFileSync(tournamentsFile, JSON.stringify(tournaments, null, 2));

        await interaction.reply(`✅ Het toernooi "${tournamentName}" is gestart! Veel succes aan alle deelnemers.`);
    },
};
