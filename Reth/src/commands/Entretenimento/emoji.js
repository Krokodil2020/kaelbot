const { RichEmbed } = require("discord.js");

module.exports = async (client, message, args, prefix) => {
    if (args.length < 1) {
        return message.channel.send(setEmbed(client, message));
    }
    let length = args[0].length;

    // Emoji generico
    // <a:nome:123456789987654321>
    // <:nome:123456789987654321>
    // Em ambos o ID termina no `length - 1` e comeca no `length - 19`
    let emojiID = args[0].slice(length - 19, length - 1);

    let emoji = message.guild.emojis.get(emojiID);
    if (!emoji) {
        return message.channel.send(setEmbed(client, message, prefix));
    }
    let embed = new RichEmbed()
    .setTitle(`ID = \`${emoji.id}\``)
    .setImage(emoji.url)
    .setTimestamp();
    message.channel.send(embed);
};

/**
 * Função para fazer a embed caso um emoji não seja especificado
*/
var setEmbed = (client, message, prefix) => {
    let url = message.author.avatarURL || message.author.defaultAvatarURL;
    let embed = new RichEmbed()
    .setAuthor(message.author.tag, url)
    .setTitle(`Modo de uso: ${client.getEmoji("igorpicapica")}`)
    .addField(`Exemplo de como usar o comando`, `${prefix}emoji ${client.getEmoji("pipoca")}`)
    .setFooter(`Comando executado por: ${message.author.username}`)
    .setThumbnail("https://cdn.discordapp.com/emojis/502972742631424002.gif")
    .setColor("BLACK")
    .setTimestamp();
    return embed;
};