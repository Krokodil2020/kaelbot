module.exports = async (client, message, args, prefix) => {
    if (args.length < 1) {
        return message.reply("Você esqueceu de colocar os parâmetros!\n" +
        `Use: ${prefix}bot info/status/ping ${client.getEmoji("pipoca")}`);
    }
    var cmd = client.botUtils[args[0]];
    if (cmd) {
        cmd(client, message, getTimeSinceReady);
    } else {
        client.botUtils.typo(client, message, prefix);
    }
};

/**
 * Sugiro trocarem essa função pelo uso do ms
*/
/**
 * Tempo que o bot está rodando
 * @param {Number} currTime Timestamp atual
*/
var getTimeSinceReady = (client, currTime) => {
    let texto =  "";
    let secs = (currTime - client.readyTimestamp) / 1000;
    let min = secs / 60;
    secs = Math.floor(secs % 60);
    let hours = Math.floor(min / 60);
    min = Math.floor(min % 60);
    var setSecs = (texto, secs) => {
        if (secs === 1) texto += `${secs} segundo`
        else texto += `${secs} segundos`
        return texto;
    };
    var setMin = (texto, min, secs) => {
        if (min === 1) texto += `${min} minuto e `;
        else texto += `${min} minutos e `;
        return setSecs(texto, secs);
    };
    var setHours = (texto, hours, min, secs) => {
        if (hours === 1) texto += `${hours} hora e `;
        else texto += `${hours} horas e `;
        return setMin(texto, min, secs);
    };
    if (hours > 0) {
        texto = setHours(texto, hours, min, secs);
    }
    else if (min > 0) {
        texto = setMin(texto, min, secs);
    }
    else if (secs > 0) {
        texto = setSecs(texto, secs);
    }
    return texto;
};