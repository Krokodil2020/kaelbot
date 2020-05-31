module.exports = (client, message, prefix) => {
    message.reply(`Você digitou errado!\nUse: ${prefix}bot info/status/ping ${client.getEmoji("pipoca")}`);
};