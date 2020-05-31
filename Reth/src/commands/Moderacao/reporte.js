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
    let toxico = message.guild.roles.find(r => r.name === "☢ Tóxico ☢");
    let adv2 = message.guild.roles.find(r => r.name === "advertência 2");
    let adv1 = message.guild.roles.find(r => r.name === "advertência 1");
    if (!toxico) toxico = await message.guild.createRole({ name: "☢ Tóxico ☢"}).catch(()=>{});
    if (!adv2) adv2 = await message.guild.createRole({ name: "advertência 2"}).catch(()=>{});
    if (!adv1) adv1 = await message.guild.createRole({ name: "advertência 1"}).catch(()=>{});
    guild.findById(message.guild.id, "edit usuariosReportados", (err, guildTable) => {
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
        let advNumber = 1;
        let userEntry;
        if (index < 0) {
            userEntry = {
                _id: member.id,
                primeira: {
                    _id: message.author.id,
                    text: reason
                },
                segunda: {}
            };
            index = users.length;
            let roles = [];
            roles.push(toxico);
            roles.push(adv1);
            addRoles(member, roles);
        } else {
            userEntry = users[index];
            if (userEntry.segunda._id) {
                advNumber = 3;
            } else if (userEntry.primeira._id) {
                userEntry.segunda = {
                    _id: message.author.id,
                    text: reason
                };
                advNumber = 2;
                roles.push(toxico);
                roles.push(adv1);
                roles.push(adv2);
                addRoles(member, roles);
            }
        }
        let embed;
        let embedDM;
        if (advNumber === 3) {
            let report = guildTable.usuariosReportados[index];
            embed = new RichEmbed()
            .setTitle(`${client.getEmoji("negado")} Membro banido`)
            .addField("**Usuário banido**", member, true)
            .addField("**Quem baniu:**", message.author,true)
            .addField("**Advertência 1**", `<@${report.primeira._id}> : ${report.primeira.text}`)
            .addField("**Advertência 2**", `<@${report.segunda._id}> : ${report.segunda.text}`)
            .addField("**Advertência 3**", `${message.author} : ${reason}`)
            .setColor("BLACK")
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter(message.guild.name, message.guild.iconURL);
            embedDM = new RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTitle(`:do_not_litter: Você foi banido por receber três advertências no servidor ${message.guild.name} ${client.getEmoji("negado")}`)
            .addField(`${client.getEmoji("suicidu")} Advertência dada por:`, message.author.tag)
            .addField(`:pencil: Motivo 1:`, `<@${report.primeira._id}> : ${report.primeira.text}`)
            .addField(`:pencil: Motivo 2:`, `<@${report.segunda._id}> : ${report.segunda.text}`)
            .addField(`:pencil: Motivo 3:`, `${message.author} : reason`)
            .setColor("BLACK")
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Comando executado por: ${message.author.username}`)
            .setTimestamp();
            guildTable.usuariosReportados.splice(index, 1);
            member.ban().catch(()=>{});
        } else {
            let x = advNumber === 1 ? "uma advertência" : "duas advertências"
            embed = new RichEmbed()
            .setAuthor(`Punido por: ${message.author.tag}`)
            .setDescription(`${member.user.username} Recebeu ${x}. ${client.getEmoji("negado")}`)
            .addField("Staff Tag", message.author.tag, true)
            .addField("Staff ID", message.author.id, true)
            .addField("Discord tag", member.user.tag, true)
            .addField("Discord ID", member.user.id, true)
            .addField(":pencil: Motivo:", reason)
            .setColor("FC0909")
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp();
            embedDM = new RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTitle(`:do_not_litter: Você recebeu ${x} no servidor ${message.guild.name} ${client.getEmoji("negado")}`)
            .addField(`${client.getEmoji("suicidu")} Advertência dada por:`, message.author.tag)
            .addField(`:pencil: Motivo:`, reason)
            .setColor("BLACK")
            .setThumbnail(message.guild.iconURL)
            .setFooter(`Comando executado por: ${message.author.username}`)
            .setTimestamp();
            guildTable.usuariosReportados[index] = userEntry;
        }
        guildTable.save().then(() => {
            let channel = message.channel;
            if (guildTable.edit.reporte.length) {
                channel = message.guild.channels.get(guildTable.edit.reporte);
                if (!channel) channel = message.channel;
            }
            channel.send(embed).catch(()=>{});
            member.send(embedDM).catch(()=>{});
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
    });
};

var addRoles = (member, roles) => {
    for (let i = 0; i < roles.length; ++i) {
        if (roles[i]) {
            roles[i] = roles[i].id;
        } else {
            roles.splice(i, 1);
        }
    }
    if (roles.length) member.addRoles(roles).catch(()=>{});
}

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