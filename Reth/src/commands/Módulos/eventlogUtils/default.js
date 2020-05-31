const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, prefix, eventlog) => {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`Olá **${message.author.username}**, Bem Vindo ao painel de configurações do modlog.`)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    let canalTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}eventlog canal #monitoramento\`\`\``;
    if (eventlog._id.length) {
        canalTexto = `${client.getEmoji("oni")} Ativo | Canal: <#${eventlog._id}>, ${prefix}eventlog channel off`;
    }
    embed.addField("Eventlog | Define o canal do modlog:", canalTexto);
    let deletTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}eventlog delet on\`\`\``;
    if (eventlog.delet) {
        deletTexto = `${client.getEmoji("oni")} Ativo | ${prefix}eventlog delet off`;
    }
    embed.addField("Delet | Mostra o evento de mensagem deletada:", deletTexto);
    let editTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}eventlog edit on\`\`\``;
    if (eventlog.edit) {
        editTexto = `${client.getEmoji("oni")} Ativo | ${prefix}eventlog edit off`;
    }
    embed.addField("Edit | Mostra o evento de mensagem editada:", editTexto);
    let banTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}eventlog ban on\`\`\``;
    if (eventlog.edit) {
        banTexto = `${client.getEmoji("oni")} Ativo | ${prefix}eventlog ban off`;
    }
    embed.addField("Ban | Mostra o evento de membros banidos:", banTexto);
    let unbanTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**` + `\`\`\`\n${prefix}eventlog unban on\`\`\``;
    if (eventlog.edit) {
        unbanTexto = `${client.getEmoji("oni")} Ativo | ${prefix}eventlog unban off`;
    }
    embed.addField("Ban | Mostra o evento de membros banidos:", unbanTexto);
    message.channel.send(embed).catch(()=>{});
};