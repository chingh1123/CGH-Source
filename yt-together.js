const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

// const client = new Client({
//     intents: 32767,
// });

// const { DiscordTogether } = require('discord-together');

// client.discordTogether = new DiscordTogether(client);

module.exports = {
    name: 'yt-together',
    aliases: ['ytt'],
    cooldown: 5000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const voicechannel = message.member.voice.channelId;
        if(!voicechannel) return message.reply({ content: `You need to be in a voice channel to run this command` })
        client.discordTogether.createTogetherCode(voicechannel, 'youtube').then(async invite => {

            const row = new MessageActionRow().addComponents(
                new MessageButton({
                    style: 'LINK',
                    label: 'Click Me To Get In!',
                    url: `${invite.code}`,
                    emoji: '855362502229753896',
                }),
            )

            return message.reply({ content: `Hey here is your link!`, components: [row] })
        })
    }
}
