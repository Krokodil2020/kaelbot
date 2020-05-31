const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
    let target = message.mentions.users.first() || message.author;   
    let embed = new RichEmbed()
    .setColor("36393F")
    .setTitle(`**${target.username}**`)
    .setDescription(`**Nick: ${target.username} : [download](${target.displayAvatarURL})**`)
    .setColor("4959E9")
    .setImage(target.displayAvatarURL)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    message.channel.send(embed);
};