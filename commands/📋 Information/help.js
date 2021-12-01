const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
let prefix = config.prefix

module.exports = {
  name: 'help',
  aliases: ['k'],
  categories : 'info',
  description: 'Mevcut tüm bot komutlarını gösterir',
  useage: 'help',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, user) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Komut adı yok.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Devam etmekte." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("YardımMenüsü 🔰 Komutlar")
        .addField('Önek Bilgileri', `Önek: \`${prefix}\`\nAyrıca bahsedebilirsin ${client.user} önek bilgisi almak için.`, false)
        .addField("• Developer", `\`\`\`yml\nName: ♰Chaos#0001 [723985208545902725]\nName Ξ Amortis#1111 [830208147544342548]\`\`\``)
        .addField("• Önemli Bağlantılar", `**[Davet Linki](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Destek Sunucusu](https://discord.gg/KRX2tgNA7R)\`|\`[Youtube](https://www.youtube.com/channel/UCyAgNgnrgCYDDbq-z4TBrYQ/)\`**`)
        .addFields(categories)
        .setDescription(
          `Kullanım: \`${prefix}komutlar\` ardından bir komut hakkında daha fazla ek bilgi almak için bir komut adı. Örneğin: \`${prefix}komutlar davet\`.`
        )
        .setFooter(`Komut açıklamalarını ve bilgilerini görmek için şunu yazın: ${config.prefix}komutlar [CMD NAME]`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("PURPLE")
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Kullanım: \`${prefix}komutlar\` tüm komutlarım için!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Komutların Detayları:")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("Önek:", `\`${prefix}\``)
        .addField(
          "Komut:",
          command.name ? `\`${command.name}\`` : "Bu komut için isim yok."
        )
        .addField(
          "takma adlar:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Bu komut için takma ad yok."
        )
        .addField(
          "KULLANIM:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "TANIM:",
          command.description
            ? command.description
            : "Bu komut için açıklama yok."
        )
        .setFooter(
          `tarafından talep edildi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  }
}