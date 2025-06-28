import { DashboardLayout } from '@/components/layout';
import type { Metadata } from 'next';

async function getServerData() {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    serverTime: new Date(Date.now()).toLocaleString('pt-BR'),
    randomData: Math.floor(Math.random() * 1000),
    userAgent: 'Server-Side Generated',
  };
}

async function getExternalData() {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    posts: [
      { id: 1, title: 'Post 1 - SSR', content: 'Conteúdo gerado no servidor', author: 'Server' },
      { id: 2, title: 'Post 2 - SSR', content: 'Mais conteúdo do servidor', author: 'Server' },
      { id: 3, title: 'Post 3 - SSR', content: 'Dados dinâmicos do servidor', author: 'Server' }
    ],
    totalPosts: 3,
    lastUpdated: new Date().toLocaleDateString('pt-BR')
  };
}

export const metadata: Metadata = {
  title: 'SSR - Next.js Performance',
  description: 'Server-Side Rendering no Next.js',
};

export default async function SSRDemoPage() {
  const serverData = await getServerData();
  const externalData = await getExternalData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-sm p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            SSR - Server-Side Rendering
          </h1>
          <p className="text-xl opacity-90 mb-6">
            O que é Server-Side Rendering?
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🚀 Server-Side</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">⚡ Performance</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🔍 SEO</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">📊 Dados Dinâmicos</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Dados Gerados no Servidor
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="font-medium">Server Time:</span>
                <span className="font-mono text-sm">{serverData.serverTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dados Aleatórios:</span>
                <span className="font-mono text-sm">{serverData.randomData}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">User Agent:</span>
                <span className="font-mono text-sm">{serverData.userAgent}</span>
              </div>
              
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Benefícios do SSR
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Melhor SEO - conteúdo indexável pelos motores de busca
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Performance inicial - HTML já renderizado
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Segurança - dados sensíveis no servidor
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Cache eficiente - páginas podem ser cacheadas
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Dados de API Externa ({externalData.totalPosts})
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Estes dados são buscados no servidor antes da renderização da página
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {externalData.posts.map((post) => (
              <div key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {post.content}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Autor: {post.author}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Última atualização: {externalData.lastUpdated}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Comparação: SSR vs CSR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                Server-Side Rendering (SSR)
              </h3>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Melhor SEO e indexação</li>
                <li>• Carregamento inicial mais rápido</li>
                <li>• Dados sensíveis no servidor</li>
                <li>• Cache eficiente de páginas</li>
              </ul>
            </div>
            <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                Client-Side Rendering (CSR)
              </h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Interatividade rica</li>
                <li>• Experiência SPA</li>
                <li>• Estado gerenciado no cliente</li>
                <li>• Atualizações em tempo real</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Informações Técnicas
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Como Funciona
              </h3>
              <p className="text-sm">
                O Next.js executa o componente no servidor, busca os dados necessários e retorna HTML já renderizado. 
                O JavaScript é hidratado no cliente para adicionar interatividade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quando Usar SSR
              </h3>
              <ul className="text-sm space-y-1">
                <li>• Páginas que precisam de SEO</li>
                <li>• Conteúdo estático ou pouco dinâmico</li>
                <li>• Quando performance inicial é crítica</li>
                <li>• Dados que devem ficar no servidor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 