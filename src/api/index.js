import fetch from 'node-fetch';
import postMapper from './transformers/post.js'
import config from '../../config/index.js';

/**
 * Fetch subreddit posts
 */
export const fetchPosts = async ({ limit = 5 }) => {
  const url = new URL(`https://www.reddit.com/r/${config.reddit.subreddit}/new.json`);

  if (limit) {
    url.searchParams.set('limit', limit);
  }

  const posts = await fetch(url.toString()).then(data => data.json());

  if (!posts?.data?.children) {
    throw new Error(`Not able to retrieve posts from ${config.reddit.subreddit}`);
  }

  return posts.data.children.map(postMapper);
};
