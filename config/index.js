import env from 'dotenv';
import fs from 'fs';
env.config();

const config = {
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
};

const configFiles = fs.readdirSync('./config').filter(file => !file.startsWith('index') && file.endsWith('.js'));

for (const file of configFiles) {
  const [name] = file.split('.');
  /* eslint-disable security/detect-object-injection */
  import(`./${file}`).then(module => {
    config[name] = module.default;
  });
}

export default config;
