module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES", false, true, true)) {
        message.reply("**Você não tem permissão para limpar o chat!**");
        return 0;
    }
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES", false, true, true)) {
        message.reply("Eu não tenho permissão para apagar mensagens nesse servidor.");
    }
    if(!args[0]) {
        message.reply("Fale uma quantidade de mensagens :smiling_imp:");
        return 0;
    }
    let quantity = Number(args[0]);
    if (isNaN(quantity)) {
        message.reply("A quantidade precisa ser um número");
        return 0;
    }
    if (quantity < 1) {
        message.reply("O número precisa ser maior que 0");
        return 0;
    } else if (quantity > 1000) quantity = 1000;
    var total = 0;
    /**
     * Deve ter uma implementação melhor para fazer um loop de bulkDelete mas to com preguiça 
    */
    do {
        var toBeDeleted = quantity;
        if (toBeDeleted > 100) toBeDeleted = 100;
        let deletedMessages = await message.channel.bulkDelete(toBeDeleted, true);
        if (deletedMessages.size < 1) {
            quantity = 0;
        } else {
            total += deletedMessages.size;
        }
        quantity -= deletedMessages.size;
    } while (quantity > 1);
    message.channel.send(`:mega: **Removido ${total} mensagens**`).then(msg => msg.delete(7000)).catch(() => {});
};