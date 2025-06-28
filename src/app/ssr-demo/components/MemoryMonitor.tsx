'use client';

import { useState, useEffect } from 'react';
import type { MemoryUsage } from '@/lib/memory-monitor';

interface MemoryData {
  memory: MemoryUsage;
  formatted: string;
  timestamp: string;
}

export function MemoryMonitor() {
  const [memoryData, setMemoryData] = useState<MemoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemoryData = async () => {
    try {
      const response = await fetch('/api/memory');
      if (!response.ok) throw new Error('Erro ao carregar dados de memória');
      
      const data: MemoryData = await response.json();
      setMemoryData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemoryData();
    
    const interval = setInterval(fetchMemoryData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🧠 Monitor de Memória
        </h2>
        <div className="text-center text-gray-500 dark:text-gray-400">
          Carregando métricas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🧠 Monitor de Memória
        </h2>
        <div className="text-center text-red-500">
          Erro: {error}
        </div>
      </div>
    );
  }

  if (!memoryData) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🧠 Monitor de Memória (Tempo Real)
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {memoryData.memory.rss}MB
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            RSS
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {memoryData.memory.heapUsed}MB
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Heap Usado
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
            {memoryData.memory.heapTotal}MB
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Heap Total
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {memoryData.memory.external}MB
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            External
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Última atualização: {new Date(memoryData.timestamp).toLocaleTimeString()}
      </div>
      
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        <div className="font-semibold mb-1">Detalhes:</div>
        <div>RSS: Memória total alocada pelo processo</div>
        <div>Heap: Memória gerenciada pelo V8 JavaScript</div>
        <div>External: Memória usada por objetos C++ vinculados</div>
      </div>
    </div>
  );
} 