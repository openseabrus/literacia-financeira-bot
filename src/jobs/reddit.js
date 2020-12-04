import config from '../../config/index.js';
import { fetchPosts } from '../api/index.js';

/** @type {number} */
let newestPostAt;

/**
 * Filter posts to display those posted after a specific date
 *
 * @param {number} newestPostAt
 * @returns {Function}
 */
const filterOnlyNewOnes = (newestPostAt) => (post) => newestPostAt ? post.createdAt > newestPostAt : true;

const processAndSend = ({ channel, posts = [] }) => {
  if (!channel) {
    throw new Error(`There's no valid channel to send the message`);
  }

  posts.reverse().forEach(post => channel.send({ embed: generateEmbed(post) }));

  const [newest] = posts;

  if (newest) {
    newestPostAt = newest.createdAt;
  }
};

/**
 * Generate the embeded object to be sent to the channel
 *
 * @param {Object} post
 */
const generateEmbed = (post) => {
  const embed = {
    color: '#FF0000',
    title: `New post on /r/${config.reddit.subreddit}`,
    fields: [
      {
        name: post.title,
        value: post.description,
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
    ],
  };

  if (post.url) {
    embed.url = post.url;
  }

  if (post.thumbnail) {
    embed.image = {
      url: post.thumbnail,
    };
  }

  if (post.createdAt) {
    embed.timestamp = new Date(post.createdAt); // epoch to miliseconds
  }

  if (post.author) {
    embed.fields.push({
      name: 'Post Author',
      value: post.author,
      inline: true,
    });
  }

  if (post.nsfw) {
    embed.fields.push({
      name: 'Content Warning',
      value: post.nfsw ? '18+' : 'None',
      inline: true,
    });
  }

  return embed;
};

export default {
  async run(discordClient) {
    const redditChannel = await discordClient.channels.fetch(config.channels.redditFeed);

    if (!newestPostAt) {
      const lastMessage = await redditChannel.messages.fetch({ limit: 1 }).then(messages => messages.find(message => message.author.bot));

      if (lastMessage?.embeds?.length) {
        newestPostAt = lastMessage.embeds[0].timestamp;
      }
    }

    const grabThemPosts = () => {
      fetchPosts({ after: newestPostAt }).then(posts => {
        const filteredPosts = posts.filter(filterOnlyNewOnes(newestPostAt));

        processAndSend({ channel: redditChannel, posts: filteredPosts });

        console.log(`Reddit :: Last fetch @ ${new Date()}`);
      });
    };

    setImmediate(grabThemPosts);
    setInterval(grabThemPosts, config.reddit.pollInterval * 1000);
  },
}
