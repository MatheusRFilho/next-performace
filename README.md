# 🚀 Next.js Performance Demonstrations

Um projeto educacional que demonstra técnicas de otimização de performance no Next.js e React, com exemplos práticos e interativos.

**🌐 Demo Online:** [https://next-performace.vercel.app/](https://next-performace.vercel.app/)

## 📋 Sobre o Projeto

Este projeto foi criado para demonstrar e comparar diferentes técnicas de otimização de performance, incluindo:

- **useCallback vs useMemo**: Demonstração prática dos hooks de otimização do React
- **HTML img vs Next.js Image**: Comparação de performance entre tag img e componente Image
- **Auto-redimensionamento**: Exemplos de otimização automática de imagens

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.3.4** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Hooks** - useCallback, useMemo, useState, useEffect

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

## 📊 Métricas de Performance

O projeto inclui demonstrações de:
- **Tempo de renderização** - Comparação entre otimizado e não otimizado
- **Contadores de re-render** - Visualização de impactos
- **Tempo de carregamento** - Análise de performance de imagens
- **Uso de banda** - Economia com otimizações

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
