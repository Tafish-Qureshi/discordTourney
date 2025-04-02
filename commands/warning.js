const warnings = {};

module.exports = {
  data: {
    name: 'warn',
    description: 'Waarschuw een gebruiker.',
    options: [
      {
        type: 6, // Gebruikersoptie
        name: 'user',
        description: 'De gebruiker die je wilt waarschuwen.',
        required: true,
      },
      {
        type: 3, // Stringoptie (reden)
        name: 'reason',
        description: 'Reden van de waarschuwing.',
        required: false,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Geen reden opgegeven';
    
    if (!warnings[user.id]) warnings[user.id] = 0;
    warnings[user.id]++;
    
    await interaction.reply(`${user.tag} is gewaarschuwd! Reden: ${reason}. Waarschuwingen: ${warnings[user.id]}`);
  },
};
