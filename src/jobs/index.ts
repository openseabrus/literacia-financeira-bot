import { Client } from 'discord.js';
import reddit from './reddit';

export default {
  start(discordClient: Client): void {
    reddit.run(discordClient);
  },
};
