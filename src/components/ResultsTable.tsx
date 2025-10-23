
import React from 'react';
import type { SearchResult } from '../types';
import { SocialPlatform } from '../types';
import { XIcon } from './icons/XIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { RedditIcon } from './icons/RedditIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkIcon } from './icons/LinkIcon';

interface ResultsTableProps {
  results: SearchResult[];
  isPaid: boolean;
}

const platformIcons: { [key in SocialPlatform]: React.ReactNode } = {
  [SocialPlatform.X]: <XIcon />,
  [SocialPlatform.YouTube]: <YoutubeIcon />,
  [SocialPlatform.Instagram]: <InstagramIcon />,
  [SocialPlatform.Reddit]: <RedditIcon />,
  [SocialPlatform.Facebook]: <FacebookIcon />,
};

const platformColors: { [key in SocialPlatform]: string } = {
    [SocialPlatform.X]: 'bg-black text-white',
    [SocialPlatform.YouTube]: 'bg-red-600 text-white',
    [SocialPlatform.Instagram]: 'bg-pink-500 text-white',
    [SocialPlatform.Reddit]: 'bg-orange-500 text-white',
    [SocialPlatform.Facebook]: 'bg-blue-600 text-white',
}

const BlurredOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
    <span className="text-gray-300 font-semibold">Pay to reveal</span>
  </div>
);

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, isPaid }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/4">Platform</th>
              <th className="p-4 text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/2">Comment</th>
              <th className="p-4 text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/4 text-center">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                <td className="p-4 align-top">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${platformColors[result.platform]}`}>
                        {platformIcons[result.platform]}
                        <span>{result.platform}</span>
                    </div>
                </td>
                <td className="p-4 text-gray-300 relative align-middle">
                    <p className={isPaid ? '' : 'blur-sm select-none'}>
                        {isPaid ? result.comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </p>
                    {!isPaid && <BlurredOverlay />}
                </td>
                <td className="p-4 text-center align-middle">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-brand-teal text-white hover:text-black rounded-full transition-colors duration-200 group"
                    aria-label={`View comment on ${result.platform}`}
                  >
                    <LinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
