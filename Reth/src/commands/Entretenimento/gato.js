const { RichEmbed } = require('discord.js');

/**
 * Isso aqui ocupa bastante espaço no node_modules, se eu fosse você removeria este comando inútil 
*/
const superagent = require('superagent');

module.exports = async (client, message) => {
    var { body } = await superagent.get(`http://aws.random.cat/meow`);
    var embed = new RichEmbed()
    .setTitle(`Hm... aqui está o gato que você pediu :hearts:`)
    .setImage(body.file)
    .setColor("RANDOM")
    .setFooter(`Comando requisitado por: ${message.author.username}.`, message.author.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
    return 0;
};