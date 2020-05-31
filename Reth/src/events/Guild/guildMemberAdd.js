var { guild, createNewGuildEntry } = require("database.js");

module.exports = (client, guildMember) => {
    guild.findById(guildMember.guild.id, "contador welcome config", (error, guildTable) => {
        if (error) return 1;
        if (!guildTable) {
            createNewGuildEntry(guildMember.guild.id);
            return 0;
        }
        if (guildTable.contador.status) {
            client.emit("contador", guildMember.guild, guildTable.contador);
        }
        welcome(guildMember, guildTable);
        autoRole(guildMember, guildTable);
        botKick(guildMember, guildTable);
        muteMember(client, guildMember);
    });
    return 0;
};

var welcome = (guildMember, guildTable) => {
    let welcomeChannel = guildMember.guild.channels.get(guildTable.welcome.welcome._id);
    if (welcomeChannel) {
        let message = guildTable.welcome.welcome.text;
        if (!message.length) return 0;
        message = message.replace(/\$\{USER\}/g, guildMember);
        message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
        welcomeChannel.send(message).catch(()=>{});
    }
    if (guildTable.welcome.privado.length) {
        let message = guildTable.welcome.privado;
        if (!message.length) return 0;
        message = message.replace(/\$\{USER\}/g, guildMember);
        message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
        guildMember.send(message).catch(()=>{});
    }
};

var autoRole = (guildMember, guildTable) => {
    let autoRole = guildMember.guild.roles.get(guildTable.config.novato);
    if (autoRole) {
        guildMember.addRole(autoRole).catch(()=>{});
    }
};

var botKick = (guildMember, guildTable) => {
    if (guildMember.user.bot && guildTable.config.filtroBots) {
        guildMember.kick("Anti bot ativo!").catch(()=>{});
    }
};

var muteMember = async (client, guildMember) => {
    let guildMutes = client.mutes[guildMember.guild.id];
    if (!guildMutes) return;
    if (!guildMutes[guildMember.id]) return;
    let muteRole = guildMember.guild.roles.find(i => i.name === "😡Reth mute🔇");
    if (!muteRole) muteRole = await guildMember.guild.createRole({ name: "😡Reth mute🔇"});
    void (muteRole && guildMember.addRole(muteRole));
};