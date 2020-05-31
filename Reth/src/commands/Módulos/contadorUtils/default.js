const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, prefix, contador) => {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`Olá **${message.author.username}**, Bem Vindo ao painel de configurações do contador de membros.`)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL || "")
    .setTimestamp();
    if (contador.status) {
        embed.addField("Canal | Define o canal do contador:", `${client.getEmoji("oni")} Ativo | Canal: <#${contador._id}>, ${prefix}contador off`, false);
    } else {
        embed.addField("Canal | Define o canal do contador:", `${client.getEmoji("offi")} Desativado | Exemplo:\n` +
        `\`\`\`\n${prefix}contador canal #chat-geral\`\`\``, false);
    }
    let txt = contador.text.length ?
    `${client.getEmoji("oni")} Ativo | Texto: **${contador.text.length > 800 ? `${contador.text.slice(0, 801)}[...]` : contador.text}**` :
    `${client.getEmoji("offi")} | Exemplo:`;
    embed.addField("Texto | Define o texto do contador:", `${txt}\n` + `\`\`\`\n${prefix}contador texto <texto>\`\`\``);
    let curr = contador.format;
    if (curr === "0") {
        curr = "01";
    } else if (curr === "B") {
        curr = "2B";
    } else if (curr === "SS") {
        curr = "3SS";
    } else {
        curr = "4N";
    }
    embed.addField(`Número | ${client.getEmoji("01")}`, client.getEmoji("fundo"), true)
    .addField(`Número | ${client.getEmoji("2B")}`, client.getEmoji("fundo"), true)
    .addField(`Número | ${client.getEmoji("3SS")}`, client.getEmoji("fundo"), true)
    .addField(`Especial de Natal: ${client.getEmoji("4N")}`, "```\nr!contador cor natal```")
    .addField(`Tipo atual: ${client.getEmoji(curr)}`, `${prefix}contador cor <número>`);
    message.channel.send(embed).catch(()=>{});
};