import { DashboardLayout } from '@/components/layout';
import type { Metadata } from 'next';
import { OptimizedDataSection } from './components/OptimizedDataSection';
import { MemoryMonitor } from './components/MemoryMonitor';
import type { Analytics, User } from '../api/types';
import { measureMemoryUsage, getMemoryUsage } from '@/lib/memory-monitor';

export const metadata: Metadata = {
  title: 'SSR Demo - Dados Complexos',
  description: 'Demonstração do poder do SSR com muitos dados',
};

async function getInitialData() {
  try {
    const [postsResponse, usersResponse, analyticsResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts?page=1&limit=12`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/users?page=1&limit=20`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analytics`)
    ]);

    const postsData = await postsResponse.json();
    const usersData = await usersResponse.json();
    const analytics: Analytics = await analyticsResponse.json();

    return {
      users: usersData.users || [],
      posts: postsData.posts || [],
      analytics,
      totalUsers: usersData.pagination?.totalUsers || 0,
      totalPosts: postsData.pagination?.totalPosts || 0
    };
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return {
      users: [],
      posts: [],
      analytics: {
        totalPosts: 0,
        totalUsers: 0,
        averageLikes: 0,
        topTags: [],
        recentActivity: []
      },
      totalUsers: 0,
      totalPosts: 0
    };
  }
}

export default async function SSRComplexDataPage() {
  const startTime = Date.now();
  
  const { result: data } = await measureMemoryUsage(
    async () => {
      const result = await getInitialData();
      const dataSize = JSON.stringify(result).length;
      return { ...result, dataSize };
    }
  );
  
  const { users, posts, analytics, totalUsers, totalPosts, dataSize } = data;
  const renderTime = Date.now() - startTime;
  const memoryAfter = getMemoryUsage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-sm p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            SSR Demo - Dados Complexos (Ultra Otimizado)
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Demonstração do poder do Server-Side Rendering com carregamento sob demanda
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{totalPosts.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Posts</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Usuários</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">{renderTime}ms</div>
              <div className="text-sm opacity-90">Tempo de Render</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🚀 SSR Ultra Otimizado</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">⚡ Carregamento Sob Demanda</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">📊 Dados Reais</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🔄 API Paginada</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📈 Estatísticas do SSR
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <div className="flex justify-between">
                <span>Tempo de Render:</span>
                <span className="font-semibold text-green-600">{renderTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Dados Processados:</span>
                <span className="font-semibold">{(totalPosts + totalUsers).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Dados Iniciais:</span>
                <span className="font-semibold">{posts.length} posts, {users.length} usuários</span>
              </div>
              <div className="flex justify-between">
                <span>Likes Médios:</span>
                <span className="font-semibold">{analytics.averageLikes}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ⚡ Performance Real
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Dados Carregados:</span>
                <span className="font-semibold">{(dataSize / 1024).toFixed(2)}KB</span>
              </div>
              <div className="flex justify-between">
                <span>Memória Heap:</span>
                <span className="font-semibold">{memoryAfter.heapUsed}MB</span>
              </div>
              <div className="flex justify-between">
                <span>Memória RSS:</span>
                <span className="font-semibold">{memoryAfter.rss}MB</span>
              </div>
              <div className="flex justify-between">
                <span>Memória External:</span>
                <span className="font-semibold">{memoryAfter.external}MB</span>
              </div>
              <div className="flex justify-between">
                <span>Memória Array Buffers:</span>
                <span className="font-semibold">{memoryAfter.arrayBuffers}MB</span>
              </div>
            </div>
          </div>

          
        </div>

        <OptimizedDataSection
          type="posts"
          title="📝 Posts Recentes"
          initialData={posts}
          totalCount={totalPosts}
          gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        />

        <OptimizedDataSection
          type="users"
          title="👥 Usuários - Ordenados por Posts"
          initialData={users.sort((a: User, b: User) => b.postsCount - a.postsCount)}
          totalCount={totalUsers}
          gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        />

        <MemoryMonitor />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💡 Otimizações Implementadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                🚀 Carregamento Ultra Otimizado
              </h3>
              <ul className="text-sm space-y-1">
                <li>• Apenas dados iniciais carregados</li>
                <li>• API routes para paginação</li>
                <li>• Carregamento sob demanda</li>
                <li>• Cache de dados no servidor</li>
                <li>• Compressão de JSON</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ⚡ Performance Melhorada
              </h3>
              <ul className="text-sm space-y-1">
                <li>• Tempo de render: {renderTime}ms</li>
                <li>• Carregamento inicial otimizado</li>
                <li>• Paginação server-side</li>
                <li>• SEO mantido</li>
                <li>• Experiência fluida</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 