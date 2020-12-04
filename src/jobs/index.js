import reddit from './reddit.js';

export default {
  start(discordClient) {
    reddit.run(discordClient);
  },
};
