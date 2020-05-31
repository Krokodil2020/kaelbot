const { RichEmbed } = require("discord.js");
const moment = require ("moment");
moment.locale("pt-BR");

module.exports = async (client, message) => {
    var member = message.guild.member(message.author);
    let pUser = message.mentions.users.first();
    if(pUser) {
        let guilda = await message.guild.fetchMembers();
        member = guilda.members.get(pUser.id);
    } else {
        pUser = message.author;
    }
    let embed = new RichEmbed()
    .setAuthor(pUser.username, pUser.displayAvatarURL)
    .setDescription("**• Informações:**")
    .addField(`${client.getEmoji("hypesquad")}__Nome:__`, `\`\`\`\n${pUser.username}\`\`\``, true)
    .addField(`${client.getEmoji("hu")}ID`, `\`\`\`\n${pUser.id}\`\`\``, true)
    .addField(`:date:__Conta criada__`, `\`\`\`\n${moment(pUser.createdTimestamp).format("LL")}\`\`\``)
    .addField(`:gear:Dias no Discord:`, `\`\`\`\n${moment().diff(pUser.createdAt, "days")} dias\`\`\``)
    .addField(`:calling:Entrou no Server :inbox_tray:`, `\`\`\`\n${moment(member.joinedAt).format("LL")}\`\`\``)
    .addField(`:gear:Dias no servidor`, `\`\`\`\n${moment().diff(member.joinedAt, "days")} Dias\`\`\``)
    .setColor("3498DB")
    .setThumbnail(pUser.displayAvatarURL)
    .setFooter(`${message.guild.name} - ${moment().format("LL")}`, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
    return 0;
};