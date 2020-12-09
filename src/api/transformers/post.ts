/**
 * Map reddit post object to our own post definition
 */
export default ({ data: post }: RedditPost): Post => ({
  title: post.title,
  description: post.selftext,
  createdAt: post.created_utc * 1000,
  author: post.author,
  url: post.url,
  thumbnail: post.thumbnail === 'self' ? undefined : post.thumbnail,
  isNSFW: post.over_18,
});
