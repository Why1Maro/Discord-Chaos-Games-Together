const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'davet',
    aliases: ['dvt'],
    categories : 'info',
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
                .setColor('BLUE')
                .setAuthor(message.author.tag)
                .setTitle("Davet ve Destek Bağlantısı!")
                .addField("**davet linki**", `[buraya tıklayarak davet linkini alabilirsiniz](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
                .addField("**Destek Sunucumuz**", `[destek sunucumuza katılmak için tıklayın](https://discord.gg/SBapMj4HAY)`)
                .setFooter(`tarafından talep edildi ${message.author.tag}`, client.user.displayAvatarURL())
                .setTimestamp()


        )

    }
}