import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOTAL_USERS = 100000;
const TOTAL_POSTS = 100000;

const names = [
  'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Ferreira',
  'Lucia Rodrigues', 'Fernando Alves', 'Patricia Lima', 'Roberto Gomes', 'Juliana Martins',
  'Ricardo Pereira', 'Camila Souza', 'Andre Carvalho', 'Fernanda Ribeiro', 'Marcos Dias',
  'Beatriz Lima', 'Thiago Santos', 'Carolina Costa', 'Rafael Oliveira', 'Isabela Ferreira',
  'Gabriel Rodrigues', 'Mariana Alves', 'Lucas Lima', 'Sofia Gomes', 'Matheus Martins',
  'Valentina Pereira', 'Enzo Souza', 'Alice Carvalho', 'Miguel Ribeiro', 'Helena Dias'
];

const titles = [
  'Como otimizar performance no Next.js',
  'Melhores práticas de SSR',
  'Guia completo de SEO',
  'Técnicas avançadas de caching',
  'Otimização de imagens na web',
  'Estratégias de lazy loading',
  'Monitoramento de performance',
  'Debugging de aplicações React',
  'Arquitetura de micro-frontends',
  'Implementação de PWA',
  'TypeScript para React',
  'Testes automatizados',
  'Deploy em produção',
  'CI/CD pipelines',
  'Monitoramento de erros',
  'Acessibilidade web',
  'Performance mobile',
  'SEO técnico',
  'Analytics avançado',
  'Segurança em aplicações web'
];

const contents = [
  'Este é um artigo detalhado sobre como otimizar a performance de aplicações Next.js...',
  'Server-Side Rendering é uma técnica poderosa que melhora significativamente a experiência do usuário...',
  'SEO é fundamental para o sucesso de qualquer aplicação web...',
  'Caching é uma das estratégias mais eficazes para melhorar performance...',
  'Otimização de imagens pode reduzir drasticamente o tempo de carregamento...',
  'Lazy loading é essencial para aplicações com muito conteúdo...',
  'Monitoramento contínuo é crucial para manter a performance...',
  'Debugging eficiente pode economizar horas de desenvolvimento...',
  'Micro-frontends oferecem escalabilidade e manutenibilidade...',
  'PWA transforma sua aplicação web em uma experiência nativa...',
  'TypeScript adiciona tipagem estática ao JavaScript...',
  'Testes automatizados garantem qualidade e confiabilidade...',
  'Deploy em produção requer cuidados especiais...',
  'CI/CD automatiza o processo de entrega...',
  'Monitoramento de erros é essencial em produção...',
  'Acessibilidade torna sua aplicação inclusiva...',
  'Performance mobile é crítica para o sucesso...',
  'SEO técnico melhora a indexação...',
  'Analytics fornece insights valiosos...',
  'Segurança deve ser prioridade em qualquer aplicação...'
];

const tags = ['Next.js', 'React', 'Performance', 'SEO', 'Caching', 'Optimization', 'Web Development', 'JavaScript', 'TypeScript', 'Frontend', 'Backend', 'Mobile', 'Testing', 'Deployment', 'Security'];

function generateUsers() {
  console.log('Gerando usuários...');
  const users = [];
  
  for (let i = 0; i < TOTAL_USERS; i++) {
    const nameIndex = i % names.length;
    const nameNumber = Math.floor(i / names.length) + 1;
    const name = names[nameIndex] + (nameNumber > 1 ? ` ${nameNumber}` : '');
    
    users.push({
      id: i + 1,
      name: name,
      email: `user${i + 1}@example.com`,
      avatar: `https://picsum.photos/50/50?random=${i + 1}`,
      postsCount: Math.floor(Math.random() * 100) + 1,
      followers: Math.floor(Math.random() * 5000) + 10
    });
  }
  
  return users;
}

function generatePosts(users) {
  console.log('Gerando posts...');
  const posts = [];
  
  for (let i = 0; i < TOTAL_POSTS; i++) {
    const titleIndex = i % titles.length;
    const titleNumber = Math.floor(i / titles.length) + 1;
    const title = titles[titleIndex] + (titleNumber > 1 ? ` - Parte ${titleNumber}` : '');
    
    const contentIndex = i % contents.length;
    const content = contents[contentIndex] + ` Este é o post número ${i + 1} com conteúdo detalhado sobre o assunto.`;
    
    const postTags = tags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
    
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const author = users[randomUserIndex];
    
    posts.push({
      id: i + 1,
      title: title,
      content: content,
      author: author,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 1000) + 10,
      comments: [],
      tags: postTags,
      readTime: Math.floor(Math.random() * 20) + 3
    });
  }
  
  return posts;
}

function generateAnalytics(posts, users) {
  console.log('Gerando analytics...');
  
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);
  
  const allTags = posts.flatMap(post => post.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const recentActivity = posts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20)
    .map(post => `${post.author.name} publicou "${post.title}"`);

  return {
    totalPosts: posts.length,
    totalUsers: users.length,
    totalComments,
    averageLikes: Math.round(totalLikes / posts.length),
    averageComments: Math.round(totalComments / posts.length),
    topTags,
    recentActivity
  };
}

async function generateData() {
  console.log('🚀 Iniciando geração de dados massivos...');
  
  const startTime = Date.now();
  
  const users = generateUsers();
  const posts = generatePosts(users);
  const analytics = generateAnalytics(posts, users);
  
  const dataDir = path.join(__dirname, '..', 'src', 'app', 'ssr-demo', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  console.log('Salvando arquivos...');
  
  fs.writeFileSync(
    path.join(dataDir, 'users.json'),
    JSON.stringify(users, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'posts.json'),
    JSON.stringify(posts, null, 2)
  );
  
  fs.writeFileSync(
    path.join(dataDir, 'analytics.json'),
    JSON.stringify(analytics, null, 2)
  );
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log('✅ Dados gerados com sucesso!');
  console.log(`📊 Estatísticas:`);
  console.log(`   - ${users.length.toLocaleString()} usuários`);
  console.log(`   - ${posts.length.toLocaleString()} posts`);
  console.log(`   - ${analytics.totalComments.toLocaleString()} comentários`);
  console.log(`   - ${analytics.averageLikes.toLocaleString()} likes médios`);
  console.log(`⏱️  Tempo de geração: ${duration.toFixed(2)}s`);
  console.log(`📁 Arquivos salvos em: ${dataDir}`);
}

generateData().catch(console.error); 