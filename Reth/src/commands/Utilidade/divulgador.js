const { RichEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");
module.exports = async (client, message) => {
    var user = message.mentions.users.first();
    if (!user) user = message.author;
    var targetInvites = await message.guild.fetchInvites();
    var invitesUses = 0;
    var text = "";
    for (let invite of targetInvites.values()) {
        if (invite.inviter.id === user.id) {
            invitesUses += invite.uses;
            text += `**Convite Criado: ${moment(invite.createdAt).format("LL")}**\n`;
            text += `**${invite.url} Uso: ${invite.uses}**\n`;
        }
    }
    // \u200B caractere 'branco'
    text += `\u200B\n**Servidor: ${message.guild.name}**`;
    let embed = new RichEmbed()
    .setAuthor(user.username, user.displayAvatarURL)
    .setTitle(`Informações do divulgador: ${user.username}`)
    .addField("• Convites •", text)
    .addField("• Membros Recrutados •", `────> ${invitesUses} <────`)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
};