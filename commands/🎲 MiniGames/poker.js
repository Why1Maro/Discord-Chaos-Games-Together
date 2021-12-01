const { Client, Message, MessageEmbed, Invite } = require('discord.js');
const fetch = require('node-fetch')
const config = require('../../config/config.json')

module.exports = {
    name: 'poker',
    aliases: ['poker-night'],
    categories : 'minigames',
    description: 'Discord Ses Kanalında Poker Oynayın',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("Bu komutu kullanmak için bir ses kanalına bağlı olmanız gerekir.")
                .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755827207812677713",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new MessageEmbed()
                    .setDescription("Bir oturumu başlatamadım.")
                    .setColor("#ff0000")
            )
            message.channel.send(`Oturumu Başlatmak için Bu Bağlantıyı Tıklayın\nhttps://discord.com/invite/${invite.code}`)
        })
    }
}