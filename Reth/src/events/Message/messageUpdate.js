const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry } = require("database.js");

module.exports = (client, oldMessage, newMessage) => {
    if (!newMessage.guild) return;
    guild.findById(newMessage.guild.id, "eventlog", (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(newMessage.guild.id);
            return 0;
        }
        if (!guildTable.eventlog.edit) return 0;
        if ((oldMessage === newMessage) || (oldMessage.content === "" || newMessage.content === "")) return 0;
        let channel = newMessage.guild.channels.get(guildTable.eventlog._id);
        if (!channel) return 0;
        let author = newMessage.author;
        let oldContent = oldMessage.content.replace(/`/g, "");
        let newContent = newMessage.content.replace(/`/g, "");
        if (oldContent.length + "```\n```".length > 1024) return 0;
        if (newContent.length + "```\n```".length > 1024) return 0;
        let embed = new RichEmbed()
        .setTitle("**Acão | Mensagem Editada**")
        .setDescription(`${author} editou sua mensagem.`)
        .addField("Mensagem antiga:", `\`\`\`\n${oldContent}\`\`\``)
        .addField("Mensagem nova:", `\`\`\`\n${newContent}\`\`\``)
        .addField("Canal:", `${newMessage.channel}`)
        .setColor("100C86")
        .setFooter(`ID: ${author.id}`, author.displayAvatarURL)
        .setTimestamp();
        channel.send(embed).catch(()=>{});
    });
};