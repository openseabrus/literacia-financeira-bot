import fetch from 'node-fetch';
import { URL } from 'url';
import postMapper from './transformers/post';
import config from '../../config/index';

/**
 * Fetch subreddit posts
 */
export const fetchPosts = async (
  options = { limit: 5, subreddit: config.reddit.subreddit }
): Promise<Post[]> => {
  const { limit = 5, subreddit = config.reddit.subreddit } = options;

  const url = new URL(`https://www.reddit.com/r/${subreddit}/new.json`);

  if (limit) {
    url.searchParams.set('limit', limit.toString());
  }

  const posts = await fetch(url.toString()).then((data) => data.json());

  console.log(
    `Reddit :: /r/${subreddit} - Last fetch @ ${new Date().toLocaleString(
      'pt-PT'
    )}`
  );

  if (!posts?.data?.children) {
    throw new Error(
      `Not able to retrieve posts from ${config.reddit.subreddit}`
    );
  }

  return posts.data.children.map(postMapper);
};
