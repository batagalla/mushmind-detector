
export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  imageId: string | null;
  mushroomType: string | null;
  message: string;
  rating: number;
  createdAt: string;
  status: 'pending' | 'reviewed';
}

// Mock data
export const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Regular User',
    imageId: '101',
    mushroomType: 'Agaricus bisporus',
    message: 'The identification was accurate! Great job.',
    rating: 5,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: 'reviewed'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Regular User',
    imageId: '102',
    mushroomType: 'Amanita phalloides',
    message: 'I think the identification was incorrect. This looks more like Amanita bisporigera.',
    rating: 2,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'pending'
  }
];
