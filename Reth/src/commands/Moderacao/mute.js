const { RichEmbed } = require("discord.js");
const { guild } = require("database.js");
const ms = require("ms");

module.exports = (client, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("Você não tem permissão para utilizar esse comando!");
        return 0;
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES", false, true)) {
        message.reply("Não tenho permissão permissão para adicionar cargos");
        return 0;
    }
    var muteMember;
    if (message.mentions.members.size > 0) {
        if (/<@!?[\d]{18}>/.test(args[0]) && args[0].length <= 22) {
            muteMember = message.mentions.members.first();
        }
    } else if (/[\d]{18}/.test(args[0]) && args[0].length === 18) {
        muteMember = message.guild.members.get(args[0]);
    }
    if (!muteMember) {
        message.reply("Mencione alguém do servidor ou use o ID");
        return 0;
    }
    let muteRole = message.guild.roles.find(r => r.name === "😡Reth mute🔇");
    if (!muteRole) {
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS", false, true)) {
            message.reply("Não tenho permissão para bloquear o cargo de mute nos canais");
            return 0;
        }
        message.guild.createRole({ name: "😡Reth mute🔇" }).then(role => {
            message.guild.channels.forEach(channel => {
                channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                }).catch(()=>{});
            });
            message.reply("**Criei a tag: `😡Reth mute🔇` no servidor, Use o comando novamente!**");
        }).catch(() => {
            message.reply("Erro ao criar o cargo `😡Reth mute🔇`");
        });
        return 0;
    }
    if (muteMember.roles.find(r => r.name === `😡Reth mute🔇`)) {
        message.reply(`O membro ${muteMember} já está mutado`);
        return 0;
    }
    if (args.length < 2) {
        message.reply(`Exemplo de uso: \`${prefix}mute @Natsu#0001 5m <Motivo>\``);
    }
    let time = ms(args[1]);
    if (!time || time < ms("15s")) {
        message.reply("Tempo mínimo de mute: `5m`");
        return 0;
    }
    if (time > ms("7h")) {
        message.reply("Tempo máximo de mute: `7h`");
        return 0;
    }
    let reason = args.slice(2).join(' ').slice(0, 201);
    if (!reason.length) {
        reason = `Executor: ${message.author}, motivo não informado`;
    }
    muteMember.addRole(muteRole, reason).then(() => {
        guild.findById(message.guild.id, "edit", (err, guildTable) => {
            if (guildTable) {
                channel = message.guild.channels.get(guildTable.edit.mute);
                if (!channel) channel = message.channel;
            }
            let muteTime = ms(time);
            if (muteTime.slice(-1)[0] === "m") {
                muteTime = `${muteTime.slice(0, muteTime.length - 1)} minutos`;
            }
            if (ms(time).slice(-1)[0] === "h") {
                muteTime = `${muteTime.slice(0, muteTime.length - 1)} horas`;
            }
            let embed = new RichEmbed()
            .setTitle(`Acão | Tempmute`)
            .addField(`Usuário mutado`, `\`${muteMember.user.tag}\``, true)
            .addField(`Executor`, `\`${message.author.tag}\``, true)
            .addField(`Tempo`, muteTime, true)
            .addField(`:pencil: Motivo:`, reason, true)
            .setColor("FF593C")
            .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL)
            .setTimestamp();
            channel.send(embed).catch(()=>{});
            var timeoutID = setTimeout(() => {
                if (!muteMember.roles.find(r => r.name === `😡Reth mute🔇`)) return;
                muteMember.removeRole(muteRole, `Desmutando após ${ms(time)}`).catch(() => {
                    message.channel.send(`${message.author}, Não pude desmutar ${muteMember}, tempo de mute: ${ms(time)}`).catch(()=>{});
                });
                if (!client.mutes[message.guild.id]) return;
                delete client.mutes[message.guild.id][muteMember.id];
                if (Object.keys(client.mutes[message.guild.id]).length) return;
                delete client.mutes[message.guild.id];
            }, time);
            if (!client.mutes[message.guild.id]) client.mutes[message.guild.id] = {};
            let guildEntry = client.mutes[message.guild.id];
            guildEntry[muteMember.id] = { time, timeoutID };
        });
    }).catch(err => {
        console.log(err);
        message.reply("Erro ao mutar usuário");
    });
};