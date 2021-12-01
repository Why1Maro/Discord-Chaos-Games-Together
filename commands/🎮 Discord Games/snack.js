const { Client, Message, MessageEmbed } = require('discord.js');
const djsGames = require('djs-games')
const SnakeGame = new djsGames.SnakeGame()

module.exports = {
    name: 'yılan',
    aliases: ['snk'],
    categories : 'discord_games',
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        message.channel.send(
            new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Oyununuz Başlıyor Lütfen Bekleyiniz....`)
                .setAuthor(message.author.tag)
                .setFooter(`Coded By RETRO`)
                .setTimestamp(5000)
        ).then(msg => {
            msg.delete({ timeout: 5000 })
            setTimeout(() => {
                SnakeGame.startGame(message)
            }, 5000);
        })

    }
}