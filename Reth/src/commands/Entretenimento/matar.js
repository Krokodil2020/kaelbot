const { RichEmbed } = require("discord.js");

var imageArr = [
    "https://data.whicdn.com/images/232960922/original.gif",
    "https://25.media.tumblr.com/61dacc6fa9fc1aaabb5224ed8341e760/tumblr_mt8tygAVwT1sayl13o1_500.gif",
    "https://78.media.tumblr.com/d0bb21ba12720d57a19b127ea2c84856/tumblr_n90q272eto1sijhkdo1_500.gif",
    "https://i.gifer.com/W9e.gif"
];

module.exports = (client, message, args) => {
    if (args.length < 1) {
        return message.channel.send(setEmbed(client, message));
    }
    let target = message.mentions.users.first();
    if (!target) return;
    message.channel.send(setEmbed(client, message, target));
};

/**
 * Facilita a construção da embed
 * @param {Object} target O individuo marcado]
*/
var setEmbed = (client, message, target = 0) => {
    let embed = new RichEmbed()
    .setColor("RANDOM")
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp();
    if (target === 0) {
        embed.setTitle(`${message.author.username} Se revoltou com a vida e se matou...! (estranho)`)
        .setImage("https://cdn.discordapp.com/attachments/464163079467302913/464163170957656074/giphy.gif");
    } else if (target.id === message.author.id) {
        embed.setTitle(`${message.author.username} se matou ...! ${client.getEmoji("naonao")}(WTF)`)
        .setImage("https://cdn.discordapp.com/attachments/464163079467302913/464163160979668992/8fe67432df27392e690ee7c8c373f170afe3e0d1_hq.jpg");
    } else {
        embed.setTitle(`${message.author.username} Matou ${target.username} ${client.getEmoji("cafazin")}`)
        .setImage(imageArr[Math.floor(Math.random() * imageArr.length)]);
    }
    return embed;
};