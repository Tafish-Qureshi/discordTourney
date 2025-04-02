module.exports = {
    data: {
      name: 'hello',
      description: 'Stuur een groet!',
    },
    async execute(interaction) {
      await interaction.reply('Hallo! Hoe gaat het?');
    },
  };
  