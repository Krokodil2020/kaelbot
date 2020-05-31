const { RichEmbed } = require("discord.js");
const os = require("os");
const moment = require("moment");
moment.locale("pt-BR");

module.exports = (client, message, getTimeSinceReady) => {
    var uptime = getTimeSinceReady(client, moment());
    var emojis = [
        client.getEmoji("suporte3CLARO"),
        client.getEmoji("suporte"),
        client.getEmoji("suporte2")
    ];
    var emoji = emojis[Math.floor(Math.random() * emojis.length)];
    var text = 0, voice = 0;
    let channels = client.channels
    for (var channel of channels.values()) {
        if (channel.type === "text") ++text;
        else if (channel.type === "voice") ++voice
    }
    // Em GB
    var usedMemory = (os.totalmem() - os.freemem()) / 1000000000;
    var embed = new RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`**• Olá, está com duvidas? ${emoji}[Servidor de Suporte!](https://www.google.com)**`)
    .addField(`${client.getEmoji("uptime")}Uptime`, `\`${uptime}\``)
    .addField(`${client.getEmoji("AAAA")} Servidores Conectados`, `\`\`\`js\n${client.guilds.size}\`\`\``)
    .addField(`${client.getEmoji("text123")} Canais de texto`, `\`\`\`js\n${text}\`\`\`` , true)
    .addField(`${client.getEmoji("voice123")} Canais de voz`, `\`\`\`js\n${voice}\`\`\``, true)
    .addField(":busts_in_silhouette: Usuários", `\`\`\`md\n# ${client.users.size}\`\`\`` , true)
    .addField(`${client.getEmoji("pingwifi")} Ping`, `\`\`\`js\n${Math.round(client.ping)}\`\`\``, true)
    .addField(`${client.getEmoji("memoria3")} Memoria`, `\`\`\`js\n${usedMemory.toFixed(2)} GB\`\`\``, true)
    .addField(`**${client.getEmoji("Pais")} Região:**`, "```md\n#brazil```", true)
    .addField(client.getEmoji("fundo"),
        `**${client.getEmoji("download")}[adicione-me em seu servidor](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2080374975)**`, true)
    .addField(client.getEmoji("fundo"),
        `**${client.getEmoji("dollarhihi")}[contribua para o bot](https://www.google.com)**`, true)
    .setColor("3498DB")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
};