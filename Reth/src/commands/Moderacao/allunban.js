module.exports = async (client, message) => {
    if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) {
        message.reply(":no_entry_sign: Desculpe, você não tem permissão de desbanir usuários neste servidor!");
        return 0;
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS", false, true)) {
        message.reply("Eu não tenho permissão para desbanir usuários nesse servidor.");
        return 0;
    }
    let bannedUsers = await message.guild.fetchBans().catch(()=>{});
    let size = bannedUsers.size;
    if (!size) {
        message.reply("Não há usuários banidos neste servidor");
        return 0;
    }
    await message.channel.send(`Começando | 0/${size}`).then(async m => {
        let i = 0;
        for (var user of bannedUsers.values()) {
            await m.guild.unban(user).then(() => {
                ++i;
                if (i % 10 === 0) {
                    m.edit(`${i}/${size}`).catch(console.error);
                }
            }).catch(()=>{});
        }
        m.edit("Pronto");
    }).catch(err => console.log(err));
};