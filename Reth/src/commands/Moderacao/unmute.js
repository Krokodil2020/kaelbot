const { RichEmbed } = require("discord.js");
const { guild } = require("database.js");

module.exports = (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("Você não tem permissão para utilizar esse comando!");
        return 0;
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES", false, true)) {
        message.reply("Não tenho permissão permissão para remover cargos");
        return 0;
    }
    var muteMember;
    if (message.mentions.members.size > 0) {
        if (/<@!?[\d]{18}>/.test(args[0]) && args[0].length <= 22) {
            muteMember = message.mentions.members.first();
        }
    } else if (/[\d]{18}/.test(args[0]) && args[0].length === 18) {
        muteMember = message.guild.members.get(args[0]);
    }
    if (!muteMember) {
        message.reply("Mencione alguém do servidor ou use o ID");
        return 0;
    }
    let muteRole = muteMember.roles.find(r => r.name === "😡Reth mute🔇");
    if (!muteRole) {
        message.reply("O usuário não está mutado");
        return 0;
    }
    let reason = args.slice(1).join(' ').slice(0, 801);
    if (!reason.length) reason = "Foi desmutado sem colocar o motivo.";
    muteMember.removeRole(muteRole).then(member => {
        if (!client.mutes[message.guild.id]) return;
        if (!client.mutes[message.guild.id][member.id]) return;
        clearTimeout(client.mutes[message.guild.id][member.id].timeoutID);
        delete client.mutes[message.guild.id][member.id];
        if (Object.keys(client.mutes[message.guild.id]).length) return;
        delete client.mutes[message.guild.id];
        guild.findById(message.guild.id, "edit", (err, guildTable) => {
            let channel = message.channel;
            if (guildTable) {
                channel = message.guild.channels.get(guildTable.edit.mute);
                if (!channel) channel = message.channel;
            }
            let embed = new RichEmbed()
            .setAuthor(`Removido por: ${message.author.tag}`, message.author.displayAvatarURL)
            .setDescription(`[${muteMember.user.tag} teve seu mute removido com sucesso!](https://www.google.com)`)
            .addField(`Staff Tag`, message.author.tag, true)
            .addField(`Staff ID`, message.author.id, true)
            .addField(`Discord Tag`, muteMember.user.tag, true)
            .addField(`Discord ID`, muteMember.user.id, true)
            .addField(`:pencil: Motivo:`, reason)
            .setColor("BLACK")
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp();
            channel.send(embed).catch(console.error);
        });
    }).catch(()=>{
        message.reply("Erro ao desmutar membro");
    });
};