import fetch from 'node-fetch';
import postMapper from './transformers/post.js'
import config from '../../config/index.js';

/**
 * Fetch subreddit posts
 *
 * @async
 * @param {Object} [options]
 * @param {number} options.limit - Grab the latest <limit> posts
 * @param {number} options.subreddit - Subreddit to fetch data from
 *
 * @returns {Promise<Post[]>}
 */
export const fetchPosts = async (options = { limit: 5, subreddit: config.reddit.subreddit }) => {
  const {
    limit = 5,
    subreddit = config.reddit.subreddit,
  } = options;

  const url = new URL(`https://www.reddit.com/r/${subreddit}/new.json`);

  if (limit) {
    url.searchParams.set('limit', limit.toString());
  }

  const posts = await fetch(url.toString()).then(data => data.json());

  console.log(`Reddit :: /r/${subreddit} - Last fetch @ ${new Date().toLocaleString('pt-PT')}`);

  if (!posts?.data?.children) {
    throw new Error(`Not able to retrieve posts from ${config.reddit.subreddit}`);
  }

  return posts.data.children.map(postMapper);
};
