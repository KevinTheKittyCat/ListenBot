
const fetch = require('node-fetch')
require('dotenv').config();
var fs = require('fs');
require("./Stream/jquery-3.6.0");
var mkdirp = require('mkdirp');

class Details {
    constructor(id, state) {
    }
}

class User {
    constructor(id, state, name) {
        this.identity = id
        this.speaking = state
        this.images = []
        this.name = name
    }

}

module.exports = async function (msg, tokens, client) {
    if (msg.content == "!joincall") {
        //If the Member is in a voice call.
        if (msg.member.voice.channel) {
            const channel = msg.member.voice.channel;
            let details = [];
            let channelUsers = [];

            //Make Each User an object for The JSON to parse into index.html
            channel.members.forEach(userInChannel => {
                if (!userInChannel.user.bot) {
                    details.push(new User(userInChannel.id, 0, userInChannel.user.username + userInChannel.user.discriminator));
                    channelUsers.push(" " + userInChannel.user.username + " ")
                }
            })
            console.log("Currently I see: " + channelUsers)

            //Make/Overwrite the json with the current Users in Chat, only User objects. 
            await fs.writeFile('./Stream/Users.json', JSON.stringify(details), function (err) {
                if (err) throw err;
            });


            channel.join()
                .then(connection => {

                    //After Connecting, if anyone is speaking, it returns the User speaking, and what state it is in.
                    connection.on('speaking', async (user, speakingState) => {
                        let json = require('./Stream/Users.json');
                        json.forEach(jsonUser => {

                            //If a folder with the Name of the User isn't made, make one. This is where we'll take pictures from.
                            mkdirp(`./UserImages/${jsonUser.name}`, function (err) {
                                // path exists unless there was an error

                            });

                            //Change the Users Speaking State in the JSON
                            if (jsonUser.identity == user.id) {
                                jsonUser.speaking = speakingState.bitfield
                            }

                            let defaultNoImage = `./Stream/img`
                            let userFolder = `./UserImages/${jsonUser.name}`;

                            fs.readdir(userFolder, (err, files) => {
                                if (files != 0) {
                                    jsonUser.images = files
                                } else {
                                    fs.readdir(defaultNoImage, (err, backupFiles) => {
                                        if (backupFiles != 0) {
                                            jsonUser.images = backupFiles
                                        } else {
                                            console.log("No files found in img. Problem! Please re-install the package.")
                                        }
                                    })
                                    console.log("No files found in " + jsonUser.name + "'s folder")
                                }
                            });


                        })


                        //Overwrite/Update the json with the new information, only User objects. 
                        await fs.writeFile('Stream/Users.json', JSON.stringify(json), function (err) {
                            if (err) throw err;
                        });
                    })
                })
                .catch(console.error);
        } else {
            msg.reply("You Are not in a Voice Channel");
            console.log("User not in Voice Channel")
        }
    }
}