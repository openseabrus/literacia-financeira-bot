import {
  TextChannel,
  Client,
  Constants,
  MessageEmbed,
} from 'discord.js';
import config from '../../config/index.js';
import { fetchPosts } from '../api/index.js';

let newestPostAt: number;

/**
 * Generate the embeded object to be sent to the channel
 */
const generateEmbed = (post: Post) => {
  const embed = {
    color: Constants.Colors.RED,
    url: `https://reddit.com/r/${config.reddit.subreddit}`,
    title: `New post on /r/${config.reddit.subreddit}`,
    description: `[${post.title}](${post.url})`,
    fields: [
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
    ],
  } as MessageEmbed;

  if (post.description) {
    embed.fields.unshift({
      name: '\u200b',
      value: `>>> ${post.description.slice(0, 1000)}...`,
      inline: false,
    });
  }

  if (post.thumbnail) {
    embed.image = {
      url: post.thumbnail,
    };
  }

  if (post.createdAt) {
    embed.timestamp = post.createdAt; // epoch to miliseconds
  }

  if (post.author) {
    embed.fields.push({
      name: 'Post Author',
      value: `[${post.author}](https://reddit.com/u/${post.author})`,
      inline: true,
    });
  }

  embed.fields.push({
    name: 'Content Warning',
    value: post.isNSFW ? '18+' : 'None',
    inline: true,
  });

  return embed;
};

/**
 * Filter posts to display those posted after a specific date
*/
const filterOnlyNewOnes = (lastPostAt: number) => (post: Post) => (lastPostAt ? post.createdAt > lastPostAt : true);

/**
 * Process the fetched posts in order to send them
 */
const processAndSend = ({ channel, posts = [] }: { channel: TextChannel, posts: Post[]}) => {
  if (!channel) {
    throw new Error('There\'s no valid channel to send the message. Please set a channel in the config file.');
  }

  [...posts].reverse().forEach((post) => channel.send({ embed: generateEmbed(post) }));
};

export default {
  async run(discordClient: Client): Promise<void> {
    if (!config.channels.redditFeed) {
      throw new Error('No channel was defined to feed with Reddit posts');
    }

    const redditChannel: TextChannel = (await discordClient.channels.fetch(config.channels.redditFeed)) as TextChannel;

    if (!newestPostAt) {
      const messages = await redditChannel.messages.fetch({ limit: 1 });
      const lastMessage = messages.find((message) => message.author.bot);

      if (lastMessage?.embeds?.[0].timestamp) {
        newestPostAt = lastMessage.embeds[0].timestamp;
      }
    }

    const grabThemPosts = () => {
      fetchPosts().then((posts) => {
        const filteredPosts = posts.filter(filterOnlyNewOnes(newestPostAt));

        processAndSend({ channel: redditChannel, posts: filteredPosts });

        if (filteredPosts.length) {
          console.log(`Reddit :: Sent ${filteredPosts.length} new post(s) to #${redditChannel.name}`);
        }

        const [newest] = posts;

        if (newest) {
          newestPostAt = newest.createdAt;
        }
      });
    };

    setImmediate(grabThemPosts);
    setInterval(grabThemPosts, config.reddit.pollInterval * 1000);
  },
};
