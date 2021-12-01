const { Client, Message, MessageEmbed, Collection , Intents } = require("discord.js");
const fs = require("fs");
const config = require("./config/config.json");

const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    disableEveryone: true,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents : Intents.ALL
});
module.exports = config;
const prefix = config.prefix;
client.prefix = prefix;
client.config = config;
const token = config.token;
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async (message) => {
    const { escapeRegex } = require("./handlers/function");
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) {
        if (matchedPrefix.includes(client.user.id)) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setFooter("Amortis#1111 & ♰Chaos#0001 Tarafından Tasarlanmıştır.")
                    .setAuthor(message.author.tag)
                    .setTitle(`Hugh? ping mi aldım? sana biraz yardım edeyim`)
                    .setDescription(
                        `<@${message.author.id}>Tüm Komutlar türünü görmek için: \`${prefix}help\``
                    )
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            );
        }
    }
});


client.on("ready", async () => {
    console.log("Bot Başarıyla Ses Kanalına Bağlandı")
    let botVoiceChannel = client.channels.cache.get("886434059675385947");
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
  });


client.login(token)
