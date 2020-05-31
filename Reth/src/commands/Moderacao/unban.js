module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) {
        message.reply(":no_entry_sign: Desculpe, você não tem permissão de desbanir usuários neste servidor!");
        return 0;
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS", false, true)) {
        message.reply("Eu não tenho permissão para desbanir usuários nesse servidor.");
        return 0;
    }
    if (args.length < 1) {
        message.reply("Use o ID do usuário");
        return 0;
    }
    var bUser;
    if (!/[\d]{18}/.test(args[0]) || args[0].length == 18) {
        bUser = args[0];
    } else {
        message.reply("Use o ID do usuário");
        return 0;
    }
    let bans = await message.guild.fetchBans();
    bUser = bans.get(bUser);
    if (!bUser) {
        message.reply("O usuário não está banido");
        return 0;
    }
    let bReason = args.slice(1).join(' ').slice(0, 201);
    let executor = `executor: ${message.author.tag}`;
    bReason = bReason ? `${bReason}, ${executor}` : `Motivo não informado, ${executor}`;
    message.guild.unban(bUser, {reason : bReason}).then(async unbanned => { 
        message.channel.send(`${unbanned} foi desbanido com sucesso!`);
    }).catch(err => {
        console.log(err);
        if (typeof err !== "object") return;
        // Executa se não houver nenhum usuário como ID fornecido
        if (err.message === "Unknown User") {
            message.reply("Usuário não encontrado");
        }
    });
};