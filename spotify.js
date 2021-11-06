const { MessageEmbed, Client, CommandInteraction, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: "spotify",
    description: "Display your / mentioned user's spotify status",

    options: [
        {
          type: 'USER',
          description: 'The user',
          name: 'user',
          required: false,
        },
      ],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let user = 
        interaction.guild.members.cache.get(args[0]) || interaction.member;

        const activities = user.presence.activities;

        const array = [];

        for (let i = 0; i < activities.length; i++) {
            if (activities[i].name === 'Spotify') {
                array.push(activities[i].syncID);

                const data = user.presence.activities[i];

                let trackAuthor = data.state;
                trackAuthor = trackAuthor.replace(/;/g, ",");

                // let trackURL = `https://open.spotify.com/track/${data.syncID}`;

                // const spotifyUrl = new MessageActionRow().addComponents(
                //     new MessageButton({
                //         style: 'LINK',
                //         label: 'Spotify URL',
                //         url: `${trackURL}`,
                //         emoji: '864183397398872109',
                //     }),
                // )

                const embed = new MessageEmbed()
                    .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/889955546810183731.png')
                    .setColor("#2e3137")
                    .setThumbnail(`https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`)
                    .addField('➟ Song Name | ', `\`\`\`yaml\n${data.details} - ${data.state}\n\`\`\``, true)
                    .addField('➟ Album | ', `\`\`\`yaml\n${data.assets.largeText}\n\`\`\``, true)
                    .addField('➟ Author | ', `\`\`\`yaml\n${trackAuthor}\n\`\`\``, true)
                    .setTimestamp()

                    interaction.reply({ embeds: [embed] });
            }
        }
        if (array.length === 0) return interaction.reply({ content: 'This member is not listening to Spotify', ephemeral: true });
    }
}