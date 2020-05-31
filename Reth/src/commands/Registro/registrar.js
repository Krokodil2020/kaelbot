const { RichEmbed } = require("discord.js");
var { guild, createNewGuildEntry} = require("../../../database.js");

module.exports = (client, message, args, prefix, retry = 0) => {
    if (retry > 1) return 0;
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("O comando está disponível apenas para usuários STAFF.");
        return 0;
    }
    guild.findById(message.guild.id, "registradores config", (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            setTimeout(() => client.commands.registrar(client, message, args, prefix, ++retry), 500);
            return 1;
        }
        let member = message.mentions.members.first();
        if (!member) {
            message.reply("Mencione o usuário que deseja registrar!");
            return 0;
        }
        let hit = guildTable.registradores.some(registrador => {
            return registrador.membrosRegistrados.some(membro => membro._id === member.id);
        });
        if (hit) {
            message.reply("Usuário já registrado");
            return 0;
        }
        let masculino = message.guild.roles.get(guildTable.config.masculino);
        let feminino = message.guild.roles.get(guildTable.config.feminino);
        if (!masculino || !feminino) {
            message.reply(`O comando não foi configurado, para ter mais informações digite ${prefix}config`);
            return 0;
        }
        let masculinoCheck = member.roles.get(masculino.id);
        let femininoCheck = member.roles.get(feminino.id);
        if (masculinoCheck && femininoCheck) {
            message.reply("O usuário possui os cargos `feminino` e `masculino`, remova um e tente novamente");
            return 0;
        }
        if (!masculinoCheck && !femininoCheck) {
            message.reply(`**Registro incompleto!** Verifique se o mesmo possui a tag \`masculino\` ou \`feminino\` em seu registro.`);
            return 0;
        }
        let gender = masculinoCheck ? "M" : "F";
        if (guildTable.registradores.length < 1) {
            guildTable.registradores[0] = {
                _id: message.author.id,
                membrosRegistrados: [{
                    _id: member.id,
                    genero: gender,
                    timestamp: message.createdTimestamp
                }]
            };
        } else {
            let index = guildTable.registradores.findIndex(r => r._id === message.author.id);
            if (index >= 0) {
                let membersNum = guildTable.registradores[index].membrosRegistrados.length;
                guildTable.registradores[index].membrosRegistrados[membersNum] = {
                    _id: member.id,
                    genero: gender,
                    timestamp: message.createdTimestamp
                };
            } else {
                guildTable.registradores[guildTable.registradores.length] = {
                    _id: message.author.id,
                    membrosRegistrados: [{
                        _id: member.id,
                        genero: gender,
                        timestamp: message.createdTimestamp
                    }]
                };
            }
        }
        guildTable.save().then(() => {
            let novatoRole = message.guild.roles.get(guildTable.config.novato);
            if (novatoRole) {
                member.removeRole(novatoRole.id, "registro").catch(()=>{});
            }
            let embedSv = new RichEmbed()
            .setAuthor(`Registrador: ${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`${message.author} você registrou o usuário ${member} com sucesso.`)
            .setColor("3498db");
            message.channel.send(embedSv);
            let embedDM1 = new RichEmbed()
            .setTitle(`**Você foi registrado(a) no Servidor: ${member.guild.name}**`)
            .setDescription(`**Você foi registrado(a) por ${message.author}, no Servidor: __${member.guild.name}__.**\n` +
                `Caso não tenha se registrado por essa pessoa, entre em contato com <@282504900552949760>.`)
            .setThumbnail(message.author.displayAvatarURL)
            .setColor("00D8D8");
            let embedDM2 = new RichEmbed()
            .setDescription(`**Olá! poderia me ajudar dando um [upvote](https://discordbots.org/bot/412181831761526785/vote) no site?\n` +
                `É simples, basta clicar no link: https://discordbots.org/bot/412181831761526785/vote ${client.getEmoji("igor")}**`)
            .setThumbnail(`${client.getEmoji("pipoca").url}`)
            .setColor("00D8D8");
            member.send(embedDM1);
            member.send(embedDM2);
        }).catch(console.error);
    });
};