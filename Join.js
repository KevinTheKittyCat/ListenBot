
const fetch = require('node-fetch')
var mysql = require('mysql');
require('dotenv').config();
var fs = require('fs');
require("./Stream/jquery-3.6.0");
var mkdirp = require('mkdirp');

class Details {
    constructor(id, state) {
    }
}

class User {
    constructor(id, state) {
        this.identity = id
        this.speaking = state
        this.images = []
    }

}

module.exports = async function (msg, tokens, client) {
    if (msg.content == "!joincall") {
    //console.log(msg.guild.channels)
    //console.log(msg.guild.channels.cache)
    //console.log(msg.member.voice.channel);
    const channel = msg.member.voice.channel;
    let jsonToUpdate = {}
    let user = {}, details = [];

    channel.members.forEach(userInChannel => {
        //let userToAssign = `${userInChannel.id}:{"speaking":"0"}`
        //Object.assign(jsonToUpdate, userToAssign)
        console.log("current User: " + userInChannel.id)
    details.push(new User(userInChannel.id, 0));  
    })
    console.log(details)
    await fs.writeFile('./Stream/test.json', JSON.stringify(details), function (err) {
        if (err) throw err;

        console.log('Replaced!');
    });


    channel.join()
        .then(connection => {
            console.log('Connected!')
            connection.on('speaking', async (user, speakingState) => {
                let json = require('./Stream/test.json');
                console.log(json)
                    json.forEach(jsonUser => {

                        mkdirp(`./Stream/${jsonUser.identity}`, function(err) { 
                            console.log("Making Folder")
                            // path exists unless there was an error
                        
                                    });

                        console.log(jsonUser) 
                        if (jsonUser.identity == user.id) {
                            console.log("is Talking: " + user.id)
                            console.log(speakingState.bitfield)
                            jsonUser.speaking = speakingState.bitfield
                        }

                        let testFolder = `./Stream/${jsonUser.identity}`;

                        fs.readdir(testFolder, (err, files) => {
                            console.log(files)
                            if (files != 0) {
                                jsonUser.images = files
                                files.forEach(file => {
                                    //jsonUser.images.push[file]
                                console.log(file);
                                console.log("Files")
                                console.log(jsonUser.images)
                                });
                            } else {
                                console.log("no files")
                            }
                          });
                        

                    })

                        

                        await fs.writeFile('Stream/test.json', JSON.stringify(json), function (err) {
                            if (err) throw err;
                    
                            console.log('Replaced!');
                        });


                console.log()
                console.log()
                console.log()
                //console.log(json.User.id[user.id])
                console.log()
                console.log()
                console.log()
                /*
                await fs.writeFile('test.json', JSON.stringify(eachUserSettings), function (err) {
                    if (err) throw err;

                    console.log('Replaced!');
                });
                /*

                /*
                let text = require('./Stream/call.json');
                console.log(text)
                console.log("UNDER THIS")
                console.log(user.id)
                //text[`${user.id}`].speaking = 5;

                console.log()
                //console.log(user)
                if (speakingState == 0) {
                    text[`${user.id}`].speaking = '1';
                } else if (speakingState == 1) {
                    text[`${user.id}`].speaking = '0';
                }
                console.log(speakingState)
                //console.log(JSON.stringify(text))
                await fs.writeFile('Stream/call.json', JSON.stringify(text), function (err) {
                    if (err) throw err;

                    console.log('Replaced!');
                });

                //console.log(channel.speaking)
                console.log(test)
                console.log(user)
                */
            })
        })
        .catch(console.error);

    function checkState() {
        console.log(channel.speaking)
    }

    /*
    var voiceChannels = [];
    var testServer = msg.guild.channels.cache
    testServer.forEach(element => {
        console.log(element)
        if (element.type == "voice") {
            voiceChannels.push(element);
        }
    })
    voiceChannels.forEach(channel => {
        if (channel.guild.voiceStates == msg.author.id)
        voiceChannel.join(channel.id)
        .then(connection => {

        })
    })
    console.log(voiceChannels)
    console.log("THIAS IS THE SPLIUT")
    console.log(voiceChannels)
    */

    //console.log(voiceChannels[0].guild.voiceStates)
    /*
    voiceChannel.join()
    .then(connection => {

    });
    */
}
/*
Get User that sent the Message.
Join the Chat they are in.
Listen to the Users talk.
If they talk over 1 second, turn a number in DB to 2.
If they don't talk for 2 seconds, turn number to 1.
If they don't talk for 3 seconds, turn number to 0.

Database:
Array {
    Person{
        Id of speaker: Nickname,
        Current Talk Number: 0
   }
    Person{
        Id of speaker: Nickname,
        Current Talk Number: 0
   }

}

Code:
If (Person.Current-Talk-Number == 0) {
    Image = (No Image)
} else if (Person.Current-Talk-Number == 1) {
    Image = `/ImageFolder/${Person.Id}Dark.png(maybe Gif??)`
} else if (Person.Current-Talk-Number == 2) {
    Image = `/ImageFolder/${Person.Id}.png(maybe Gif??)`
}
*/
}

function bah() {
    console.log("BAAAAAAAAH")
}