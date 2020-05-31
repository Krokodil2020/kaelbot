const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry } = require("database.js");

module.exports = (client, banGuild, user) => {
    guild.findById(banGuild.id, "eventlog", async (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(banGuild.id);
            return 0;
        }
        if (!guildTable.eventlog.ban) return 0;
        let channel = banGuild.channels.get(guildTable.eventlog._id);
        if (!channel) return 0;
        let embed = new RichEmbed()
        .setAuthor(user.username, user.displayAvatarURL)
        .setTitle("Ban | Banido")
        .addField("Usuário:", user, true)
        .addField("Tag:", user.tag, true)
        .setColor("C50404")
        .setThumbnail(user.displayAvatarURL)
        .setFooter(`ID: ${user.id}`, banGuild.iconURL)
        .setTimestamp();
        channel.send(embed).catch(()=>{});
    });
};