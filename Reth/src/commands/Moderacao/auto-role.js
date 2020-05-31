module.exports = (client, message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        return message.reply("**Você não possui permissões para utilizar esse comando!**").catch(()=>{});
    }
    const { guild } = require("database.js");
    guild.findById(message.guild.id, "config")
        .then(guildTable => {
            if (!guildTable) {
                guildTable = new guild({ _id: message.guild.id });
            }
            if (!args.length) {
                return noArgs(message, prefix, guildTable);
            }
            var role = message.mentions.roles.first();
            if (!role) {
                return message.reply("Cargo inválido").catch(()=>{});
            }
            guildTable.config.novato = role.id;
            guildTable.save()
                .then(() => {
                    const { RichEmbed } = require("discord.js");
                    let embed = new RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setDescription(`Cargo de auto-role (${role}) definido <:yes:529635602283626516>`)
                    .setColor("f781c6")
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setTimestamp();
                    message.channel.send(embed).catch(()=>{});
                })
                .catch(console.error);
        })
        .catch(console.error)
};

var noArgs = (message, prefix, guildTable) => {
    const { RichEmbed } = require("discord.js");
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(
        `Cargo de auto-role atual: ${guildTable.config.novato ? `<@&${guildTable.config.novato}>` : `não definido <:noswift:529635602292015134>`}\n` +
        `Use \`${prefix}auto-role cargo\` para mudar`
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/533388024889868288.png?v=1")
    .setColor("f781c6")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
};
