'use client';

import { useState } from 'react';
import { Post, User } from '@/app/api/types';
import { PostCard } from './PostCard';
import { UserCard } from './UserCard';

interface OptimizedDataSectionProps {
  type: 'posts' | 'users';
  title: string;
  initialData: Post[] | User[];
  totalCount: number;
  gridClass: string;
}

export function OptimizedDataSection({ 
  type, 
  title, 
  initialData, 
  totalCount, 
  gridClass 
}: OptimizedDataSectionProps) {
  const [data, setData] = useState<Post[] | User[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/${type}?page=${nextPage}&limit=20`);
      const result = await response.json();

      if (result[type]) {
        setData(prev => [...prev, ...result[type]]);
        setPage(nextPage);
        setHasMore(result.pagination.hasNext);
      }
    } catch (error) {
      console.error(`Erro ao carregar mais ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title} ({data.length} de {totalCount.toLocaleString()})
      </h2>
      
      <div className={gridClass}>
        {data.map((item) => (
          type === 'posts' ? (
            <PostCard key={item.id} post={item as Post} />
          ) : (
            <UserCard key={item.id} user={item as User} />
          )
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
              </span>
            ) : (
              `Carregar mais ${type === 'posts' ? 'posts' : 'usuários'}`
            )}
          </button>
        </div>
      )}

      {!hasMore && data.length > 0 && (
        <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
          Todos os {type === 'posts' ? 'posts' : 'usuários'} foram carregados
        </div>
      )}
    </div>
  );
} 