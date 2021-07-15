Thanks for Installing ListenBot!
    - Kevin

Instructions for Usage

Currently ListenBot operates through your own bot. You will have to go into the .env and edit the TOKEN to your own.
To get the TOKEN for Your bot, go to https://discord.com/developers/applications and create your own bot.
The Token will be under Bot -> "TOKEN" (you can copy or reveal it).
Paste this into the .enc after "=".

Add your bot the server: https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot (Make sure to edit "YOUR_CLIENT_ID" to your ID. You can find the ID at OAuth2 -> Client ID)

If you are unsure about the steps above, I would recommend: https://www.youtube.com/watch?v=ibtXXoMxaho&t=0s

Node.JS
ListenBot is based on Node.js. To start ListenBot, Open a Powershell Window in the Listenbot directory.
You can open a powershell by "shift + rightclick" on empty space in the folder. See https://gyazo.com/cec406c84e90e6660dc87e4b9301a7e4 .
Make sure nothing is selected.

Type "node Dragon.js".

If you're having issues, have a look at https://youtu.be/7A-bnPlxj4k?t=473

OBS
In OBS, add a Browser Source.
Select Local File.
Find the ListenBot Folder.
Select index.html
Change the Width and height to output (Width: 1920, Height:1080)
"OK"
Done.

Images
After starting the bot, it will make a folder for all the users in the current chat.
You can add pictures to them by opening UserImage/TheUser

Name one of your images "default". This will be the "idle" image.

That should be it. Have fun!