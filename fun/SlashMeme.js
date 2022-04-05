const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const Fetch = require("node-fetch");

module.exports = {
    name: 'meme',
    description: 'Random meme images!',

    /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

    run: async (client, interaction, args) => {

        const Reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
            "Animemes"
        ];

        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        const Rads = Reds[Math.floor(Math.random() * Reds.length)];

        const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

        const json = await res.json();

        if (!json[0]) return message.channel.send(`**Type Again Da command pls :pleading_face:**`);

        const data = json[0].data.children[0].data;

        const Embed = new MessageEmbed()
            .setColor('RANDOM')
            .setURL(`https://reddit.com/${data.permalink}`)
            .setTitle(data.title)
            .setDescription(`:man_pouting:‍ **By : ${data.author}** :man_pouting:‍`)
            .setImage(data.url)
            .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
            .setTimestamp();

        return interaction.followUp({ content: `${member.user.tag} generated a meme!`, embeds: [Embed] });

    },
}
