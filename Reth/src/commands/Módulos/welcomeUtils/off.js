const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    if (args[1] === "privado") {
        guildTable.welcome[args[1]] = "";
    } else if ((args[1] === "welcome" || args[1] === "saida")) {
        guildTable.welcome[args[1]]["_id"] = "";
    } else {
        return;
    }
    guildTable.save().then(() => {
        let msg = args[1];
        if (args[1] === "welcome" && args[1] !== "saida") {
            msg = "boas vindas";
        }
        if (args[1] === "privado") {
            msg += "no privado"
        }
        let embed = new RichEmbed()
        .setDescription(`**A mensagem de ${msg} foi desativada com sucesso!**`)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp();
        message.channel.send(embed);
    }).catch(err => {
        console.log(err);
        message.reply("Erro");
    });
};