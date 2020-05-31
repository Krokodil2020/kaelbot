const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-BR');

module.exports = async (client, message, args) => {
    var guild = message.guild;
    if (args[0]) {
        guild = client.guilds.get(args[0]);
        if (!guild) {
            message.channel.send(`${client.getEmoji("erro404")} Não encontrei o servidor no banco de dados!`);
            return 0;
        }
    }
    if (guild.memberCount >= 250) guild = await guild.fetchMembers();
    let embed = new Discord.RichEmbed()
    .setAuthor(guild.name, guild.iconURL)
    .addField("Dono do Servidor", `<@${guild.owner.id}>`, true)
    .addField("ID do Dono", `\`${guild.owner.id}\``, true)
    .addField(":date: Servidor criado em", `**${moment(guild.createdAt).format("LL")}**`, true)
    .addField(":calendar_spiral:Servidor criado á", `**${moment().diff(guild.createdAt, "days")} Dias**`, true)
    .addField(":globe_with_meridians: ID do servidor", `\`${guild.id}\``, true)
    .addField(`${client.getEmoji("Pais")}    Região`, guild.region, true)
    .addField(":calendar_spiral: Bot adicionado em", `**${moment(guild.me.joinedAt).format("LL")}**`, true)
    .addField(":calendar_spiral: Bot adicionado á", `**${moment().diff(guild.me.joinedAt, "days")} Dias**`, true)
    .addField(`${client.getEmoji("dd")} Total de Membros`, `\`${guild.memberCount}\` membros no servidor`, true)
    .addField("Total de Cargos:", `\`${guild.roles.size}\` roles`, true)
    .addField("Total de Pessoas:", `:busts_in_silhouette: ${guild.members.filter(m => !m.user.bot).size} usuários`, true)
    .addField("Total de Bots:", `${client.getEmoji("33")} ${guild.members.filter(m => m.user.bot).size} bots`, true)
    .addField("Canais de texto:", `${client.getEmoji("canal")} \`${guild.channels.filter(c => c.type === "text").size}\` canais de texto`, true)
    .addField("Canais de Voz:", `${client.getEmoji("voz")} \`${guild.channels.filter(c => c.type === "voice").size}\` canais de voz`, true)
    .setThumbnail(`${guild.iconURL}?size=2048`)
    .setColor("RANDOM");
    message.channel.send(embed);
};