'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Função para obter informações da página atual
  const getPageInfo = () => {
    switch (pathname) {
      case '/':
        return {
          title: 'Sobre',
          subtitle: 'Visão Geral',
          description: 'Página inicial do projeto de performance'
        };
      case '/use-callback-vs-use-memo':
        return {
          title: 'useCallback x useMemo',
          subtitle: 'Otimização de Performance',
          description: 'Demonstração dos hooks de otimização do React'
        };
      case '/img-vs-next-image':
        return {
          title: 'HTML img vs Next.js Image',
          subtitle: 'Comparação de Performance',
          description: 'Análise das diferenças entre tag img e componente Image'
        };
      default:
        return {
          title: 'Página',
          subtitle: 'Não Encontrada',
          description: 'Página não encontrada'
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {pageInfo.title}
          </h2>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300">{pageInfo.subtitle}</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {pageInfo.description}
        </div>
      </div>
    </header>
  );
} 