const { RichEmbed } = require("discord.js");

module.exports = (message, prefix) => {
    let embed = new RichEmbed()
    .setTitle("**Você digitou alguma coisa errada**")
    .setDescription(`digite: ${prefix}contador`)
    .setColor("00D8D8")
    .setFooter("Natsu", client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed).catch(()=>{});
};