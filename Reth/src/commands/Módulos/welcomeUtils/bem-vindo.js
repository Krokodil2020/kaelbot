module.exports = (client, message, args, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    guildTable.welcome.welcome.text = args.slice(1).join(' ');
    guildTable.save().then(() => {
        message.channel.send("A mensagem de boas vindas foi configurada com sucesso!");
    }).catch(err => {
        console.log(err);
        message.reply("Erro");
    });
};