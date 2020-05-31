module.exports = (client, message, args, prefix, guildTable) => {
    let tipos = ["1", "2", "3", "natal"];
    if (!args[1] || !tipos.some(x => x === args[1])) {
        message.channel.send(`Você esqueceu de definir o número do contador. Exemplo: ${prefix}contador cor 1`);
        return 0;
    }
    let newFormat;
    switch (args[1]) {
        case "1":
            newFormat = "0";
            break;
        case "2":
            newFormat = "B";
            break;
        case "3":
            newFormat = "SS";
            break;
        case "natal":
            newFormat = "N";
            break;
    }
    guildTable.contador.format = newFormat;
    guildTable.save().then(() => {
        if (args[1] === "natal") {
            message.channel.send("Você definiu o contador de Natal!");
        } else {
            message.channel.send(`Você definiu o contador número ${args[1]} no seu servidor!`);
        }
        client.emit("contador", message.guild, guildTable.contador);
    }).catch(console.error);
};