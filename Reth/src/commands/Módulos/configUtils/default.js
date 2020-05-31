const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, prefix, config) => {
    let msgFiltroInvites = config.filtroInvites ?
    `${client.getEmoji("oni")} Ativo | Use: ${prefix}config filtro off` :
    `${client.getEmoji("offi")} Desativado | Use: ${prefix}config filtro on`;
    let msgFiltroBots = config.filtroBots ?
    `${client.getEmoji("oni")} Ativo | Use: ${prefix}config bot off` :
    `${client.getEmoji("offi")} Desativado | Use: ${prefix}config bot on`;
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displatAvatarURL)
    .setDescription(`Olá **${message.author.username}**, este e o painel de configurações do bot em seu servidor.` + 
        `Aqui você pode conferir todas as configurações dentro do servidor em cada comando disponível.`)
    .addField("Filtro de Convites:", msgFiltroInvites, false)
    .addField("Filtro de Bots:", msgFiltroBots, false)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    if (message.guild.roles.get(config.masculino)) {
        embed.addField("Masculino", `${client.getEmoji("oni")} Ativo | Cargo masculino: <@&${config.masculino}>`, true);
    } else {
        embed.addField("Masculino", `${client.getEmoji("offi")} Desativado | Use: ${prefix}config masculino`, true);
    }
    if (message.guild.roles.get(config.feminino)) {
        embed.addField("Feminino", `${client.getEmoji("oni")} Ativo | Cargo feminino: <@&${config.feminino}>`, true);
    } else {
        embed.addField("Feminino", `${client.getEmoji("offi")} Desativado | Use: ${prefix}config feminino`, true);
    }
    if (message.guild.roles.get(config.novato)) {
        embed.addField("Novato", `${client.getEmoji("oni")} Ativo | Cargo novato: <@&${config.novato}>`);
    } else {
        embed.addField("Novato", `${client.getEmoji("offi")} Desativado | Use: ${prefix}config novato`);
    }
    message.channel.send(embed).catch(()=>{});
};