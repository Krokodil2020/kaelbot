module.exports = (client, message, args, guildTable) => {
    if (args < 2) {
        return 0;
    }
    if (args[1] !== "on" && args[1] !== "off") {
        return;
    }
    guildTable.eventlog.edit = args[1] === "on";
    guildTable.save().then(() => {
        if (args[1] === "on") {
            message.channel.send(`O log de editar mensagens foi habilitado com sucesso!`);
        } else {
            message.channel.send(`O log de editar mensagens foi desabilitado com sucesso!`);
        }
    }).catch(err => {
        console.log(err);
        message.reply("Erro");
    });
};