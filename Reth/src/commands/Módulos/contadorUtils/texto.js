module.exports = (client, message, args, prefix, guildTable) => {
    if (args.length < 2) {
        guildTable.contador.text = "";
        guildTable.save().then(() => {
            message.reply("Texto removido");
            client.emit("contador", message.guild, guildTable.contador);
        }).catch(console.error);
        return 0;
    }
    if (guildTable.contador.status === false) {
        message.reply("Você não definiu o canal do contador!");
        return 0;
    }
    guildTable.contador.text = args.slice(1).join(' ');
    guildTable.save().then(() => {
        message.reply("Você definiu a mensagem com sucesso!");
        client.emit("contador", message.guild, guildTable.contador);
    }).catch(console.error);
};