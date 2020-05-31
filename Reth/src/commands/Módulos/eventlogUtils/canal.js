module.exports = (client, message, args, guildTable) => {
    if (args.length < 2) {
        message.reply("Você não especificou o canal!");
        return 0;
    }
    let mentionTest = /<#[0-9]{18}>/.test(args[1]) && args[1].length === 21;
    let idTest = /[0-9]{18}/.test(args[1]) && args[1].length === 18;
    if (!mentionTest && !idTest) {
        message.reply("Canal inválido!");
        return 0;
    }
    let canalID = args[1].slice(args[1].length - 19, args[1].length - 1);
    let canal = message.guild.channels.get(canalID);
    if (!canal) {
        message.reply("Canal inválido!");
        return 0;
    }
    guildTable.eventlog._id = canalID;
    guildTable.save().then(() => {
        message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`);
    }).catch(err => {
        console.log(err);
        message.reply("Erro");
    });
};