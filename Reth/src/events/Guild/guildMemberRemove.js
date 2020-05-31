var { guild, createNewGuildEntry } = require("database.js");

module.exports = (client, guildMember) => {
    guild.findById(guildMember.guild.id, "contador welcome registradores", (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(guildMember.guild.id);
            return 0;
        }
        if (guildTable.contador.status) {
            client.emit("contador",  guildMember.guild, guildTable.contador);
        }
        let saidaChannel = guildMember.guild.channels.get(guildTable.welcome.saida._id);
        if (saidaChannel) {
            let message = guildTable.welcome.saida.text;
            message = message.replace(/\$\{USER\}/g, guildMember.user.tag);
            message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
            saidaChannel.send(message).catch(()=>{});
        }
        /*
         * Deletar membro do registro do servidor
        */
        let registradores = guildTable.registradores;
        for (let i = 0; i < registradores.length; ++i) {
            let membros = registradores[i].membrosRegistrados;
            for (let u = 0; u < membros.length; ++u) {
                if (membros[u]._id === guildMember.id) {
                    membros.splice(u, 1);
                    guildTable.save().catch(console.error);
                    return;
                }
            }
        }
    });
};