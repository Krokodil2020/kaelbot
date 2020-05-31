const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, prefix, edit) => {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`Olá **${message.author.username}**, Bem Vindo ao painel de configurações do bot.`)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    let muteEdit = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}edit canal mute #mute\`\`\``;
    if (edit.mute.length) {
        muteEdit = `${client.getEmoji("oni")} Ativo | Canal: <#${edit.mute}>, ${prefix}edit mute off`;
    }
    embed.addField("mute | Define o canal onde a mensagem de mute é enviada:", muteEdit);
    let reportEdit = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}edit canal reporte #reporte\`\`\``;
    if (edit.reporte.length) {
        reportEdit = `${client.getEmoji("oni")} Ativo | Canal: <#${edit.reporte}>, ${prefix}edit reporte off`;
    }
    embed.addField("reporte  | Define o canal onde a mensagem de reporte é enviada:", reportEdit);
    let banEdit = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}edit canal ban #ban\`\`\``;
    if (edit.ban.length) {
        banEdit = `${client.getEmoji("oni")} Ativo | Canal: <#${edit.ban}>, ${prefix}edit ban off`;
    }
    embed.addField("ban | Define o canal onde a mensagem de ban é enviada:", banEdit);
    message.channel.send(embed).catch(()=>{});
};