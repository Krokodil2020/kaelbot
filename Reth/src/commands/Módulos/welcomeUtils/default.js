const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, prefix, welcome) => {
    let embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`Olá ${message.author.username}, Bem Vindo ao painel de configurações do bot.`)
    .setColor("4959E9")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    let canalWelcome = `${client.getEmoji("offi")} Desativado | **Exemplo:**\n` + `\`\`\`\n${prefix}welcome canal welcome #bem-vindo\`\`\``;
    if (message.guild.channels.get(welcome.welcome._id)) {
       canalWelcome = `${client.getEmoji("oni")} Ativo | Canal: <#${welcome.welcome._id}>, ${prefix}welcome off welcome`;
    }
    embed.addField("Welcome | Canal de boas-vindas do Servidor:", canalWelcome);
    let welcomeTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**\n` +
    `\`\`\`\n${prefix}welcome bem-vindo \${USER} Bem vindo ao servidor \${SERVER}\`\`\``;
    if (welcome.welcome.text.length) {
        let txt = welcome.welcome.text.length > 800 ? `${welcome.welcome.text.slice(0, 801)}[...]`: welcome.welcome.text;
        welcomeTexto = `${client.getEmoji("oni")} Ativo | ${prefix}welcome bem-vindo <texto>\nMensagem: ${txt}`;
    }
    embed.addField("Mensagem do Boas-Vindas:", welcomeTexto);
    let canalSaida = `${client.getEmoji("offi")} Desativado | **Exemplo:**\n` + `\`\`\`\n${prefix}welcome canal saida #canal-saida\`\`\``;
    if (message.guild.channels.get(welcome.saida._id)) {
        canalSaida = `${client.getEmoji("oni")} Ativo | Canal: <#${welcome.saida._id}>, ${prefix}welcome off saida`;
    }
    embed.addField("Saída | Canal de despedida do Servidor:", canalSaida);
    let saidaTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**\n` + `\`\`\`\n${prefix}welcome saida \${USER} saiu do servidor\`\`\``
    if (welcome.saida.text.length) {
        let txt = welcome.saida.text.length > 800 ? `${welcome.saida.text.slice(0, 801)}[...]`: welcome.saida.text;
        saidaTexto = `${client.getEmoji("oni")} Ativo | ${prefix}welcome saida <texto>\nMensagem: ${txt}`;
    }
    embed.addField("Mensagem de Despedida:", saidaTexto);
    let privadoTexto = `${client.getEmoji("offi")} Desativado | **Exemplo:**\n` + `\`\`\`\n${prefix}welcome privado <Seu texto>\`\`\``;
    if (welcome.privado.length) {
        let txt = welcome.privado.text.length > 800 ? `${welcome.privado.text.slice(0, 801)}[...]`: welcome.privado.text;
        privadoTexto = `${client.getEmoji("oni")} Ativo | ${prefix}welcome off privado\nMensagem: ${txt}`;
    }
    embed.addField("Privado | Mensagem de boas-vindas no Privado:", privadoTexto);
    message.channel.send(embed).catch(()=>{});
};