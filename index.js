require('dotenv').config();

if (!process.env.DISCORD_TOKEN) {
    console.error("❌ ERROR: DISCORD_TOKEN is missing in .env file!");
    process.exit(1);
}

const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error("❌ Failed to log in:", err);
});
