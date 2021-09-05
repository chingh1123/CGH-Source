const {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus
} = require('@discordjs/voice');

module.exports = {
    name: 'radio',
    description: 'radio commands',

    run: async (client, message, args) => {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send("https://media.discordapp.net/attachments/851287403456626717/872174370729119834/unknown.png");

        const player = createAudioPlayer();

        let resource = createAudioResource('https://stream-mz.planetradio.co.uk/net2national.mp3');

        let connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);
    }
};