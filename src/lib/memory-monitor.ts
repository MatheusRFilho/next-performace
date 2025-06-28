import { performance } from 'perf_hooks';

export interface MemoryUsage {
  rss: number;
  heapTotal: number;
  heapUsed: number; 
  external: number;
  arrayBuffers: number; 
}

export interface PerformanceMetrics {
  memoryBefore: MemoryUsage;
  memoryAfter: MemoryUsage;
  memoryDelta: MemoryUsage;
  executionTime: number;
  dataSize: number;
}

export function getMemoryUsage(): MemoryUsage {
  const usage = process.memoryUsage();
  return {
    rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100,
    heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100,
    heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100, 
    external: Math.round(usage.external / 1024 / 1024 * 100) / 100, 
    arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024 * 100) / 100
  };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatMemoryUsage(memory: MemoryUsage): string {
  return `RSS: ${memory.rss}MB | Heap: ${memory.heapUsed}MB/${memory.heapTotal}MB | External: ${memory.external}MB`;
}

export async function measureMemoryUsage<T>(
  operation: () => Promise<T>,
  dataSize?: number
): Promise<{ result: T; metrics: PerformanceMetrics }> {
  const memoryBefore = getMemoryUsage();
  const startTime = performance.now();
  
  const result = await operation();
  
  const endTime = performance.now();
  const memoryAfter = getMemoryUsage();
  
  const memoryDelta: MemoryUsage = {
    rss: Math.round((memoryAfter.rss - memoryBefore.rss) * 100) / 100,
    heapTotal: Math.round((memoryAfter.heapTotal - memoryBefore.heapTotal) * 100) / 100,
    heapUsed: Math.round((memoryAfter.heapUsed - memoryBefore.heapUsed) * 100) / 100,
    external: Math.round((memoryAfter.external - memoryBefore.external) * 100) / 100,
    arrayBuffers: Math.round((memoryAfter.arrayBuffers - memoryBefore.arrayBuffers) * 100) / 100
  };
  
  return {
    result,
    metrics: {
      memoryBefore,
      memoryAfter,
      memoryDelta,
      executionTime: Math.round((endTime - startTime) * 100) / 100,
      dataSize: dataSize || 0
    }
  };
}