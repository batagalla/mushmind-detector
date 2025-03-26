
export interface SearchHistory {
  id: string;
  userId: string;
  imageUrl: string;
  mushroomType: string;
  isSafe: boolean;
  confidence: number;
  createdAt: string;
}

// Mock data
export const mockSearchHistory: SearchHistory[] = [
  {
    id: '1',
    userId: '2',
    imageUrl: '/placeholder.svg',
    mushroomType: 'Agaricus bisporus (Button Mushroom)',
    isSafe: true,
    confidence: 0.92,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '2',
    userId: '2',
    imageUrl: '/placeholder.svg',
    mushroomType: 'Amanita phalloides (Death Cap)',
    isSafe: false,
    confidence: 0.87,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  },
  {
    id: '3',
    userId: '2',
    imageUrl: '/placeholder.svg',
    mushroomType: 'Cantharellus cibarius (Chanterelle)',
    isSafe: true,
    confidence: 0.89,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
  }
];
