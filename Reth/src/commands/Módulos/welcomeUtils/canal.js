const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, guildTable) => {
    if (args.length < 3) {
        return 0;
    }
    if (args[1] !== "welcome" && args[1] !== "saida") {
        return 0;
    }
    let mentionTest = /<#[0-9]{18}>/.test(args[2]) && args[2].length === 21;
    let idTest = /[0-9]{18}/.test(args[2]) && args[2].length === 18;
    if (!mentionTest && !idTest) {
        message.reply("Canal inválido!");
        return 0;
    }
    let canalID = args[2].slice(args[2].length - 19, args[2].length - 1);
    let canal = message.guild.channels.get(canalID);
    if (!canal) {
        message.reply("Canal inválido!");
        return 0;
    }
    guildTable.welcome[args[1]]["_id"] = canal.id;
    guildTable.save().then(() => {
        let embed = new RichEmbed()
        .addField("Welcome",
        `Você definiu o canal ${canal}, para mensagens de ${args[1] === "welcome" ? "boas vindas" : "despedida"} do servidor!`)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp();
        message.channel.send(embed);
    }).catch(error => {
        console.log(error);
        message.reply(`Erro`);
    });
};