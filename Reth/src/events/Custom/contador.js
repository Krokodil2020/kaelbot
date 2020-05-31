module.exports = (client, guild, contador) => {
    let txt = contador.text;
    let channelID = contador._id;
    if (!txt.length) return;
    let channel = guild.channels.find(c => c.id === channelID);
    if (!channel) return 1;
    let memberCount = guild.memberCount;
    let emojis = memberCountToText(client.getEmoji, memberCount, contador.format);
    txt = txt.replace(/{contador}/g, emojis);
    txt = txt.slice(0, 1024);
    channel.setTopic(txt, "Atualizando Contador").catch(()=>{});
    return 0;
};

var numberToEmoji = (number, format) => {
    if (format === "0") {
        return `0${number}`;
    } else {
        return `${number}${format}`;
    }
};

/**
 * Transforma `memberCount` em texto com emojis
 * @returns {String} Texto com emojis equivalente a `memberCount`
*/
var memberCountToText = (getEmoji, memberCount, format) => {
    let array = [];
    let size = Math.floor(Math.log10(memberCount));
    for (let i = size; i >= 0; --i) {
        array[i] = Math.floor(memberCount % 10);
        memberCount /= 10;
    }
    array.forEach((element, index, array) => {
        let emoji = numberToEmoji(element, format);
        array[index] = `${getEmoji(emoji)}`;
    });
    return array.join("");
};