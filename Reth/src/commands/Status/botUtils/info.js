const { RichEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = (client, message, getTimeSinceReady) => {
    var uptime = getTimeSinceReady(client, moment())
    var embed = new RichEmbed()
    .setDescription("**Informações do bot**")
    .setThumbnail(client.user.avatarURL)
    .addField("Dono", "<@282504900552949760>", false)
    .addField("Tag bot", client.user.tag, true)
    .addField("ID bot", client.user.id, true)
    .addField("Criado", moment(client.user.createdTimestamp).format("LL"), true)
    .addField("Dias:", `${moment().diff(client.user.createdTimestamp, "days")} dias`, true)
    .addField(`${client.getEmoji("uptime")} Uptime`, `\`${uptime}\``, false)
    .setColor("15F153");
    message.channel.send(embed);
};