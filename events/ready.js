const { prefix } = require('../index')
const client = require('../index')
const { version: discordjsVersion } = require('discord.js');

client.on('ready', async () => {
  //client.user.setStatus('dnd');
  console.log(`${client.user.username} basariyle aktif oldu!`)
  //client.user.setPresence(`${prefix}help | Chaos Retro ⚖️`)
  client.user.setPresence({ activity: { name: "Chaos Retro ⚖️" }, status: "dnd" });
})