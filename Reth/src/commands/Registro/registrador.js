const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry} = require("../../../database.js");

module.exports = (client, message, args, prefix, retry = 0) => {
    if (retry > 1) return 0;
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("O comando está disponível apenas para usuários STAFF.");
        return 0;
    }
    guild.findById(message.guild.id, "registradores", async (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            setTimeout(() => client.commands.registrador(client, message, args, prefix, ++retry), 500);
            return 1;
        }
        let msg = await message.channel.send(`${client.getEmoji("lag")} Procurando registros...`).catch(()=>{});
        let m = 0;
        let f = 0;
        if (guildTable.registradores.length) {
            let index = guildTable.registradores.findIndex(r => r._id === message.author.id);
            if (index >= 0) {
                guildTable.registradores[index].membrosRegistrados.forEach(member => {
                    if (member.genero === "M") ++m;
                    if (member.genero === "F") ++f;
                });
            }
        }
        let embed = new RichEmbed()
        .setAuthor(`Registrador: ${message.author.username}`, message.author.displayAvatarURL)
        .setTitle("**Informações:**")
        .addField(`**${client.getEmoji("homi")} __Masculino__**`, `\`\`\`js\nRegistrou: ${m}\`\`\``)
        .addField(`**${client.getEmoji("muie")} __Feminino__**`, `\`\`\`js\nRegistrou: ${f}\`\`\``)
        .addField(`${client.getEmoji("sexy")} Registrou um:`, `\`\`\`js\nTotal de: ${f + m}\`\`\``)
        .setColor("FF2227");
        msg.edit(embed).catch(()=>{});
    });
};