import Discord from 'discord.js';
import config from './config/index.js';

const client = new Discord.Client();

const {
  prefix,
  token,
} = config;

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const [command, argument] = message.content.slice(prefix.length).trim().split(/ +/);

  if (command.toLowerCase() === 'ping') {
    message.channel.send(argument);
  }
});

client.login(token);
