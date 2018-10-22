const Discord = require('discord.js');
const client = new Discord.Client();
const botSettings = require("./botSettings.json");

const fs = require("fs");
var auth = require('./auth.json');
const prefix = botSettings.prefix;

client.commands = new Discord.Collection();

//Read our command directory
fs.readdir("./functions/", (err, files) =>{
  if(err) console.log(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No commands to load");
  }

  console.log(`Loading ${jsFiles.length} commands`);

  jsFiles.forEach((f, i) => {
    let props = require(`./functions/${f}`);
    console.log(`${i+ 1}: ${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

client.on('ready', () => {
  console.log('Bot online!');
  //console.log(client.commands);
});

/* Code for greeting whenever a member joins */
client.on('guildMemberAdd', member => {
  console.log('guyJoined!')
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome'); //change the ch.name to whatever the channel name is
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome ${member}! Please read our description on Habitica and tell us about yourself!`);
});

//Event listener for messages
client.on('message', message => {
      let messageArray = message.content.split(/\s+/g);
      let command = messageArray[0];
      let args = messageArray.slice(1);

      let cmd = client.commands.get(command.slice(prefix.length));
      if(cmd) cmd.run(client, message, args)
      if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
      }
});

client.login(auth.token);