import env from 'dotenv';

env.config();

const config: Config = {
  /**
   * Bot's token
   */
  token: process.env.BOT_TOKEN,

  /**
   * Prefix to which bot will respond to
   */
  prefix: '!',

  /**
   * Server's channels
   */
  channels: {
    redditFeed: process.env.REDDIT_CHANNEL_ID,
  },

  reddit: {
    /**
     * Subreddit to check on
     */
    subreddit: 'literaciafinanceira',

    /**
     * Poll interval in seconds
     */
    pollInterval: 60,
  },
};

export default config;
