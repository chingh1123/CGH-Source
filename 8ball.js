const { Message, Client } = require("discord.js");

module.exports = {
    name: "8ball",
    description: '8ball command',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.users.first() || message.author;

        if(!args[0]) return message.channel.send(
            '<:AAcross_box:864690410232610836> Error. You may ask the bot a question!'
            )

            let replies = [
                'yup ~ yup',
                'nope...',
                'acctually it is..',
                'seem looks good!',
                "I don't think so..",
                'definitely',
                'no lmfao XD',
                "honestly I didn't care care it TwT",
                'Sure.',
                'yesh my dad...',
                'ma boi...gosh..'
            ]
    
            let result = Math.floor((Math.random() * replies.length));
    
            let m = await message.channel.send('**:8ball: Replying Your Question...**')
            m.delete({ timeout: 1500 });
    
            message.reply({ content: `:8ball: ${member.username}, ` + replies[result] + ':8ball:' });
    },
};
