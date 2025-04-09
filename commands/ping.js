// commands/ping.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Geeft een pong terug!'),
  async execute(interaction) {
    await interaction.reply('🏓 Pong!');
  },
};
