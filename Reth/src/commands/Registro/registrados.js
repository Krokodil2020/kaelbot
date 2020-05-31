const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry} = require("../../../database.js");

module.exports = (client, message) => {
    guild.findById(message.guild.id, "registradores", async (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        let obj = {
            m: 0,
            f: 0,
            memberCount: message.guild.memberCount
        };
        if (guildTable) {
            guildTable.registradores.forEach(registrador => {
                registrador.membrosRegistrados.forEach(membro => {
                    if (membro.genero === "M") ++obj.m;
                    if (membro.genero === "F") ++obj.f;
                });
            });
        } else {
            createNewGuildEntry(message.guild.id);
        }
        let embed = new RichEmbed()
        .setTitle(":clipboard: Registros do servidor:")
        .setDescription(`Masculino: ${obj.m}\nFeminino: ${obj.f}\n\n` +
        `Total de usuários registrados: ${obj.m + obj.f}\n` +
        `Total de usuários sem registros: ${obj.memberCount - (obj.m + obj.f)}`)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp();
        message.channel.send(embed);
    });
};