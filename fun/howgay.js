const Discord = require('discord.js');

module.exports = {
  name: "hmgay",
  description: "hmgay command",
  category: 'Fun Command',
  cooldown: 10000,

  async run(client, message, args) {

    let member = message.mentions.members.first() || message.member;

    let rng = Math.floor(Math.random() * 101);

    const hmgayembed = new Discord.MessageEmbed()

      .setTitle("You are **gay**, **Too gay** or **Super gay?**")

      .setDescription(`**${member.user.username}#${member.user.discriminator}** <:greenarrow:864735430942785557> ` + '**```fix\n' + rng + "% Gay!!```**")

      .setColor("RANDOM")

      .setThumbnail('https://media.discordapp.net/attachments/839885844038287401/848794196961918996/unknown.png')
      .setFooter(member.user.username, member.user.avatarURL())

      .setTimestamp()

    message.channel.send({ embeds: [hmgayembed] });
  }
}
