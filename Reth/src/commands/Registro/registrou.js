const { RichEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR");
var { guild, createNewGuildEntry} = require("../../../database.js");

module.exports = (client, message) => {
    guild.findById(message.guild.id, "registradores", (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            message.reply("Usuário não registrado, fale com um registrador.");
            return 1;
        }
        if (guildTable.registradores.length) {
            var registradorID = "";
            var timestamp = 0;
            var registradores = guildTable.registradores;
            for (let u = 0; u < registradores.length; ++u) {
                let memberArr = registradores[u].membrosRegistrados;
                for (let i = 0; i < memberArr.length; ++i) {
                    if (memberArr[i]._id === message.author.id) {
                        registradorID = registradores[u]._id;
                        timestamp = memberArr[i].timestamp;
                        u = registradores.length;
                        break;
                    }
                }
            }
            if (registradorID.length) {
                let embed = new RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setTitle("**Informações:**")
                .addField("**Usuário:**", `${message.author}`, true)
                .addField("**Registrado por:**", `<@${registradorID}>`, true)
                .addField("Data do registro:", `\`\`\`\n${moment(timestamp).format("LL")}\`\`\``, false)
                .addField(":calendar_spiral: **__Conta criada:__**", moment(message.author.createdTimestamp).format("LL"), true)
                .addField(":gear: Dias no Discord:", `${moment().diff(message.author.createdTimestamp, "days")} dias`, true)
                .addField(":calling: Entrou no Server:", moment(message.member.joinedTimestamp).format("LL"), true)
                .addField(":gear: Dias no Servidor:", `${moment().diff(message.member.joinedTimestamp, "days")} dias`, true)
                .setColor("FF2227")
                .setThumbnail(message.author.displayAvatarURL)
                .setFooter(message.guild.name, message.guild.iconURL)
                .setTimestamp();
                message.channel.send(embed);
                return 0;
            }
        }
        message.reply("Usuário não registrado, fale com um registrador.");
    });
};