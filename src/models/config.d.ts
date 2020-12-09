declare interface RrdditConfig {
  subreddit: string;
  pollInterval: number;
}

declare interface Config {
  prefix: string;
  token?: string;
  channels: Record<string, string | undefined>;
  reddit: RedditConfig;
}
