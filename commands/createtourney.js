const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Pad naar het JSON-bestand waar de toernooien worden opgeslagen
const tournamentsFile = path.join(__dirname, '../tournaments.json');

// Pad naar de map met afbeeldingen
const imagesFolder = path.join(__dirname, '/images');

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

        try {
            // Lees het bestaande toernooienbestand
            const tournaments = JSON.parse(fs.readFileSync(tournamentsFile));

            // Voeg het nieuwe toernooi toe aan de lijst
            tournaments.push({
                name,
                game,
                date,
                time,
                players: []
            });

            // Schrijf de bijgewerkte lijst van toernooien terug naar het bestand
            fs.writeFileSync(tournamentsFile, JSON.stringify(tournaments, null, 2));

            // Maak een canvas om de afbeelding te genereren
            const canvas = createCanvas(800, 400);
            const ctx = canvas.getContext('2d');

            // Achtergrondkleur
            ctx.fillStyle = '#f0f0f0'; // Lichte achtergrond
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Tekstinstellingen
            ctx.fillStyle = '#333'; // Donkere tekstkleur
            ctx.font = '30px Arial';

            // Voeg de toernooigegevens toe aan de afbeelding
            ctx.fillText(`Toernooi: ${name}`, 50, 50);
            ctx.fillText(`Game: ${game}`, 50, 100);
            ctx.fillText(`Datum: ${date}`, 50, 150);
            ctx.fillText(`Tijd: ${time}`, 50, 200);

            // Genereer de afbeelding en sla deze op in de map 'images' als PNG
            const outputImagePath = path.join(imagesFolder, 'TCG.png');
            const buffer = canvas.toBuffer('image/png'); // Verander hier naar PNG voor betere kwaliteit
            fs.writeFileSync(outputImagePath, buffer);

            // Reactie met de afbeelding
            await interaction.reply({
                content: `🏆 **Toernooi "${name}" aangemaakt!**\n🎮 Game: ${game}\n📅 Datum: ${date}\n⏰ Tijd: ${time}`,
                files: [{
                    attachment: outputImagePath,
                    name: 'TCG.png' // Pas de extensie aan voor PNG
                }]
            });
        } catch (error) {
            console.error('Fout bij het verwerken van het toernooi:', error);
            await interaction.reply('Er is een fout opgetreden bij het aanmaken van het toernooi. Probeer het opnieuw!');
        }
    },
};
