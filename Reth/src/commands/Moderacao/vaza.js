const { RichEmbed } = require("discord.js");
const { guild } = require("database.js");

module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) {
        message.reply(":no_entry_sign: Desculpe, você não tem permissão de banir usuários neste servidor!");
        return 0;
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS", false, true)) {
        message.reply("Eu não tenho permissão para banir usuários nesse servidor.");
        return 0;
    }
    if (args.length < 1) {
        message.reply("Mencione alguém ou use o ID");
        return 0;
    }
    var bUser;
    if (message.mentions.members.size > 0) {
        if (/<@!?[\d]{18}>/.test(args[0]) && args[0].length <= 22) {
            bUser = message.mentions.members.first();
        }
    } else if (/[\d]{18}/.test(args[0]) && args[0].length === 18) {
        bUser = message.guild.members.get(args[0]) || args[0];
    } else {
        message.reply("Mencione alguém do servidor ou use o ID");
        return 0;
    }

    // Executa se o membro a ser banido está no servidor
    if (typeof bUser !== "string") {
        if (bUser.id === message.guild.ownerID) {
            message.reply("Você não tem permissão para banir este usuário");
            return 0;
        }
        if (bUser.id === client.user.id) {
            message.reply("Não posso me banir");
            return 0;
        }
        let executorRole = message.member.highestRole;
        let targetRole = bUser.highestRole;
        if (executorRole.comparePositionTo(targetRole) <= 0 && message.author.id !== message.guild.ownerID) {
            message.reply("Você não tem permissão para banir este usuário");
            return 0;
        }
        let clientRole = message.guild.me.highestRole;
        if (clientRole.comparePositionTo(targetRole) <= 0) {
            message.reply("Não tenho permissão para banir este usúario");
            return 0;
        }
    }
    let bReason = args.slice(1).join(' ').slice(0, 201);
    let executor = `executor: ${message.author.tag}`;
    bReason = bReason ? `${bReason}, ${executor}` : `Motivo não informado, ${executor}`;
    message.guild.ban(bUser, {reason : bReason}).then(async banned => { 
        var user;
        let username = "\`User\`";
        let URL = "https://i.imgur.com/TgJXsIG.png";
        if (typeof banned !== "string") {
            user = banned;
            username = banned.tag || banned.user.tag;
            URL = banned.displayAvatarURL || banned.user.displayAvatarURL;
        } else {
            let auditLogs = await message.guild.fetchAuditLogs({type : "MEMBER_BAN_ADD", limit : 5}).catch(console.error);
            let entries = auditLogs.entries.array();
            for (let i = 0; i < entries.length; ++i) {
                if (entries[i].executor.id !== client.user.id) continue;
                user = entries[i].target;
                username = user.tag;
                URL = user.displayAvatarURL;
                i = entries.length;
            }
        }
        guild.findById(message.guild.id, "edit", (err, guildTable) => {
            let channel = message.channel;
            if (guildTable) {
                channel = message.guild.channels.get(guildTable.edit.ban);
                if (!channel) channel = message.channel;
            }
            let embed = new RichEmbed()
            .setTitle("Acão | Ban")
            .addField("Executor", `\`${message.author.tag}\``, true)
            .addField("ID", `\`${message.author.id}\``, true)
            .addField("Usuário banido", `\`${username}\``, true)
            .addField("ID", `\`${typeof banned === "string" ? banned : banned.id}\``, true)
            .addField(":pencil:Motivo", args.slice(1).join(' ') || "Motivo não informado")
            .setThumbnail(URL)
            .setColor("4959E9")
            .setTimestamp();
            channel.send(embed).catch(console.error);
            message.delete().catch(console.error);
                           
            // Não há necessidade de enviar a mensagem de ban no DM de um bot
            if (user.bot) return 0;
            let dmEmbed = new RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTitle(`:do_not_litter:Você foi banido do servidor ${message.guild.name} :no_entry_sign:`)
            .addField(`${client.emojis.find(e => e.name === "suicidu")}Quem baniu`, message.author.tag)
            .addField(":pencil:Motivo", args.slice(1).join(' ') || "Motivo não informado")
            .setThumbnail(message.guild.iconURL ? `${message.guild.iconURL}?size=2048` : "https://i.imgur.com/TgJXsIG.png")
            .setColor("BLACK")
            .setFooter(`Comando executado por: ${message.author.tag}`)
            .setTimestamp();
            user.send(dmEmbed).catch(() => message.channel.send("Nao foi possivel avisar o usuario no DM"));
            return 0;
        });
    }).catch(err => {
        console.log(err);
        if (typeof err !== "object") return;
        // Executa se não houver nenhum usuário como ID fornecido
        if (err.message === "Unknown User") {
            message.reply("Usuário não encontrado");
        }
    });
    return 0;
};
