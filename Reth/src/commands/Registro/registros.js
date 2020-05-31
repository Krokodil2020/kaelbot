const { RichEmbed, Collection } = require("discord.js");
var { guild, createNewGuildEntry} = require("../../../database.js");

module.exports = (client, message) => {
    guild.findById(message.guild.id, "registradores", async (error, guildTable) => {
        if (error) {
            console.log(error);
            return 1;
        }
        if (!guildTable) {
            createNewGuildEntry(message.guild.id);
            message.reply("Nenhum usuário foi registrado neste servidor");
            return 1;
        }
        var members = new Collection();
        if (message.guild.memberCount >= 250) {
            let g = await message.guild.fetchMembers();
            members = g.members;
        } else {
            members = message.guild.members;
        }
        var registradores = guildTable.registradores;
        var top = new Array();
        registradores.forEach((registrador, index, registradores) => {
            let registradorMembro = members.get(registrador._id);
            if (!registradorMembro) {
                registradores = registradores.splice(index, 0);
                return;
            }
            let m = 0;
            let f = 0;
            registrador.membrosRegistrados.forEach(membro => {
                if (membro.genero === "M") ++m;
                if (membro.genero === "F") ++f;
            });
            let current = {
                username: registradorMembro.user.username,
                m,
                f,
                t : m + f
            };
            if (top.length) {
                top.forEach((registrador, index, top) => {
                    if (current.t > registrador.t) {
                        top.splice(index, 0, current);
                        return;
                    }
                    if (top.length > 5) top.pop();
                });
                if (top.lenght < 5) top.push(current);
            } else {
                top[0] = current;
            }
        });
        if (!top.length) {
            message.reply("Nenhum usuário foi registrado neste servidor");
            return 0;
        }
        let embed = new RichEmbed()
        .setTitle(`Rank dos registradores do: ${message.guild.name}`)
        .setColor("00D8D8")
        .setThumbnail(client.getEmoji("trofeu").url)
        .setFooter(`Comando requisitado por: ${message.author.username}`, message.author.displayAvatarURL);
        var positionToEmoji = position => {
            var arr = [
                ":first_place:",
                ":second_place:",
                ":third_place:",
                client.getEmoji("fourth_place"),
                client.getEmoji("fifth_place")
            ];
            return arr[position - 1];
        };
        for (let i = 0, pos = 1, lastPos = 1; i < top.length; ++i) {
            /**
             * Se tiver empate com o primeiro, segundo, terceiro e etc ele vao ter a mesma medalha
             * da pessoa com a maior medalha que tambem empatou 
            */
            if (i === 0) {
                pos = 1;
            } else if (top[i].t === top[i - 1].t) {
                pos = lastPos;
            } else {
                pos = i + 1;
            }
            embed.addField(`**${positionToEmoji(pos)}__${top[i].username}__**`,
            `${client.getEmoji("homi")} **Masculino:** ${top[i].m} ` +
            `${client.getEmoji("muie")} **Feminino:** ${top[i].f} ` +
            `${client.getEmoji("sexy")} **Total: ${top[i].t}**`);
        }
        message.channel.send(embed);
    });
};