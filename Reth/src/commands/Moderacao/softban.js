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
            message.reply("Você não pode punir este usuário, seu cargo é menor ou igual a o do usuário a ser punido!");
            return 0;
        }
        let clientRole = message.guild.me.highestRole;
        if (clientRole.comparePositionTo(targetRole) <= 0) {
            message.reply("Não posso punir este usúario, meu cargo é menor ou igual a o do usuário a ser punido!");
            return 0;
        }
    }
    let bReason = args.slice(1).join(' ').slice(0, 201);
    let executor = `executor: ${message.author.tag}`;
    bReason = bReason ? `${bReason}, ${executor}` : `Motivo não informado, ${executor}`;
    message.guild.ban(bUser, {reason : bReason, days: 7}).then(async banned => { 
        var user;
        if (typeof banned !== "string") {
            user = banned;
        } else {
            let auditLogs = await message.guild.fetchAuditLogs({type : "MEMBER_BAN_ADD", limit : 3}).catch(console.error);
            let entries = auditLogs.entries.array();
            for (let i = 0; i < entries.length; ++i) {
                if (entries[i].executor.id !== client.user.id) continue;
                user = entries[i].target;
                i = entries.length;
            }
        }
        let msg = await message.channel.send(`${user} foi banido com sucesso!`);
        message.guild.unban(user, "softban").then(() => {
            msg.edit(`${user} foi desbanido com sucesso!`);
        }).catch(()=>{});
    }).catch(err => {
        console.log(err);
        if (typeof err !== "object") return;

        // Executa se não houver nenhum usuário como ID fornecido
        if (err.message === "Unknown User") {
            message.reply("Usuário não encontrado");
        }
    });
};