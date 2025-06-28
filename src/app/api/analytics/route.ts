import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Analytics } from '../types';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'app', 'api', 'data');
    const analyticsRaw = await fs.readFile(path.join(dataDir, 'analytics.json'), 'utf-8');
    const analytics: Analytics = JSON.parse(analyticsRaw);
    
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Erro ao carregar analytics:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 