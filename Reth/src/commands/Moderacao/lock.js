module.exports = (client, message) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS", false, true, true)) {
        message.reply("Você não tem permissão para utilizar esse comando!");
        return 0;
    }
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS", false, true)) {
        return 0;
    }
    message.channel.overwritePermissions(message.guild.id, { SEND_MESSAGES: false}).then(() => {
        message.channel.send(`O canal ${message.channel} foi bloqueado com sucesso!`);
    }).catch(()=>{});
};