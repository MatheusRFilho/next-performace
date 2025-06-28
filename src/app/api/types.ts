export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  postsCount: number;
  followers: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  tags: string[];
  readTime: number;
}

export interface Analytics {
  totalPosts: number;
  totalUsers: number;
  averageLikes: number;
  topTags: { tag: string; count: number }[];
  recentActivity: string[];
} 