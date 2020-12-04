import config from '../config/index.js';
import jobs from './jobs/index.js';
import Discord from 'discord.js';

const client = new Discord.Client();

const {
  prefix,
  token,
} = config;

client.once('ready', () => {
  jobs.start(client);
  console.log('BOT :: Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
});

client.login(token);
