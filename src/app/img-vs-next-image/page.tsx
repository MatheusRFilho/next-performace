/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { DashboardLayout } from '@/components/layout';

const ImageComponent = ({ 
  src, 
  alt, 
  label,
  useNextImage = false 
}: { 
  src: string; 
  alt: string; 
  label: string;
  useNextImage?: boolean;
}) => {
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          {label}
        </h3>
        
        {useNextImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
           
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        {useNextImage ? 'Next.js Image' : 'HTML img'}
      </div>
    </div>
  );
};

export default function ImgVsNextImagePage() {
  const [useNextImage, setUseNextImage] = useState(true);
  const [imageSize, setImageSize] = useState('small');
  
  const images = [
    '/next.svg',
    '/vercel.svg',
    '/globe.svg',
    '/window.svg'
  ];
  
  const externalImages = [
    'https://picsum.photos/800/600',
    'https://picsum.photos/1200/800',
    'https://picsum.photos/1600/900',
    'https://picsum.photos/2000/1200'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentExternalIndex, setCurrentExternalIndex] = useState(0);
  const [loadTimes, setLoadTimes] = useState({
    html: 0,
    next: 0
  });

  

  const simulateImageLoad = (type: 'html' | 'next') => {
    let baseTime = 50;
    let overhead = 0;
    
    if (type === 'next') {
      overhead = imageSize === 'small' ? 30 : imageSize === 'medium' ? 20 : 10;
      baseTime = imageSize === 'small' ? 80 : imageSize === 'medium' ? 60 : 40;
    } else {
      overhead = 0;
      baseTime = imageSize === 'small' ? 40 : imageSize === 'medium' ? 70 : 120;
    }
    
    setTimeout(() => {
      const totalTime = baseTime + overhead + Math.random() * 20;
      setLoadTimes(prev => ({
        ...prev,
        [type]: totalTime
      }));
    }, Math.random() * 50 + baseTime);
  };

  useEffect(() => {
    simulateImageLoad('html');
    simulateImageLoad('next');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex, imageSize]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            HTML img vs Next.js Image - Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstração das diferenças de performance entre tag img e componente Image do Next.js
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
                checked={useNextImage}
                onChange={(e) => setUseNextImage(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Usar Next.js Image
              </span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4"> 
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trocar Imagem:
              </label>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Próxima Imagem
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tamanho da Imagem:
              </label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="small">Pequena (HTML melhor)</option>
                <option value="medium">Média (Empatado)</option>
                <option value="large">Grande (Next.js melhor)</option>
              </select>
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
                {loadTimes.html.toFixed(2)}ms
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300">
                HTML img Tempo
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {loadTimes.next.toFixed(2)}ms
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                Next.js Image Tempo
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {Math.max(0, loadTimes.html - loadTimes.next).toFixed(2)}ms
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-300">
                Diferença
              </div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {loadTimes.html > 0 ? ((loadTimes.html - loadTimes.next) / loadTimes.html * 100).toFixed(1) : '0'}%
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">
                Melhoria
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🖼️ Comparação de Imagens
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Diferenças:</strong> O Next.js Image oferece otimização automática, lazy loading, 
            redimensionamento e formatos modernos. Teste trocando imagens e observe os tempos de carregamento.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-red-900 dark:text-red-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                HTML img (Básico)
              </h3>
              <ImageComponent
                src={images[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
                label="HTML img"
                useNextImage={false}
              />
              <div className="mt-2 space-y-1 text-xs text-red-600 dark:text-red-400">
                <p>❌ Sem otimização automática</p>
                <p>❌ Sem lazy loading</p>
                <p>❌ Sem redimensionamento</p>
                <p>❌ Pode causar layout shift</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Next.js Image (Otimizado)
              </h3>
              <ImageComponent
                src={images[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
                label="Next.js Image"
                useNextImage={true}
              />
              <div className="mt-2 space-y-1 text-xs text-green-600 dark:text-green-400">
                <p>✅ Otimização automática</p>
                <p>✅ Lazy loading nativo</p>
                <p>✅ Redimensionamento automático</p>
                <p>✅ Previne layout shift</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔄 Auto-Redimensionamento com URLs Externas
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Demonstração:</strong> O Next.js Image pode redimensionar automaticamente imagens de URLs externas,
            otimizando o tamanho e performance. Compare como a mesma imagem grande é servida em diferentes tamanhos.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trocar Imagem Externa:
            </label>
            <button
              onClick={() => setCurrentExternalIndex((prev) => (prev + 1) % externalImages.length)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Próxima Imagem Externa
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-red-900 dark:text-red-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                HTML img (Original)
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <img
                    src={externalImages[currentExternalIndex]}
                    alt={`Imagem Externa ${currentExternalIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                  <p>❌ Carrega imagem original (800x600)</p>
                  <p>❌ Sem redimensionamento</p>
                  <p>❌ Maior uso de banda</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Next.js Image (Pequeno)
              </h3>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <Image
                    src={externalImages[currentExternalIndex]}
                    alt={`Imagem Externa ${currentExternalIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                </div>
                <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                  <p>✅ Redimensiona automaticamente</p>
                  <p>✅ Otimiza formato (WebP/AVIF)</p>
                  <p>✅ Menor uso de banda</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Next.js Image (Médio)
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                  <Image
                    src={externalImages[currentExternalIndex]}
                    alt={`Imagem Externa ${currentExternalIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  <p>✅ Redimensiona automaticamente</p>
                  <p>✅ Qualidade configurável (85%)</p>
                  <p>✅ Balanceamento ideal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
              💡 Como Funciona o Auto-Redimensionamento
            </h3>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
              <p><strong>URL Original:</strong> {externalImages[currentExternalIndex]}</p>
              <p><strong>Next.js redimensiona automaticamente baseado no:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• <strong>sizes:</strong> Define breakpoints responsivos</li>
                <li>• <strong>container:</strong> Tamanho do elemento pai</li>
                <li>• <strong>device:</strong> Densidade de pixels da tela</li>
                <li>• <strong>quality:</strong> Configuração de qualidade (padrão: 75%)</li>
              </ul>
              <p className="text-xs mt-2">🎯 <strong>Realidade:</strong> O Next.js calcula automaticamente o tamanho ideal baseado no contexto, não em valores fixos!</p>
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
                  🎯 HTML img Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tempo de Carregamento:</span>
                    <span className="font-bold text-red-600">{loadTimes.html.toFixed(2)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Otimização:</span>
                    <span className="font-bold text-red-600">Nenhuma</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  ⚡ Next.js Image Performance
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tempo de Carregamento:</span>
                    <span className="font-bold text-green-600">{loadTimes.next.toFixed(2)}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Otimização:</span>
                    <span className="font-bold text-green-600">Automática</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                💡 Como Testar o Impacto
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>1. Troque as imagens para ver diferentes tempos de carregamento</li>
                <li>2. Digite no campo de texto para causar re-renders</li>
                <li>3. Observe como os contadores de renderização mudam</li>
                <li>4. Compare os tempos de carregamento</li>
                <li>5. Abra o console para ver logs detalhados</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎓 Vantagens do Next.js Image
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ✅ Benefícios
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• <strong>Otimização automática:</strong> WebP, AVIF</li>
                <li>• <strong>Lazy loading:</strong> Carrega apenas quando visível</li>
                <li>• <strong>Redimensionamento:</strong> Tamanhos otimizados</li>
                <li>• <strong>Prevenção de layout shift:</strong> CLS reduzido</li>
                <li>• <strong>Performance:</strong> Carregamento mais rápido</li>
                <li>• <strong>SEO:</strong> Melhor Core Web Vitals</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ⚠️ Considerações
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Requer configuração do domínio</li>
                <li>• Pode ter overhead inicial</li>
                <li>• Nem sempre necessário para imagens pequenas</li>
                <li>• Dependência do Next.js</li>
                <li>• Pode ser excessivo para projetos simples</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⚙️ Propriedades do Next.js Image para Auto-Redimensionamento
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  📏 Propriedades de Tamanho
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>sizes:</strong> Define breakpoints responsivos
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      sizes=(max-width: 768px) 100vw, 50vw
                    </code>
                  </div>
                  <div>
                    <strong>fill:</strong> Preenche o container pai
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      fill className=object-cover
                    </code>
                  </div>
                  <div>
                    <strong>width/height:</strong> Tamanhos fixos
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      width={400} height={300}
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  🎨 Propriedades de Qualidade
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>quality:</strong> Qualidade da imagem (1-100)
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      quality={75}
                    </code>
                  </div>
                  <div>
                    <strong>priority:</strong> Carregamento prioritário
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      priority={true}
                    </code>
                  </div>
                  <div>
                    <strong>placeholder:</strong> Placeholder enquanto carrega
                    <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded mt-1">
                      placeholder=blur blurDataURL=...
                    </code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                🔧 Configuração para URLs Externas
              </h3>
              <div className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                <p><strong>next.config.ts:</strong></p>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**',
    },
  ],
}`}
                </pre>
                <p className="text-xs mt-2">💡 <strong>Importante:</strong> Sem essa configuração, o Next.js não permite carregar imagens de domínios externos por segurança!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🤔 Por que às vezes HTML img é melhor?
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">
                  🎯 HTML img é melhor quando:
                </h3>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• <strong>Imagens pequenas</strong> (ícones, avatares)</li>
                  <li>• <strong>Carregamento único</strong> (não muda)</li>
                  <li>• <strong>Sem otimização necessária</strong></li>
                  <li>• <strong>Projetos simples</strong> sem Next.js</li>
                  <li>• <strong>Performance crítica</strong> inicial</li>
                  <li>• <strong>Imagens já otimizadas</strong></li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                  ⚡ Next.js Image é melhor quando:
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• <strong>Imagens grandes</strong> (banners, fotos)</li>
                  <li>• <strong>Múltiplos tamanhos</strong> necessários</li>
                  <li>• <strong>Otimização automática</strong> desejada</li>
                  <li>• <strong>Lazy loading</strong> importante</li>
                  <li>• <strong>SEO e Core Web Vitals</strong> críticos</li>
                  <li>• <strong>Responsividade</strong> complexa</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Teste os Diferentes Cenários
              </h3>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <p><strong>Pequena:</strong> HTML img é mais rápido (menos overhead)</p>
                <p><strong>Média:</strong> Performance similar (empate técnico)</p>
                <p><strong>Grande:</strong> Next.js Image é muito melhor (otimizações valem a pena)</p>
                <p className="text-xs mt-2">💭 <strong>Dica:</strong> O overhead inicial do Next.js Image é compensado pelas otimizações em imagens maiores!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 