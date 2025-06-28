import { Post } from '@/app/api/types';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = post.author || {
    name: 'Usuário Desconhecido',
    avatar: 'https://picsum.photos/32/32?random=1',
    email: 'unknown@example.com'
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <Image 
          width={32}
          height={32}
          src={author.avatar} 
          alt={author.name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {author.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
        {post.content}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span>❤️ {post.likes?.toLocaleString() || '0'}</span>
          <span>⏱️ {post.readTime || 5}min</span>
        </div>
        <div className="flex space-x-1">
          {(post.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 