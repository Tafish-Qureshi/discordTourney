const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listtournaments')
        .setDescription('List all existing tournaments'),

    async execute(interaction) {
        let tournaments;
        try {
            tournaments = JSON.parse(fs.readFileSync(tournamentsFile));
        } catch (error) {
            return interaction.reply("Er is een fout opgetreden bij het lezen van de toernooien.");
        }

        if (tournaments.length === 0) {
            return interaction.reply("❌ Er zijn geen toernooien beschikbaar.");
        }

        const tournamentList = tournaments.map((tournament, index) => 
            `${index + 1}. **${tournament.name}** - ${tournament.game} (Datum: ${tournament.date}, Tijd: ${tournament.time})`
        ).join("\n");

        await interaction.reply(`🏆 **Beschikbare toernooien:**\n\n${tournamentList}`);
    },
};