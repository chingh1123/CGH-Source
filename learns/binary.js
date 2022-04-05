const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'binary',
  description: 'Shows your text in Binary Format',
  category: 'Fun Command',
  aliases: ["binary"],
  usage: '<text>',
  accessableby: "",
  cooldown: 10000,

  run: async (client, message, args) => {

    let member = message.mentions.users.first() || message.author

    const url = `http://some-random-api.ml/binary?text=${args}`;

    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return message.channel.send({ content: `Please specify some text!` });
    }

    const string = args.join(" ");
    if (string.length > 50) return message.channel.send({ content: '**Please Enter Text Between 0 And 50 Characters!**' });

    const embed = new MessageEmbed()
      .setTitle("Text to Binary")
      .setThumbnail(
        "https://images.saymedia-content.com/.image/t_share/MTc0MTg1MzMyNjg5MjE3MDIw/why-is-binary-used-in-computers.jpg"
      )

      .addField(`__Binary Code:__`, '```' + data.binary + '```')
      .setTimestamp()
      .setFooter(`Binary Code`, member.avatarURL({ dynamic: true }))
      .setColor(config.embedcolor);

    await message.channel.send({ embeds: [embed] });

  }
}
