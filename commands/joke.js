module.exports = {
    data: {
        name: 'joke',
        description: 'Vertel een grap!',
    },
    async execute(interaction) {
        const jokes = [
            'Why can secret agents never play chess well? Because they are always afraid of the bishop!',
            'What does one wall say to the other wall? "Shall we meet at the corner?"',
            'Why are ghosts so bad at lying? Because you can see right through them!',
            'What does a big fish say to a small fish? "You are my smallest friend!"',
            'Why can’t bicycles stand up by themselves? Because they are two-tired!',
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(randomJoke);
    },
};