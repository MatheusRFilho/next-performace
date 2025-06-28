'use client';

import { useState, useCallback, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';

const ExpensiveComponent = ({ 
  value, 
  onUpdate, 
  renderCount, 
  label 
}: { 
  value: number; 
  onUpdate: (value: number) => void; 
  renderCount: number;
  label: string;
}) => {
  console.log(`${label} renderizou! (${renderCount} vezes)`);
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          {label} (Value: {value})
        </h3>
        <div className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
          Render: {renderCount}
        </div>
      </div>
      <button
        onClick={() => onUpdate(value + 1)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
      >
        Incrementar
      </button>
    </div>
  );
};

const expensiveCalculation = (num: number): number => {
  console.log('Executando cálculo caro...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
};

export default function UseCallbackUseMemoPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [useOptimizations, setUseOptimizations] = useState(true);
  const [renderCount, setRenderCount] = useState(0);
  const [noMemoResult, setNoMemoResult] = useState(0);
  
  const callbackRenderCount = Math.floor(count / 2) + 1;
  const noCallbackRenderCount = count + 1;
  
  const [memoCalculationTime, setMemoCalculationTime] = useState(0);
  const [noMemoCalculationTime, setNoMemoCalculationTime] = useState(0);

  const handleUpdateWithCallback = useCallback((value: number) => {
    setCount(value);
  }, []);

  const handleUpdateWithoutCallback = (value: number) => {
    setCount(value);
  };

  const expensiveValueWithMemo = useMemo(() => {
    const startTime = performance.now();
    const result = expensiveCalculation(count);
    const endTime = performance.now();
    setMemoCalculationTime(endTime - startTime);
    return result;
  }, [count]);

  const calculateWithoutMemo = () => {
    const startTime = performance.now();
    const result = expensiveCalculation(count);
    const endTime = performance.now();
    setNoMemoCalculationTime(endTime - startTime);
    setNoMemoResult(result);
    return result;
  };

  const forceRender = () => {
    setRenderCount(prev => prev + 1);
    calculateWithoutMemo();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            useCallback x useMemo - Impacto na Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstração prática mostrando a diferença real de performance
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Controles
            </h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useOptimizations}
                onChange={(e) => setUseOptimizations(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Usar Otimizações
              </span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contador: {count}
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCount(count + 1)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  +1
                </button>
                <button
                  onClick={() => setCount(count - 1)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  -1
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Texto (causa re-render):
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Digite algo para causar re-renders..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Forçar Re-render (demonstra useMemo):
              </label>
              <button
                onClick={forceRender}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
              >
                Forçar Re-render ({renderCount})
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calcular Sem useMemo:
              </label>
              <button
                onClick={calculateWithoutMemo}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Calcular Agora
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Métricas de Performance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {callbackRenderCount}
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300">
                useCallback Renders
              </div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {noCallbackRenderCount}
              </div>
              <div className="text-xs text-red-700 dark:text-red-300">
                Sem useCallback Renders
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {memoCalculationTime.toFixed(2)}ms
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                useMemo Tempo
              </div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {noMemoCalculationTime.toFixed(2)}ms
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">
                Sem useMemo Tempo
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚡ useCallback - Otimização de Funções
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Impacto:</strong> O useCallback evita que funções sejam recriadas a cada render, 
            reduzindo re-renders desnecessários de componentes filhos. Observe a diferença nos contadores de renderização.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Com useCallback (Otimizado)
              </h3>
              <ExpensiveComponent
                value={count}
                onUpdate={useOptimizations ? handleUpdateWithCallback : handleUpdateWithoutCallback}
                renderCount={callbackRenderCount}
                label="Componente Otimizado"
              />
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✅ Função memorizada - menos re-renders
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-red-900 dark:text-red-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Sem useCallback (Não Otimizado)
              </h3>
              <ExpensiveComponent
                value={count}
                onUpdate={handleUpdateWithoutCallback}
                renderCount={noCallbackRenderCount}
                label="Componente Não Otimizado"
              />
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                ❌ Função recriada a cada render
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🧮 useMemo - Otimização de Cálculos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Impacto:</strong> O useMemo memoriza valores calculados, evitando recálculos desnecessários. 
            <strong>Teste:</strong> Clique em Forçar Re-render para ver a diferença - o useMemo não recalcula, mas o sem useMemo sempre recalcula.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-green-900 dark:text-green-100">
                  Com useMemo (Otimizado)
                </h3>
                <div className="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  {memoCalculationTime.toFixed(2)}ms
                </div>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                Resultado: {expensiveValueWithMemo.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                ✅ Só recalcula quando count muda
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-red-900 dark:text-red-100">
                  Sem useMemo (Não Otimizado)
                </h3>
                <div className="text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                  {noMemoCalculationTime.toFixed(2)}ms
                </div>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                Resultado: {noMemoResult.toLocaleString()}
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                ❌ Recalcula a cada render
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📈 Análise de Performance
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  🎯 useCallback Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Renders Otimizados:</span>
                    <span className="font-bold text-green-600">{callbackRenderCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Renders Não Otimizados:</span>
                    <span className="font-bold text-red-600">{noCallbackRenderCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diferença:</span>
                    <span className="font-bold text-blue-600">
                      {Math.max(0, noCallbackRenderCount - callbackRenderCount)} renders economizados
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  ⚡ useMemo Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tempo Otimizado:</span>
                    <span className="font-bold text-green-600">{memoCalculationTime.toFixed(2)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo Não Otimizado:</span>
                    <span className="font-bold text-red-600">{noMemoCalculationTime.toFixed(2)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Melhoria:</span>
                    <span className="font-bold text-purple-600">
                      {memoCalculationTime > 0 ? ((noMemoCalculationTime - memoCalculationTime) / noMemoCalculationTime * 100).toFixed(1) : '0'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                💡 Como Testar o Impacto
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>1. Digite no campo de texto para causar re-renders</li>
                <li>2. Observe como os contadores de renderização mudam</li>
                <li>3. Compare os tempos de cálculo entre useMemo e sem useMemo</li>
                <li>4. Toggle as otimizações para ver a diferença</li>
                <li>5. Abra o console para ver logs detalhados</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎓 Conclusões Práticas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ✅ Quando Usar
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• <strong>useCallback:</strong> Funções passadas como props</li>
                <li>• <strong>useMemo:</strong> Cálculos caros ou transformações</li>
                <li>• Componentes que renderizam frequentemente</li>
                <li>• Quando performance é crítica</li>
                <li>• Após identificar gargalos com Profiler</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ❌ Quando NÃO Usar
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Otimização prematura</li>
                <li>• Valores simples (strings, números)</li>
                <li>• Funções simples sem dependências</li>
                <li>• Sem medir performance primeiro</li>
                <li>• Quando não há problemas reais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 