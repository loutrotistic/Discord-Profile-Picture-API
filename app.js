const express = require('express');
const app = express();
const config = require('./config.json');
const {
    Client, 
    Intents,
} = require('discord.js');

const client = new Client({
    intents: [  
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_VOICE_STATES, 
        Intents.FLAGS.GUILD_PRESENCES, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_WEBHOOKS, 
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_INVITES, 
        Intents.FLAGS.GUILD_INTEGRATIONS, 
        Intents.FLAGS.DIRECT_MESSAGES, 
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,         
        Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});


app.get(`/avatar/:userID/:size`, function(req, res) {
    var userID = req.params.userID;
    let size = req.params.size;

    client.users.fetch(req.params.userID).then((user) => {
    
    res.redirect(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=${size}`)
    console.log(user)
})
})

app.listen(config.PORT, () => {
    console.log('Server Started')
})

client.login(config.TOKEN)
console.log('Bot Started')
