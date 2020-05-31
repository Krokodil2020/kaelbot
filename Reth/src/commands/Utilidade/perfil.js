const { RichEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = async (client, message) => {
    const status = {
        online: {
            msg: `${client.getEmoji("online")} Online`,
            color: "00C903"
        },
        idle: {
            msg: `${client.getEmoji("ausente")} Ausente`,
            color: "FF9A00"
        },
        dnd: {
            msg: `${client.getEmoji("ocupado")} Não incomodar`,
            color: "FF0000"
        },
        offline: {
            msg: `${client.getEmoji("off")} Desconectado/invisivel`,
            color: "D8D8D8"
        },
    };
    var member = message.guild.member(message.author);
    let pUser = message.mentions.users.first();
    if(pUser) {
        let guilda = await message.guild.fetchMembers();
        member = guilda.members.get(pUser.id);
    } else {
        pUser = message.author;
    }
    let embed = new RichEmbed()
    .setAuthor(pUser.tag, pUser.displayAvatarURL)
    .addField(`Discord Tag`, `**${pUser.tag}**`, true)
    .addField("Status", `**${status[pUser.presence.status].msg}**`, true)
    .addField("Jogando", `\`\`\`md\n# ${pUser.presence.game ? `${pUser.presence.game.name}` : "Nada"}\`\`\``, false)
    .addField(`Discord Name`, `\`\`\`diff\n- ${pUser.username} -\`\`\``, true)
    .addField('ID', `\`\`\`\n${pUser.id}\`\`\``, true)
    .addField(`Apelido dentro do servidor`, member.nickname ? member.nickname : "`Nenhum apelido neste servidor.`", true)
    .addField(`Conta criada em`, `\`${moment(pUser.createdTimestamp).format("LL")}\``, true)
    .addField(`Dias no Discord:`, `Estou á \`${moment().diff(pUser.createdAt, "days")}\` dia (s) no discord`, true)
    .addField(`Dias no servidor:`, `Estou á \`${moment().diff(member.joinedAt, "days")}\` dia (s) no servidor`, true)
    .addField(`Meus Cargos`, member.roles.map(role => role.toString()).join(", "), true)
    .setColor(status[pUser.presence.status].color)
    .setThumbnail(pUser.displayAvatarURL)
    .setFooter(`${message.guild.name} - ${moment().format("LL")}`, message.guild.iconURL);
    message.channel.send(embed);
    return 0;
};