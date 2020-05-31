module.exports = (client, message, args, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    guildTable.welcome.saida.text = args.slice(1).join(' ');
    guildTable.save().then(() => {
        message.channel.send("A mensagem de despedida foi configurada com sucesso!");
    }).catch(err => {
        console.log(err);
        message.reply("Erro");
    });
};