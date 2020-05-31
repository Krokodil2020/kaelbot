const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry } = require("database.js");
var moment = require("moment");

module.exports = (client, message) => {
    if (!message.guild) return;
    var now = moment();
    guild.findById(message.guild.id, "eventlog", async (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            return 0;
        }
        if (!guildTable.eventlog.delet) return 0;
        let channel = message.guild.channels.get(guildTable.eventlog._id);
        if (!channel) return 0;
        let guild = message.guild;
        let auditLogs = await guild.fetchAuditLogs({limit: 1, type: "MESSAGE_DELETE"});
        var executor = message.author;
        auditLogs.entries.forEach(entry => {
            if (moment(now).diff(entry.createdTimestamp, "ms") < 750) {
                executor = entry.executor;
            }
        });
        let msg = message.content.replace(/`/g, "")
        if (msg.length + "```\n```".length > 1024) return 0;
        let embed = new RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle("Mensagem | Apagada")
        .addField("Mensagem deletada:",
        `\`\`\`\n${msg}\`\`\``)
        .addField(`Mensagem enviada por:`, message.author)
        .addField(`Canal:`, `${message.channel}`)
        .addField(`Deletada por:`, executor)
        .setColor("BLACK")
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp();
        channel.send(embed).catch(()=>{});
    });
};