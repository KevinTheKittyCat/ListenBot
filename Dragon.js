const fetch = require('node-fetch')
const Discord = require('discord.js');
require('discord-reply');
require('dotenv').config();

//Log In to Discord {
const client = new Discord.Client();
client.login(process.env.TOKEN);


var prefix = "!";

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('\x1b[32m', "I logged in.", '\x1b[0m');
    console.log();
    console.log("Please write !joincall in the Discord Chat.")
}

client.on('guildCreate', guild => {
    var discordName = guild.name
    var discordId = guild.id
});

var discordServerID = 0

//If a message is sent, it checks if it is joincall, if it is, joins the channel.
const commandHandler = require("./Join");
client.on("message", commandHandler);

client.on("message", test => {
    console.log("got Message")
    console.log(test)
});

//If a new Member joins -> Add member to Join.js
client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (discordServerID == newMember.channelID) {
        commandHandler

        //fs.writeFile('Stream/call.json', JSON.stringify(text)

        /*
        Plan:

        Write a Json Stringify for each user in the channel, and when they leave and join.
        */
    }
})

