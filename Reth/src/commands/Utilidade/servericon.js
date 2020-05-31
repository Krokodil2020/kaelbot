const { RichEmbed } = require("discord.js");

module.exports = (client, message) => {
    // Sim, da loritta mesmo
    let url = message.guild.iconURL || "https://loritta.website/assets/img/unknown.png";
    let embed = new RichEmbed()
    .setTitle(message.guild.name)
    .setDescription(`Servidor: ${message.guild.name} ${message.guild.iconURL ? `: **[download](${message.guild.iconURL}?size=2048)**` : ""}`)
    .setColor("4959E9")
    .setImage(`${url}${message.guild.iconURL ? "?size=2048" : ""}`)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
};