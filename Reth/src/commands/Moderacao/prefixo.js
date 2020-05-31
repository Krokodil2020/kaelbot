const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry} = require("database.js");

module.exports = (client, message, args, retry = 0) => {
    if (retry > 1) return 0;
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("Sem permissão para trocar o prefix");
        return;
    }
    if (args.length > 1) {
        message.reply("O novo prefix não pode conter espaço => ` `");
    }
    let newPrefix = args[0];
    if (newPrefix.length > 5) {
        message.reply("Número máximo de caracteres: 5");
        return;
    }
    guild.findById(message.guild.id, "prefix", (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            setTimeout(() => client.commands.prefix(client, message, args, ++retry), 500);
            return 1;
        }
        guildTable.prefix = newPrefix;
        guildTable.save().then(() => {
            let embed = new RichEmbed()
            .setTitle("Prefix configurado!")
            .setDescription(`Novo prefixo: ${newPrefix}`)
            .setColor("FF9900");
            message.channel.send(embed).catch(()=>{});
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
    });
};