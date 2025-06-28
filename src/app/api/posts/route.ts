import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '../types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const dataDir = path.join(process.cwd(), 'src', 'app', 'api', 'data');
    const postsRaw = await fs.readFile(path.join(dataDir, 'posts.json'), 'utf-8');
    const allPosts: Post[] = JSON.parse(postsRaw);

    const posts = allPosts.slice(offset, offset + limit);
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 