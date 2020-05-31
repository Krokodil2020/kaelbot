const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, guildTable) => {
    if (args[1] === "off" || args[1] === "on") {
        guildTable.config.filtroBots = args[1] === "on";
        guildTable.save().then(() => {
            let embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`**Filtro de bots foi ${args[1] === "on" ? "ativado" : "desativado"}!**`)
            .setColor("4959E9")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
            message.channel.send(embed);
        }).catch(console.error);
    }
};