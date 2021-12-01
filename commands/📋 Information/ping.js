const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'ping',
  aliases: ['api'],
  categories : 'info',
  description: 'Botun Pingini Al.',
  useage: 'ping',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setFooter("Coded by: RETRO")
        .setTitle(`${'🎈'} Botun Ping Değeri Ölçülüyor....`)
    ).then(msg => {
      msg.edit(
        new MessageEmbed()
          .setColor("RED")
          .setFooter("Coded by: RETRO")
          .setDescription(`🎈 Botumuzun Ping Değeri! : ${client.ws.ping}ms`)
      )
    })
  }
}