# 🚀 Next.js Performance Demonstrations

Um projeto educacional que demonstra técnicas de otimização de performance no Next.js e React, com exemplos práticos e interativos.

**🌐 Demo Online:** [https://next-performace.vercel.app/](https://next-performace.vercel.app/)

## 📋 Sobre o Projeto

Este projeto foi criado para demonstrar e comparar diferentes técnicas de otimização de performance, incluindo:

- **useCallback vs useMemo**: Demonstração prática dos hooks de otimização do React
- **HTML img vs Next.js Image**: Comparação de performance entre tag img e componente Image
- **SSR com Dados Complexos**: Demonstração do poder do Server-Side Rendering com grandes volumes de dados
- **Auto-redimensionamento**: Exemplos de otimização automática de imagens

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.3.4** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Hooks** - useCallback, useMemo, useState, useEffect
- **Node.js APIs** - File System, Performance Hooks

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd next-performace

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📚 Páginas Disponíveis

### 🏠 Sobre
- Visão geral do projeto
- Introdução às técnicas de performance

### ⚡ useCallback x useMemo
- Demonstração interativa dos hooks de otimização
- Comparação de performance em tempo real
- Métricas de renderização e tempo de cálculo
- Exemplos práticos de quando usar cada hook

### 🖼️ HTML img vs Next.js Image
- Comparação entre tag img e componente Image
- Demonstração de auto-redimensionamento
- Análise de performance com URLs externas
- Configuração de otimização de imagens

### 🚀 SSR Demo - Dados Complexos
- Demonstração do poder do Server-Side Rendering
- Carregamento de 100.000+ posts e usuários
- Paginação server-side otimizada
- Monitoramento de memória em tempo real
- Carregamento sob demanda com API routes

## 🎯 Funcionalidades Principais

### useCallback x useMemo
- ✅ Contadores de renderização em tempo real
- ✅ Métricas de tempo de cálculo
- ✅ Toggle para ativar/desativar otimizações
- ✅ Análise quantitativa de performance
- ✅ Exemplos práticos de uso

### HTML img vs Next.js Image
- ✅ Comparação lado a lado
- ✅ Auto-redimensionamento com URLs externas
- ✅ Configuração de qualidade e tamanhos
- ✅ Métricas de tempo de carregamento
- ✅ Demonstração de otimizações automáticas

### SSR Demo - Dados Complexos
- ✅ **100.000+ posts e usuários** carregados via JSON
- ✅ **API Routes paginadas** para carregamento sob demanda
- ✅ **Monitoramento de memória** em tempo real
- ✅ **Carregamento incremental** com botão "Ver mais"
- ✅ **Métricas de performance** detalhadas
- ✅ **Otimização de dados** com carregamento inicial reduzido
- ✅ **Cache server-side** para melhor performance

## ⚙️ Configurações

### next.config.ts
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**',
    },
  ],
}
```

## 🧪 Como Testar

### useCallback x useMemo
1. Navegue para `/useCallbackxuseMemo`
2. Digite no campo de texto para causar re-renders
3. Observe os contadores de renderização
4. Compare os tempos de cálculo
5. Toggle as otimizações para ver a diferença

### HTML img vs Next.js Image
1. Navegue para `/img-vs-next-image`
2. Troque as imagens para ver diferentes cenários
3. Teste o auto-redimensionamento com URLs externas
4. Compare os tempos de carregamento
5. Redimensione a janela para testar responsividade

### SSR Demo - Dados Complexos
1. Navegue para `/ssr-demo`
2. Observe as métricas de performance inicial
3. Clique em "Carregar mais posts/usuários" para ver paginação
4. Monitore o uso de memória em tempo real
5. Compare o tempo de carregamento inicial vs incremental

## 📊 Métricas de Performance

O projeto inclui demonstrações de:
- **Tempo de renderização** - Comparação entre otimizado e não otimizado
- **Contadores de re-render** - Visualização de impactos
- **Tempo de carregamento** - Análise de performance de imagens
- **Uso de banda** - Economia com otimizações
- **Monitoramento de memória** - RSS, Heap, External, Array Buffers
- **Carregamento de dados massivos** - 100.000+ registros com paginação

## 🎓 Aprendizados

### useCallback
- **Quando usar**: Funções passadas como props
- **Benefício**: Evita re-criação de funções
- **Impacto**: Reduz re-renders desnecessários

### useMemo
- **Quando usar**: Cálculos caros ou transformações
- **Benefício**: Memoriza valores calculados
- **Impacto**: Evita recálculos desnecessários

### Next.js Image
- **Quando usar**: Imagens grandes ou responsivas
- **Benefício**: Otimização automática e lazy loading
- **Impacto**: Melhor performance e SEO

### SSR com Dados Complexos
- **Quando usar**: Aplicações com grandes volumes de dados
- **Benefício**: Carregamento otimizado e monitoramento de recursos
- **Impacto**: Melhor UX e performance com dados massivos

## 🔧 Arquitetura do SSR Demo

### Estrutura de Dados
```
src/app/api/data/
├── posts.json (100.000 posts)
├── users.json (100.000 usuários)
└── analytics.json (métricas agregadas)
```

### API Routes
- `/api/posts` - Paginação de posts com limite configurável
- `/api/users` - Paginação de usuários ordenados por atividade
- `/api/analytics` - Métricas agregadas em tempo real

### Monitoramento de Performance
- **Memory Monitor**: Monitoramento em tempo real de uso de memória
- **Performance Hooks**: Medição precisa de tempo de execução
- **Data Size Tracking**: Controle do tamanho dos dados carregados

### Otimizações Implementadas
- ✅ **Carregamento inicial reduzido** (12 posts, 20 usuários)
- ✅ **Paginação server-side** com API routes
- ✅ **Cache de dados** no servidor
- ✅ **Compressão de JSON** automática
- ✅ **Carregamento sob demanda** com botões interativos
- ✅ **Monitoramento de memória** detalhado
- ✅ **Métricas de performance** em tempo real

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🔗 Links Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

Desenvolvido com ❤️ para demonstrar técnicas de performance no Next.js
