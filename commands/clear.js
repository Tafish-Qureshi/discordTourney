module.exports = {
    data: {
      name: 'clear',
      description: 'Verwijder een aantal berichten.',
      options: [
        {
          type: 4, // Type 4 is voor een integer (aantal berichten)
          name: 'amount',
          description: 'Het aantal berichten dat je wilt verwijderen.',
          required: true,
        },
      ],
    },
    async execute(interaction) {
      const amount = interaction.options.getInteger('amount');
  
      if (amount < 1 || amount > 100) {
        return interaction.reply('Het aantal berichten moet tussen de 1 en 100 liggen.');
      }
  
      try {
        // Verwijder de berichten
        const messages = await interaction.channel.messages.fetch({ limit: amount });
        await interaction.channel.bulkDelete(messages);
  
        // Bevestig het verwijderen van de berichten
        await interaction.reply(`${amount} berichten verwijderd!`);
      } catch (error) {
        console.error(error);
        await interaction.reply('Er is een fout opgetreden bij het verwijderen van berichten.');
      }
    },
  };
  