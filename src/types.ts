export enum SocialPlatform {
  X = 'X',
  YouTube = 'YouTube',
  Instagram = 'Instagram',
  Reddit = 'Reddit',
  Facebook = 'Facebook',
}

export interface SearchResult {
  id: number;
  platform: SocialPlatform;
  comment: string;
  link: string;
}

export interface User {
  username: string;
}
