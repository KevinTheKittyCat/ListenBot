const fetch = require('node-fetch')
const Discord = require('discord.js');
require('discord-reply');
require('dotenv').config();

function Start() {
    console.log("Hello");
}

//Log In to Discord {
const client = new Discord.Client();
client.login(process.env.TOKEN);


var prefix = "!";

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('\x1b[32m', "I logged in.", '\x1b[0m');
    console.log();
}

client.on('guildCreate', guild => {
    var discordName = guild.name
    var discordId = guild.id
});

var discordServerID = 0
const commandHandler = require("./Join");
client.on("message", commandHandler);

client.on("message", message => {
    //console.log(message)
    if (message.content == "!joincall") {
        discordServerID = message.member.voice.channel.id
        console.log("Message: " + discordServerID)

    }
})


client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (discordServerID == newMember.channelID) {
        commandHandler

        //fs.writeFile('Stream/call.json', JSON.stringify(text)

        /*
        Plan:

        Write a Json Stringify for each user in the channel, and when they leave and join.
        */
    }
    console.log(discordServerID)
    console.log(oldMember.channelID)
    console.log("State: " + newMember.channelID)
})

