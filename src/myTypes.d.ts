declare interface Post {
  title: string;
  description: string;
  createdAt: number;
  author: string;
  url: string;
  thumbnail: string;
  isNSFW: boolean;
}

declare interface RedditPostData {
  title: string;
  selftext: string;
  created_utc: number;
  author: string;
  url: string;
  thumbnail: string;
  over_18: boolean;
}

declare interface RedditPost {
  data: RedditPostData;
}

declare interface RedditPosEmbed {

}
