var { guild, createNewGuildEntry} = require("database.js");

module.exports = (client, message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    guild.findById(message.guild.id, "eventlog", (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            message.reply("Use o comando novamente");
            return 1;
        }
        if (args.length < 1) {
            client.eventlogUtils.default(client, message, args, prefix, guildTable.eventlog);
            return 0;
        }
        var cmd = client.eventlogUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, guildTable); 
        } else {
            client.eventlogUtils.typo(message, prefix);
        }
    });
    return 0;
};