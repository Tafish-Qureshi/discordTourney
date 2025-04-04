// commands/ping.js
module.exports = {
    data: {
        name: 'ping',
        description: 'Ping het om te kijken of de bot werkt!',
    },
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
};
