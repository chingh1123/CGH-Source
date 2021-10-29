const { MessageButton, MessageActionRow, MessageEmbed, Collector } = require("discord.js");
const ms = require("ms");

const paginator = async (message, pages) => {

  let member = message.mentions.users.first() || message.author;

  if (!message && !message.channel) throw new Error("Provide a message to access the channel");

  if (!pages) throw new Error("Please provide pages");

  let page = 0;

  const row = new MessageActionRow().addComponents(
    new MessageButton({
      customId: '00001101001110',
      style: 'PRIMARY',
      emoji: '875007707726376990',
      disabled: false
    }),

    new MessageButton({
      customId: '00101101001110',
      style: 'DANGER',
      emoji: '875008261261242428',
      disabled: false
    }),

    new MessageButton({
      customId: 'delete',
      style: 'DANGER',
      emoji: '❌',
      disabled: false
    }),

    new MessageButton({
      customId: 'request',
      style: 'SECONDARY',
      label: `Requested By: ${message.author.tag}`,
      disabled: true
    }),
  )

  const aftrow = new MessageActionRow().addComponents(
    new MessageButton({
      customId: '00001101001110',
      style: 'SECONDARY',
      emoji: '875007707726376990',
      disabled: true
    }),

    new MessageButton({
      customId: '00101101001110',
      style: 'SECONDARY',
      emoji: '875008261261242428',
      disabled: true
    }),

    new MessageButton({
      customId: 'delete',
      style: 'DANGER',
      emoji: '❌',
      disabled: true
    }),

    new MessageButton({
      customId: 'request',
      style: 'SECONDARY',
      label: `Requested By: ${message.author.tag}`,
      disabled: true
    }),
  )

  const curPage = await message.channel.send({ embeds: [pages[0]], components: [row] })

  const filter = async interaction =>
    interaction.user.id === message.author.id;

  const col = await curPage.createMessageComponentCollector({ filter, time: ms('50s') })

  col.on('collect', interaction => {
    interaction.deferUpdate()

    if (interaction.user.id !== message.author.id) return;

    if (interaction.customId == '00001101001110') {
      page = page > 0 ? --page : pages.length - 1;

    } else if (interaction.customId == '00101101001110') {
      page = page + 1 < pages.length ? ++page : 0;

    }else if (interaction.customId == 'delete') {
      col.stop();
      interaction.message.delete();
    }

    curPage.edit({ embeds: [pages[page]], components: [row] });
  })

  col.on('end', () => {
    if (!curPage.deleted) {
      curPage.edit({ embeds: [pages[page]], components: [aftrow] })
    }
  })

  return curPage
}

module.exports = paginator;