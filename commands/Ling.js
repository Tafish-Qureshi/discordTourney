const warnings = {};  // Een object om waarschuwingen per gebruiker op te slaan

module.exports = {
  data: {
    name: 'clearwarn',
    description: 'Verwijder de waarschuwingen van een gebruiker.',
    options: [
      {
        type: 6, // Gebruikersoptie
        name: 'user',
        description: 'De gebruiker waarvan je de waarschuwingen wilt verwijderen.',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser('user');

    // Controleer of de gebruiker waarschuwingen heeft
    if (!warnings[user.id] || warnings[user.id] === 0) {
      return interaction.reply(`${user.tag} heeft geen waarschuwingen om te verwijderen.`);
    }

    // Verwijder de waarschuwingen
    warnings[user.id] = 0;

    await interaction.reply(`De waarschuwingen van ${user.tag} zijn succesvol verwijderd!`);
  },
};
