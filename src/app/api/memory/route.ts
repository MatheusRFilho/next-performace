import { NextResponse } from 'next/server';
import { getMemoryUsage, formatMemoryUsage } from '@/lib/memory-monitor';

export async function GET() {
  try {
    const memory = getMemoryUsage();
    
    return NextResponse.json({
      memory,
      formatted: formatMemoryUsage(memory),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao obter métricas de memória:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 