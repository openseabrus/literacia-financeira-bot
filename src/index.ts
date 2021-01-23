import Discord from 'discord.js';
import config from '../config';
import jobs from './jobs';

const client = new Discord.Client();

const { prefix, token } = config;

client.once('ready', () => {
  jobs.start(client);
  console.log('BOT :: Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    // do nothing
  }

  // Implement commands
});

client.login(token);
