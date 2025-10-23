
import { SocialPlatform } from '../types';
import type { SearchResult } from '../types';

const mockComments: { [key in SocialPlatform]: string[] } = {
  [SocialPlatform.X]: [
    "This is a game changer! 🔥",
    "I completely disagree with this take.",
    "Replying to @someone: you're absolutely right!",
    "Can't wait for the official release.",
  ],
  [SocialPlatform.YouTube]: [
    "Great video! Learned a lot. Subscribed!",
    "The editing on this is top-notch. What software do you use?",
    "First!",
    "I think you missed a key point around 5:32 in the video.",
  ],
  [SocialPlatform.Instagram]: [
    "😍 Love this look!",
    "Where did you get that jacket?",
    "This picture is stunning. Great shot!",
  ],
  [SocialPlatform.Reddit]: [
    "As someone in the industry, I can confirm this is accurate. However, you're forgetting the nuance of...",
    "Came here to say this. You beat me to it.",
    "EDIT: Wow, thanks for the gold kind stranger!",
    "NTA. Your house, your rules.",
  ],
  [SocialPlatform.Facebook]: [
    "Congratulations to the happy couple! 🎉",
    "Sending prayers to your family.",
    "Happy birthday! Hope you have a wonderful day!",
  ],
};

const platforms = Object.values(SocialPlatform);

export const searchByUsername = (username: string): Promise<SearchResult[]> => {
  console.log(`Searching for username: ${username}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate some users having no results
      if (username.toLowerCase() === 'noresults') {
        resolve([]);
        return;
      }

      const results: SearchResult[] = [];
      const numResults = Math.floor(Math.random() * 15) + 3; // Generate 3 to 17 results

      for (let i = 0; i < numResults; i++) {
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        const platformComments = mockComments[platform];
        const comment = platformComments[Math.floor(Math.random() * platformComments.length)];

        results.push({
          id: i,
          platform,
          comment: `${comment} - from user ${username}`,
          link: `https://example.com/${platform.toLowerCase()}/post/${Math.random().toString(36).substring(7)}`,
        });
      }
      resolve(results);
    }, 1500 + Math.random() * 1000); // Simulate network delay
  });
};
