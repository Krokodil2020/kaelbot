module.exports = (client, message, args, prefix, guildTable) => {
    if (guildTable.contador._id === "") {
        message.reply("Voce deve setar um canal primeiro");
        return 0;
    }
    if (guildTable.contador.status === false) {
        message.reply(`O contador já está off`);
        return 0;
    }
    guildTable.contador.status = false;
    let oldChannel = guildTable.contador._id;
    guildTable.contador._id = "";
    guildTable.save().then(() => {
        message.reply(`Status do contador setado para: off`);
        let canal = message.guild.channels.get(oldChannel);
        if (!canal) return;
        canal.setTopic("", "Removendo contador");
    }).catch(error => {
        console.log(error);
        message.reply(`Erro`);
    });
};