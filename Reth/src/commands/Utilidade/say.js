module.exports = async (client, message, args) => {
    if (!args.join(" ")) return message.reply("Digite alguma coisa.");
    let say = args.join(' ');
    /*message.mentions.users.forEach((u) => say = say.replace(u.toString(),"@"+u.tag))
    message.mentions.roles.forEach((r) => say = say.replace(r.toString(),"@"+r.name))
    Descomente essa linha caso queira que o bot não mencione roles/users*/
    message.channel.send(say,{disableEveryone:true});
};
