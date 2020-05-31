const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry } = require("database.js");

module.exports = (client, unbanGuild, user) => {
    guild.findById(unbanGuild.id, "eventlog", async (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(unbanGuild.id);
            return 0;
        }
        if (!guildTable.eventlog.unban) return 0;
        let channel = unbanGuild.channels.get(guildTable.eventlog._id);
        if (!channel) return 0;
        let embed = new RichEmbed()
        .setAuthor(user.username, user.displayAvatarURL)
        .setTitle("Ban | Removido")
        .addField("Usuário:", user)
        .addField("Tag:", user.tag)
        .setColor("05A206")
        .setThumbnail(user.displayAvatarURL)
        .setFooter(`ID: ${user.id}`, unbanGuild.iconURL)
        .setTimestamp();
        channel.send(embed).catch(()=>{});
    });
};