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
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});


app.get(`/avatar/:userID/:size?/:format?`, function(req, res) {
    let size = req.params.size;
    let format = req.params.format;

    if (!size) {
        size = 1024
    };
    if (!format) {
        format = 'webp'
    };

    client.users.fetch(req.params.userID).then((user) => {

        res.redirect(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`)
        console.log(user)
    })
});

app.get('/banner/:userID/:size?/:format?', (req, res) => {
    if (!req.params.size) {
        req.params.size = 4096
    };
    if (!req.params.format) {
        req.params.format = 'png'
    };

    client.users.fetch(req.params.userID).then((user) => {
        res.redirect(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${req.params.format}?size=${req.params.size}`)
    })
})

app.get('/username/:userID/', (req, res) => {
    client.users.fetch(req.params.userID).then((user) => {
        res.send(user.username)
        console.log(user)
    })
});


app.get('/discriminator/:userID/', (req, res) => {
    client.users.fetch(req.params.userID).then((user) => {
        res.send(user.discriminator)
    })
})

app.get('/tag/:userID/', (req, res) => {
    client.users.fetch(req.params.userID).then((user) => {
        res.send(`${user.username}#${user.discriminator}`)
    })
})

app.listen(config.PORT, () => {
    console.log('Server Started')
});

client.login(config.TOKEN)
console.log('Bot Started')