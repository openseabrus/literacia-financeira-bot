import { Client } from 'discord.js';
import reddit from './reddit.js';

export default {
  start(discordClient: Client): void {
    reddit.run(discordClient);
  },
};
