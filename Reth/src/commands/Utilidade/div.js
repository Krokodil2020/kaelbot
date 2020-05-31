const { RichEmbed } = require("discord.js");

module.exports = async (client, message) => {
    var user = message.mentions.users.first();
    if (!user) user = message.author;
    var targetInvites = await message.guild.fetchInvites();
    var invitesUses = 0;
    for (let invite of targetInvites.values()) {
        if (invite.inviter === user) {
            invitesUses += invite.uses;
        }
    }
    var embed = new RichEmbed()
    .setAuthor(user.tag, user.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .addField("• Membros Recrutados •", `\`\`\`md\n# ${invitesUses} Membros\`\`\``)
    .setColor("4959E9")
    .setFooter(`ID: ${user.id}`)
    .setTimestamp();
    message.delete().catch(console.error);
    message.channel.send(embed).catch(console.error);
};