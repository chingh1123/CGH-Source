const Discord = require('discord.js');
const ytsr = require('ytsr');
const { YoutubeUtils } = require('@kyometori/djsmusic');

module.exports = {
  name: 'ytsearch',
  description: "Search for youtube videos in Discord!",
  aliases: ["ys"],
  cooldown: 1500,

  options: [
    {
      type: 'STRING',
      description: 'type the youtube search query name',
      name: 'query',
      required: true,
    },
  ],
  run: async (client, interaction, args) => {

    let index = 0;

    let m = await interaction.followUp({ content: '**Searching..**' });
  await YoutubeUtils.search(args.join(' ')).then(results => {
    if (!results.length) return interaction.followUp("No results was founded.");
    const youtube = new Discord.MessageEmbed()
    .setTitle(`Result for - ${args.join(' ')} -`)
    .setDescription(results.map(v => `**${++index}** | [${v.title}](${v.url})`).join('\n'))
    .setColor('RED')
    .setThumbnail('https://d1y2qj23ol72q6.cloudfront.net/2019/02/YouTube.jpg')
    setTimeout(() => m.edit({ embeds: [youtube] }), 3500)
  })
  }
}