declare interface RedditConfig {
  subreddit: string;
  pollInterval: number;
}

declare interface Config {
  prefix: string;
  token?: string;
  channels: Record<string, string | undefined>;
  reddit: RedditConfig;
}
