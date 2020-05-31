var { guild } = require("../../../database.js");

module.exports = (client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("O comando está disponível apenas para administradores.");
        return 0;
    }
    guild.findById(message.guild.id, "registradores", (err, guildTable) => {
        if (err) {
            console.log(err);
            return 1;
        }
        if (!guildTable) {
            message.reply("O registro já está vazio");
            return 0;
        }
        guildTable.registradores = [];
        guildTable.save().then(() => {
            message.reply("Histórico de registros apagado");
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
    });
};