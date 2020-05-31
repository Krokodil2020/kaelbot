const { RichEmbed } = require("discord.js");
const os = require("os");

module.exports = (client, message) => {
    // Em GB
    var usedMemory = (os.totalmem() - os.freemem()) / 1000000000;
    let embed = new RichEmbed()
    .setDescription(`**${client.getEmoji("pingwifi")} Memoria em uso é de: [${usedMemory.toFixed(2)} GB](https://www.google.com)**`)
    .setColor("3498DB");
    message.channel.send(embed);
};