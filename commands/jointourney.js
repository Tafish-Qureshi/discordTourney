const { SlashCommandBuilder } = require('discord.js'); 
const fs = require('fs');
const path = require('path');

// Pad naar het JSON-bestand waar de toernooien worden opgeslagen
const tournamentsFile = path.join(__dirname, '../tournaments.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jointourney')
        .setDescription('Join an existing tournament'),

    async execute(interaction) {
        // Lees het bestaande toernooienbestand
        let tournaments;
        try {
            tournaments = JSON.parse(fs.readFileSync(tournamentsFile));
        } catch (error) {
            return interaction.reply("Er is een fout opgetreden bij het lezen van het toernooienbestand.");
        }

        // Controleer of er toernooien zijn
        if (tournaments.length === 0) {
            return interaction.reply("❌ Er zijn geen beschikbare toernooien om je aan te melden.");
        }

        // Maak een lijst van toernooien om aan de gebruiker te tonen
        const tournamentList = tournaments.map((tournament, index) => 
            `${index + 1}. **${tournament.name}** - ${tournament.game} (Datum: ${tournament.date}, Tijd: ${tournament.time})`
        ).join("\n");

        // Vraag de gebruiker om het toernooi te kiezen
        await interaction.reply({
            content: `🏆 **Beschikbare toernooien:**\n\n${tournamentList}\n\nGebruik de naam van het toernooi om je aan te melden met \`/jointourney [toernooi naam]\`.`
        });
    },
};
