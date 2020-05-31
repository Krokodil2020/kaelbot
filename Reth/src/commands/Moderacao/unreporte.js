const { RichEmbed } = require("discord.js");
const { guild, createNewGuildEntry} = require("database.js");

module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) {
        return 0;
    }
    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "MANAGE_ROLES"], false, true)) {
        message.reply("Preciso da permissão `BAN_MEMBERS` e `MANAGE_ROLES` para isso");
        return 0;
    }
    if (args.length < 1) {
        message.reply("Mencione alguém ou use o ID");
        return 0;
    }
    var member;
    if (message.mentions.members.size > 0) {
        if (/<@!?[\d]{18}>/.test(args[0]) && args[0].length <= 22) {
            member = message.mentions.members.first();
        }
    } else if (/[\d]{18}/.test(args[0]) && args[0].length === 18) {
        member = message.guild.members.get(args[0]);
    }
    if (!member) {
        message.reply("Mencione alguém do servidor ou use o ID");
        return 0;
    }
    let reason = args.slice(1).join(' ').slice(0, 201);
    if (!reason.length) {
        message.reply("**Você esqueceu de colocar o motivo**");
        return 0;
    }
    if (checagem(message, member)) return;
    guild.findById(message.guild.id, "usuariosReportados", (err, guildTable) => {
        if (err) {
            console.log(err);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            setTimeout(() => client.commands.reporte(client, message, args), 500);
            return 1;
        }
        let index = -1;
        let users = guildTable.usuariosReportados;
        for (let i = 0; i < users.length; ++i) {
            if (users[i]._id === member.id) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            message.reply("O membro não recebeu advertências");
            return 0;
        }
        let toxico = member.roles.find(r => r.name === "☢ Tóxico ☢");
        let adv2 = member.roles.find(r => r.name === "advertência 2");
        let adv1 = member.roles.find(r => r.name === "advertência 1");
        let roles = [];
        if (toxico) roles.push(toxico.id);
        if (adv2) roles.push(adv2.id);
        if (adv1) roles.push(adv1.id);
        if (roles.length) member.removeRoles(roles).catch(()=>{});
        guildTable.usuariosReportados.splice(index, 1);
        guildTable.save().then(() => {
            let embed = new RichEmbed()
            .setTitle(`Removido por: ${message.author.tag}`)
            .setDescription(`${member.user.username} suas advertências foram removidas.`)
            .addField(`Staff Tag`, message.author.tag, true)
            .addField(`Staff ID`, message.author.id, true)
            .addField(`Discord Tag`, member.user.tag, true)
            .addField(`Discord ID`, member.id, true)
            .addField(`:pencil: Motivo:`, reason)
            .setColor("BLACK")
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp();
            message.channel.send(embed);
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
    });
};

var checagem = (message, member) => {
    if (member.user.bot) {
        message.reply("**Você não pode reportar um bot!**");
        return 1;
    }
    if (member.id === message.guild.ownerID) {
        message.reply("Você não tem permissão para punir este usuário");
        return 1;
    }
    let executorRole = message.member.highestRole;
    let targetRole = member.highestRole;
    if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
        message.reply("Você não pode punir este usuário, seu cargo é menor ou igual a o do usuário a ser punido!");
        return 1;
    }
    let clientRole = message.guild.me.highestRole;
    if (clientRole.comparePositionTo(targetRole) <= 0) {
        message.reply("Não tenho permissão para punir este usúario");
        return 1;
    }
    return 0;
};