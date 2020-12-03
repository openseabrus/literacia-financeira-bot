import env from 'dotenv';
env.config();

export default {
  // Bot's token
  token: process.env.BOT_TOKEN,
  // prefix to which bot will respond to
  prefix: '!',

  // Server's channels
  channels: {
    redditFeed: process.env.REDDIT_CHANNEL_ID,
  },
};
