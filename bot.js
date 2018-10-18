const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');

client.on('ready', () => {
  console.log('Bot online!');
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
      if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
      }
});

client.login(auth.token);