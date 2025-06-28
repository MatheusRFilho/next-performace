import { DashboardLayout } from '@/components/layout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Next.js Performance Testing
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Uma plataforma dedicada ao estudo e otimização de performance em aplicações Next.js
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🚀 Performance</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">⚡ Otimização</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">📊 Métricas</span>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm font-medium">🔧 Next.js</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sobre o Projeto
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Este projeto foi desenvolvido para explorar e demonstrar as capacidades de performance 
              do Next.js, incluindo técnicas de otimização, métricas de carregamento e estratégias 
              para melhorar a experiência do usuário.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Através de testes controlados e análises detalhadas, buscamos entender como diferentes 
              configurações e implementações afetam o desempenho das aplicações web modernas.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Objetivos
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Analisar métricas de performance do Next.js
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Implementar técnicas de otimização
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Comparar diferentes estratégias de carregamento
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Documentar melhores práticas
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Stack Tecnológico
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="font-medium text-gray-900 dark:text-white">React</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">19.0.0</div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl mb-2">▲</div>
              <div className="font-medium text-gray-900 dark:text-white">Next.js</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">15.3.4</div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium text-gray-900 dark:text-white">Tailwind CSS</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">4.0</div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-medium text-gray-900 dark:text-white">TypeScript</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">5.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
