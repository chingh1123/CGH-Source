const fetch = require('node-fetch');
const { Client } = require('discord.js');

const defaultApplications = {
  youtube: '880218394199220334', 
  youtubedev: '880218832743055411',
  poker: '755827207812677713',
  betrayal: '773336526917861400',
  fishing: '814288819477020702',
  chess: '832012774040141894',
  chessdev: '832012586023256104', 
  lettertile: '879863686565621790',
  wordsnack: '879863976006127627',
  doodlecrew: '878067389634314250',
  awkword: '879863881349087252',
  spellcast: '852509694341283871',
  checkers: '832013003968348200',
  puttparty: '763133495793942528',
};

/**
 * Class symbolizing a YoutubeTogether
 * @template {Object.<string, string>} T
 */
class discordTogether {
  /**
   * Create a new YoutubeTogether
   * @param {Client} client Discord.Client
   * @param {T} applications
   */
  constructor(client, applications = defaultApplications) {
    if (!client) throw new SyntaxError('Invalid Discord.Client !');

     // Discord.Client
    this.client = client;

     //Discord Together applications
    this.applications = { ...defaultApplications, ...applications };
  }
  /**
   * Create a Youtube Together invite code (note: send the invite using markdown link)
   * @param {string} voiceChannelId
   * @param {keyof (defaultApplications & T)} option
   * @example
   * @returns {Promise<{ code: string; }>}
   */
  async createTogetherCode(voiceChannelId, option) {
    /**
     * @param {string} code The invite link (only use the blue link)
     */
    let returnData = {
      code: 'none',
    };
    if (option && this.applications[option.toLowerCase()]) {
      let applicationID = this.applications[option.toLowerCase()];
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: applicationID,
            target_type: 2,
            temporary: false,
            validate: null,
          }),
          headers: {
            Authorization: `Bot ${this.client.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((invite) => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (Number(invite.code) === 50013) console.warn('Your bot lacks permissions to perform that action');
            returnData.code = `https://discord.com/invite/${invite.code}`;
          });
      } catch (err) {
        throw new Error('An error occured while starting Youtube together !');
      }
      return returnData;
    } else {
      throw new SyntaxError('Invalid option !');
    }
  }
}

module.exports = discordTogether;

// some activity ids may not be working
