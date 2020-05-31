let cmds = ["ban", "mute", "reporte"];

module.exports = (client, message, args, guildTable) => {
    if (args.length < 3) return;
    if (!cmds.some(c => c === args[1])) return;
    let mentionTest = /<#[0-9]{18}>/.test(args[2]) && args[2].length === 21;
    let idTest = /[0-9]{18}/.test(args[2]) && args[2].length === 18;
    if (!mentionTest && !idTest) {
        message.reply("Canal inválido!");
        return 0;
    }
    let canalID = args[2].slice(args[2].length - 19, args[2].length - 1);
    let canal = message.guild.channels.get(canalID);
    if (!canal) {
        message.reply("Canal inválido!");
        return 0;
    }
    guildTable.edit[args[1]] = canalID;
    guildTable.save().then(() => {
        message.reply(`O canal ${canal} foi definido com sucesso!`);
    }).catch(error => {
        console.log(error);
        message.reply(`Erro`);
    });
};