module.exports = (client, message, args, prefix, guildTable) => {
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
    let canalAntigo = message.guild.channels.get(guildTable.contador._id);
    if (!canal) {
        message.reply("Canal inválido!");
        return 0;
    }
    guildTable.contador._id = canalID;
    guildTable.contador.status = true;
    guildTable.save().then(() => {
        message.reply(`O canal ${canal} foi definido com sucesso!`);
        if (canalAntigo) {
            canalAntigo.setTopic("", "Removendo contador");
        }
        client.emit("contador", message.guild, guildTable.contador);
    }).catch(error => {
        console.log(error);
        message.reply(`Erro`);
    });
};