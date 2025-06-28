import { User } from '@/app/api/types';
import Image from 'next/image';;

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
      <Image 
        width={64}
        height={64}
        src={user.avatar} 
        alt={user.name}
        className="w-16 h-16 rounded-full mx-auto mb-3"
      />
      <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
        {user.name}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {user.email}
      </div>
      <div className="flex justify-center space-x-4 text-xs">
        <span>📝 {user.postsCount.toLocaleString()}</span>
        <span>👥 {user.followers.toLocaleString()}</span>
      </div>
    </div>
  );
} 