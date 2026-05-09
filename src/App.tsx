import React, { useState, useMemo, useEffect } from 'react';
import { 
  Check, 
  X, 
  MessageCircle, 
  Mail, 
  Smartphone, 
  Clock, 
  Target, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Plus,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { SocialProof } from './components/SocialProof';

// --- Components ---

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    className={`bg-brand-lime hover:bg-lime-400 text-black font-extrabold py-4 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 text-center shadow-lg uppercase tracking-tight ${className}`}
    {...props}
  >
    {children}
  </button>
);

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-3xl md:text-5xl font-black uppercase text-center leading-tight ${className}`}>
    {children}
  </h2>
);

const Card = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 ${className}`} {...props}>
    {children}
  </div>
);

// --- Page Sections ---

export default function App() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 in seconds

  useEffect(() => {
    // VTurb Player script
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/4d94dca7-0df9-4194-9402-62576c881508/players/69feaa705ecd720a09c951e9/v4/player.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (showUpsell && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showUpsell, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Meta Pixel Code
    const fbPixel = function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    };

    fbPixel(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    (window as any).fbq('init', '2146611192860732');
    (window as any).fbq('track', 'PageView');
  }, []);

  const trackIC = () => {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  };

  const trackPurchase = (value: number, name: string) => {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Purchase', {
        value: value,
        currency: 'BRL',
        content_name: name
      });
    }
  };

  const carouselImages = [
    "https://www.image2url.com/r2/default/images/1777337084037-1f2ff87f-b895-4b37-b711-717bdf832e21.blob",
    "https://www.image2url.com/r2/default/images/1777337122577-5d6b87ca-fd17-4093-a9c0-2fede5187f55.blob",
    "https://www.image2url.com/r2/default/images/1777326963015-ec9779fc-9a3a-427f-ac25-eaf771bce357.blob",
    "https://www.image2url.com/r2/default/images/1777326290465-87cdd7ee-7d0e-49bf-9f14-c2bd33a149f9.blob",
    "https://www.image2url.com/r2/default/images/1777172189294-ce35de3a-6a75-425c-aef7-a9a57c120ea9.blob",
    "https://www.image2url.com/r2/default/images/1777172225165-ce09d6f6-3e67-4439-9c81-942fde847fe6.blob",
    "https://www.image2url.com/r2/default/images/1777314399522-a07ad7b4-77d9-41fc-938c-7afb83cfec9d.blob",
    "https://www.image2url.com/r2/default/images/1777314449313-d7e6a032-9e87-4b11-9da3-cb010339e5da.blob",
    "https://www.image2url.com/r2/default/images/1777314500499-28a7bc78-e06d-4b72-9ac3-e978958f98f6.blob",
    "https://www.image2url.com/r2/default/images/1776910312707-48e0bbe9-8ceb-4fda-9f8d-93163d6ea3d4.png",
    "https://www.image2url.com/r2/default/images/1776910446818-4c6faa97-18ee-40cc-9fa3-bb4699cb8a85.png",
    "https://www.image2url.com/r2/default/images/1776910573175-e417d0d5-6558-4e90-a530-a0be10265858.png",
    "https://www.image2url.com/r2/default/images/1776910719819-1b1466c8-9957-4c6a-8e9e-07bc2a964f28.png"
  ];

  const bonuses = [
    { 
      id: 1, 
      label: "BÔNUS HOJE!", 
      title: "PROJETOS DE CONSTRUÇÃO RURAL", 
      desc: "Plantas detalhadas para galpões, cercas e pequenas pontes para otimizar sua estrutura.",
      img: "https://i.imgur.com/Fe1VTIy.jpeg"
    },
    { 
      id: 2, 
      label: "BÔNUS HOJE!", 
      title: "PLANILHA DE LUCRO POR ÁREA", 
      desc: "Ferramenta prática para calcular a viabilidade financeira de cada cultivo no seu terreno.",
      img: "https://i.imgur.com/H9c1DVf.jpeg"
    },
    { 
      id: 3, 
      label: "BÔNUS HOJE!", 
      title: "GUIA DE PLANTIO INTELIGENTE", 
      desc: "Técnicas de consórcio de culturas para maximizar a colheita em espaços reduzidos.",
      img: "https://i.imgur.com/Flx7K12.jpeg"
    },
    { 
      id: 4, 
      label: "BÔNUS HOJE!", 
      title: "MANUAL DE ENERGIA RURAL", 
      desc: "Como implementar soluções simples de energia solar e biodigestores no seu sítio.",
      img: "https://i.imgur.com/8OaS0ip.jpeg"
    },
  ];

  const faqData = [
    { q: "O que vem incluso no pacote?", a: "Você recebe +100 projetos de sítios produtivos com medidas reais, prontos para aplicar, além dos bônus exclusivos que ajudam na organização e no planejamento do seu terreno." },
    { q: "Como vou ter acesso ao material?", a: "O acesso é imediato após a confirmação do pagamento. Você recebe tudo no seu e-mail e pode começar na mesma hora." },
    { q: "O material é digital ou físico?", a: "É 100% digital. Você pode acessar pelo celular, computador ou tablet quando quiser." },
    { q: "Para quem é indicado esse material?", a: "Para qualquer pessoa que tem sítio, chácara ou terreno e quer organizar melhor, produzir mais e gerar renda sem ficar no improviso." },
    { q: "Preciso de conhecimento prévio para usar?", a: "Não. O material é simples, direto e feito para quem não sabe por onde começar." },
    { q: "Funciona para quem tem pouco espaço?", a: "Sim. Os projetos podem ser adaptados conforme o tamanho do seu terreno." },
    { q: "Qual a diferença entre o Plano Básico e o Completo?", a: "O básico te dá acesso aos projetos principais. O completo inclui todos os projetos + bônus + materiais extras para você aplicar com mais rapidez e segurança." },
    { q: "Vou precisar investir muito dinheiro para aplicar?", a: "Não necessariamente. Muitos projetos foram pensados para começar com pouco e ir evoluindo aos poucos." },
    { q: "E se eu não gostar do material?", a: "Você tem garantia. Se não fizer sentido pra você, pode pedir reembolso sem complicação." }
  ];

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('pt-BR');
  }, []);

  const getRedirectUrl = (baseUrl: string) => {
    const search = window.location.search;
    if (!search) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${search.substring(1)}`;
  };

  const scrollToOffer = () => {
    trackIC();
    const offerSection = document.getElementById('offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Header Banner */}
      <div className="bg-brand-red text-white py-2 text-center text-sm font-bold flex items-center justify-center gap-2">
        <Clock className="w-4 h-4" />
        OFERTA DISPONÍVEL APENAS HOJE, {currentDate}
      </div>

      {/* 2. Hero Section */}
      <section className="bg-gradient-hero pt-12 pb-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            +100 Projetos de Sítios Produtivos com Medidas Reais <br />
            <span className="text-brand-lime underline">Para Transformar Terra Parada em Fonte de Renda</span>
          </h1>

          <div className="w-full mb-8">
            <div dangerouslySetInnerHTML={{ __html: `
              <vturb-smartplayer id="vid-69feaa705ecd720a09c951e9" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>
            `}} />
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Pare de perder dinheiro com terra mal aproveitada. Use <span className="font-bold text-white">projetos prontos</span> e comece a organizar seu sítio ainda hoje.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-white/5 py-2 px-4 rounded-full border border-white/10">
              <Smartphone className="w-5 h-5 text-green-400" />
              <span className="text-sm">Receba tudo na hora no seu WhatsApp e e-mail</span>
            </div>
            <div className="flex gap-6">
              <img src="https://centraldaeducacao.site/assets/icon-whatsapp-Cl5KKOau.avif" className="w-10 h-10 object-contain" alt="WhatsApp" referrerPolicy="no-referrer" />
              <img src="https://i.imgur.com/9SMb1ES.jpeg" className="w-10 h-10 object-contain" alt="E-mail" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Carousel Section */}
      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <SectionTitle className="text-black">📖 Veja como são os <span className="bg-brand-lime px-2">projetos por dentro</span></SectionTitle>
            <p className="text-xl mt-4 text-center text-gray-600">+100 plantas profissionais com medidas reais, prontas para aplicar.</p>
          </div>
          
          <div className="relative overflow-hidden py-4">
            <motion.div 
              className="flex gap-6 w-max items-center"
              animate={{
                x: [0, -5512], // 13 images * (400px + 24px gap)
              }}
              transition={{
                duration: 35, // Adjusted for more images
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...carouselImages, ...carouselImages, ...carouselImages].map((img, i) => (
                <div key={i} className="shrink-0 w-[300px] md:w-[400px]">
                  <img 
                    src={img} 
                    alt={`Preview ${i}`}
                    className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="mb-4">O QUE VAI MUDAR <span className="border-b-4 border-brand-lime">NA SUA PROPRIEDADE</span></SectionTitle>
          <p className="text-center text-xl text-gray-400 mb-16 italic">Chega de improvisar — aqui você executa com clareza</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center text-center">
              <BookOpen className="w-10 h-10 text-brand-lime mb-4" />
              <h3 className="font-bold text-xl mb-2">PLANEJE COM VISÃO PROFISSIONAL</h3>
              <p className="text-sm text-gray-400">Pare de tentar adivinhar o que fazer com seu terreno. Agora você segue projetos prontos com divisão estratégica.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Check className="w-10 h-10 text-brand-lime mb-4" />
              <h3 className="font-bold text-xl mb-2">SAIBA ONDE COLOCAR CADA COISA</h3>
              <p className="text-sm text-gray-400">Casa, cultivo, animais, irrigação… tudo já posicionado para melhor fluxo e aproveitamento.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Zap className="w-10 h-10 text-brand-lime mb-4" />
              <h3 className="font-bold text-xl mb-2">PARE DE PERDER TEMPO</h3>
              <p className="text-sm text-gray-400">Sem erro, sem tentativa, sem desperdício. Projetos com medidas reais para aplicação direta.</p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Clock className="w-10 h-10 text-brand-lime mb-4" />
              <h3 className="font-bold text-xl mb-2">COMECE EM MINUTOS</h3>
              <p className="text-sm text-gray-400">Abra o projeto e aplique direto no seu terreno. Receba tudo na hora no WhatsApp e e-mail.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Comparison Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-black mb-12">Veja a diferença <span className="bg-brand-lime px-2">sem os projetos</span> e <span className="bg-brand-lime px-2">com os projetos</span></SectionTitle>
          
          <div className="flex justify-center mb-16">
            <img 
              src="https://i.imgur.com/Hb9wbIH.jpeg" 
              alt="Comparação Material" 
              className="w-full max-w-4xl h-auto rounded-3xl shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="bg-gray-100 p-8 flex flex-col items-center text-center">
              <div className="bg-white px-6 py-2 rounded-lg shadow-sm mb-6 border border-red-100">
                <h3 className="text-xl font-black uppercase text-red-600 flex items-center gap-2">
                  <X className="w-6 h-6" /> SEM OS PROJETOS
                </h3>
              </div>
              <ul className="space-y-4 text-left w-full">
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                   <X className="w-5 h-5 text-red-500 shrink-0" />
                   <span>Terra parada sem uso</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Não sabe por onde começar</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Mistura tudo sem organização</span>
                </li>
                <li className="flex gap-2 text-sm font-medium text-gray-700">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Depende de ideias soltas da internet</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 flex flex-col items-center text-center relative border-l border-gray-200">
              <div className="bg-brand-lime px-6 py-2 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                  <Check className="w-6 h-6" /> COM OS PROJETOS
                </h3>
              </div>
              <ul className="space-y-4 text-left w-full">
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-lime-500 shrink-0" />
                  <span>Terreno dividido com estratégia</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-lime-500 shrink-0" />
                  <span>Cada área com função clara</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-lime-500 shrink-0" />
                  <span>Mais produtividade e renda</span>
                </li>
                <li className="flex gap-2 text-sm font-bold text-gray-900">
                  <Check className="w-5 h-5 text-lime-500 shrink-0" />
                  <span>Planejamento profissional na mão</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Results Blue Section */}
      <section className="bg-brand-blue py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold mb-6">
            <Target className="w-4 h-4 text-brand-lime" /> RESULTADO NA HORA
          </div>
          <SectionTitle className="mb-6">VOCÊ VAI <span className="text-brand-lime">VER RESULTADO NA HORA</span></SectionTitle>
          <p className="text-xl text-gray-300 mb-12">Imagine olhar seu terreno e <span className="text-white font-bold">saber exatamente o que fazer</span> em cada parte.</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <img src="https://i.imgur.com/G6FpBli.jpeg" className="rounded-2xl" alt="Conquista" />
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-lime" />
                <span>Planeja tudo em poucos dias</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-lime" />
                <span>Organiza seu sítio com clareza</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-lime" />
                <span>Cria novas fontes de renda</span>
              </li>
              <li className="flex gap-3 items-center">
                <Check className="w-6 h-6 text-brand-lime" />
                <span>Para de depender de tentativa e erro</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Pain Point Red Section */}
      <section className="bg-brand-red py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            VOCÊ TEM UM SÍTIO… MAS ELE NÃO TE DÁ <span className="bg-white text-brand-red px-2">RETORNO</span>?
          </h2>
          <p className="text-xl mb-12">Não é falta de vontade. É falta de um plano. <span className="font-black">Esse material resolve isso.</span></p>
          
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Áreas paradas sem gerar nada</div>
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Dinheiro parado em terra sem produtividade</div>
            <div className="flex items-center gap-2"><X className="w-5 h-5" /> Falta de organização e medo de investir errado</div>
          </div>
          
          <Button onClick={scrollToOffer} className="max-w-lg w-full flex items-center justify-center gap-2">
            QUERO TRANSFORMAR MINHA TERRA <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* 8. Ideal For Section */}
      <section className="bg-white text-black py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionTitle className="text-black mb-16">IDEAL PARA VOCÊ <br /> QUE:</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Tem sítio ou terreno e quer gerar renda", desc: "Você tem a terra, mas ela está parada ou subutilizada. Nossos projetos mostram como rentabilizar cada metro." },
              { icon: Clock, title: "Não sabe como dividir a área", desc: "Dúvida sobre onde plantar, onde criar animais ou onde construir? Os layouts resolvem a organização do espaço." },
              { icon: Target, title: "Quer parar de perder dinheiro", desc: "Investir sem plano é prejuízo certo. Com medidas reais, você evita gastos desnecessários com erro de execução." },
              { icon: MessageCircle, title: "Quer algo pronto e aplicável", desc: "Sem teorias complexas. Você recebe a planta, pega a trena e começa a marcar seu novo sítio produtivo." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-start gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-2xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-lg leading-tight uppercase">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Kit Content Breakdown (The big one in the middle) */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-brand-lime text-black px-6 py-2 rounded-full inline-flex items-center gap-2 font-black text-sm mb-12 mx-auto">
            <Check className="w-4 h-4" /> TUDO ISSO ESTÁ INCLUSO NO SEU KIT
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[3rem] p-8 md:p-16 text-black items-center">
            <div className="relative">
              <img src="https://i.imgur.com/td8Wxbl.png" className="w-full h-auto rounded-3xl shadow-2xl" alt="Kit Contents" referrerPolicy="no-referrer" />
              <div className="absolute -top-4 -left-4 bg-brand-red text-white py-2 px-6 rounded-xl font-bold transform -rotate-3">
                ACESSO IMEDIATO
              </div>
            </div>
            
            <div>
              <div className="bg-brand-lime/10 text-lime-600 px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                ITEM 01
              </div>
              <h3 className="text-4xl font-black mb-6 uppercase leading-tight">
                KIT +100 PROJETOS <br /> DE SÍTIO PRODUTIVO
              </h3>
              <p className="font-bold mb-8 italic">O guia prático para transformar sua terra em um negócio lucrativo.</p>
              
              <ul className="space-y-4">
                {[
                  "Projetos com Medidas Reais",
                  "Layout completo e estratégico do terreno",
                  "Planos de Divisão por Produção",
                  "Para gado, hortas, pomares e agrofloresta",
                  "Plantas Prontas para Imprimir",
                  "Leve para o campo e comece a executar",
                  "Acesso Vitalício e Imediato",
                  "Compre uma vez e use para sempre em qualquer terreno",
                  "Atualizações Gratuitas",
                  "Sempre novos modelos de projetos inclusos"
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    {i % 2 === 0 ? <Check className="w-5 h-5 text-lime-500 shrink-0" /> : <div className="w-5 h-5" />}
                    <span className={i % 2 !== 0 ? "text-gray-500 text-xs pl-5" : "font-bold"}>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 flex flex-col items-center gap-2">
                <p className="font-black text-brand-red">+ 4 BÔNUS EXCLUSIVOS ABAIXO 👇</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9.5 Bonus Section Section Title Refinement */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">E NÃO PARA POR AÍ... <span className="text-brand-lime">TEM MAIS!</span></h2>
          <p className="text-gray-400 mb-12">Você também vai receber...</p>
          
          <div className="inline-flex items-center gap-2 bg-brand-lime text-black px-6 py-2 rounded-full font-extrabold text-sm mb-16">
            <Plus className="w-4 h-4" /> 4 BÔNUS EXCLUSIVOS
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bonuses.map(bonus => (
              <div key={bonus.id} className="bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img src={bonus.img} alt={bonus.title} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-lime text-black px-4 py-1 rounded-full font-black text-[10px] whitespace-nowrap shadow-lg">
                    #{bonus.id} - BÔNUS HOJE!
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full bg-white text-black text-left">
                  <h4 className="font-black text-lg leading-tight mb-4 uppercase">{bonus.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed grow">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing Section */}
      <section id="offer" className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle className="text-black mb-4 font-black">ESCOLHA SEU PLANO E <span className="text-brand-lime">COMECE AGORA</span></SectionTitle>
          <div className="bg-brand-red/10 text-brand-red px-6 py-2 rounded-full inline-flex items-center gap-2 font-bold mb-12">
            <Clock className="w-4 h-4" /> OFERTA DISPONÍVEL SOMENTE HOJE, {currentDate}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="border-2 border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center relative hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-black uppercase mb-8">PLANO BÁSICO</h3>
              <img src="https://i.imgur.com/td8Wxbl.png" className="w-48 mb-8" alt="Básico" />
              <ul className="space-y-4 mb-12 w-full text-left text-sm">
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> +100 Projetos de Sítio Produtivo</li>
                <li className="flex gap-2 text-gray-300 italic"><X className="w-5 h-5 text-gray-300 shrink-0" /> Sem os 4 Bônus Exclusivos</li>
              </ul>
              <div className="mt-auto">
                <p className="text-gray-400 line-through text-sm">de R$97,00 por:</p>
                <p className="text-4xl font-black text-brand-blue mb-2">R$9,90</p>
                <p className="text-xs text-gray-500 mb-8">pagamento único</p>
                <Button 
                  onClick={() => {
                    trackIC();
                    setShowUpsell(true);
                  }} 
                  className="w-full"
                >
                  QUERO O BÁSICO <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Complete Plan */}
            <div className="border-4 border-brand-lime rounded-[2.5rem] p-10 flex flex-col items-center relative bg-lime-50 shadow-2xl scale-105 z-10">
              <div className="absolute -top-4 bg-brand-lime text-black px-6 py-1 rounded-full font-black text-xs">
                MAIS VENDIDO - PLANO COMPLETO
              </div>
              <h3 className="text-2xl font-black uppercase mb-8">PLANO COMPLETO</h3>
              <img src="https://i.imgur.com/td8Wxbl.png" className="w-48 mb-8" alt="Completo" />
              <div className="bg-brand-blue text-white w-full py-2 px-4 rounded-xl text-xs font-bold mb-6 text-center">
                TODOS OS BÔNUS INCLUSOS
              </div>
              <ul className="space-y-2 mb-12 w-full text-left text-sm overflow-y-auto max-h-60">
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> +100 Projetos de Sítio Produtivo</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> Bônus #1: Construção Rural</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> Bônus #2: Planilha de Lucros</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> Bônus #3: Guia de Plantio Inteligente</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> Bônus #4: Manual de Energia Rural</li>
                <li className="flex gap-2"><Check className="w-5 h-5 text-lime-500 shrink-0" /> Acesso Vitalício</li>
              </ul>
              <div className="mt-auto">
                <p className="text-gray-400 line-through text-sm">de R$197,00 por:</p>
                <p className="text-5xl font-black text-brand-blue mb-2">R$27,00</p>
                <p className="text-sm font-bold text-lime-600 mb-8">MELHOR OPÇÃO - COMPLETO</p>
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Button 
                    onClick={() => {
                      trackPurchase(27.00, 'Plano Completo');
                      window.location.href = getRedirectUrl('https://pay.cakto.com.br/xzp55mc_870375');
                    }}
                    className="w-full bg-brand-lime hover:bg-[#A3E635] shadow-xl shadow-brand-lime/20 text-black font-bold"
                  >
                    QUERO ADQUIRIR O MEU <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
                <div className="mt-4">
                  <p className="text-brand-red font-black text-xs uppercase mb-1">
                    🔥 APROVEITE AGORA: Você não vai encontrar esse preço depois!
                  </p>
                  <p className="text-gray-500 text-[10px] font-bold">
                    7 dias de garantia incondicional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Guarantee Section */}
      <section className="bg-white text-black py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
          <img 
            src="https://centraldaeducacao.site/assets/garantia-7-dias-Cl5MZ2Dc.webp" 
            alt="Garantia de 7 dias" 
            className="w-32 h-auto flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-2xl font-black uppercase mb-2">GARANTIA INCONDICIONAL DE 7 DIAS</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Se por qualquer motivo você não ficar satisfeito com o material, basta solicitar o reembolso em até 7 dias após a compra e devolveremos <span className="font-bold text-black italic">100% do seu investimento</span>. Sem perguntas, sem burocracia.</p>
          </div>
        </div>
      </section>

      {/* 12. Testimonials Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SectionTitle className="text-black mb-12 uppercase">QUEM JÁ USOU, <span className="bg-brand-lime px-2">APROVOU</span></SectionTitle>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { name: "João Batista", role: "Produtor Rural — Uberaba MG", text: "Eu tinha um pedaço de terra aqui parado e não sabia nem por onde começar. Depois que peguei esses projetos, consegui organizar tudo e já comecei a ver resultado na produção." },
              { name: "Carlos Henrique", role: "Pequeno Produtor — Sinop MT", text: "Eu ficava só na tentativa e erro no sítio, perdia tempo e dinheiro. Com esses projetos prontos, consegui dividir melhor o terreno e hoje já tenho retorno vindo." },
              { name: "José Aparecido", role: "Aposentado Rural — Goiânia GO", text: "Antes eu olhava pro terreno e ficava perdido, não sabia o que fazer em cada parte. Agora já tenho tudo planejado e ficou muito mais fácil trabalhar." }
            ].map((t, i) => (
              <Card key={i} className="bg-gray-50 border-gray-100 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-brand-blue">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Step Process Section */}
      <section className="bg-brand-blue py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <SectionTitle className="mb-16">COMECE A ORGANIZAR <span className="text-brand-lime">EM MINUTOS</span></SectionTitle>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Escolha seu plano", desc: "Clique no botão e escolha o plano ideal para sua necessidade.", icon: MessageCircle },
              { title: "Receba o acesso", desc: "Em poucos segundos o material chega no seu WhatsApp e no seu e-mail.", icon: Smartphone },
              { title: "Abra os Projetos", desc: "Acesse pelo celular, tablet ou se preferir pela tela do computador.", icon: BookOpen },
              { title: "Aplique na Terra", desc: "Comece a organizar seu sítio e transformar sua terra em lucro.", icon: Target }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center group">
                <div className="w-16 h-16 bg-brand-lime text-black rounded-full flex items-center justify-center font-black text-2xl mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-lg mb-2 uppercase">{step.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <Button onClick={scrollToOffer} className="mt-16 w-full max-w-sm">QUERO MEU ACESSO AGORA <ChevronRight className="w-5 h-5" /></Button>
        </div>
      </section>

      {/* 14. FAQ Section */}
      <section className="bg-white text-black py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle className="text-black mb-12 uppercase">PERGUNTAS <span className="text-brand-lime">FREQUENTES</span></SectionTitle>
          
          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4">
                <button 
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-lg hover:text-blue-600 transition-colors"
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeFAQ === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFAQ === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-gray-600 text-sm">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-white text-black py-12 px-4 border-t border-gray-100 italic text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-black text-2xl mb-8">SÍTIO PRODUTIVO <span className="text-brand-blue">PRIME</span></h4>
          <p className="text-xs text-gray-500 mb-4 opacity-50 uppercase tracking-widest font-bold">© 2026 Sítio Produtivo Prime. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 text-[10px] text-gray-500 font-bold uppercase mb-8 not-italic">
            <a href="#" className="hover:text-black">Termos de Uso</a>
            <a href="#" className="hover:text-black">Políticas de Privacidade</a>
          </div>
          <p className="text-[10px] text-gray-600 max-w-2xl mx-auto leading-relaxed not-italic">
            Este site não é afiliado ao Meta, Facebook ou Instagram. Depois que você sair do Instagram ou Facebook, a responsabilidade não é deles e sim do nosso site. Trabalhamos para que você tenha a melhor experiência possível.
          </p>
        </div>
      </footer>
      <SocialProof />

      {/* Upsell Popup */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpsell(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-900 border border-brand-lime/20 w-full max-w-lg rounded-[2rem] p-8 md:p-12 text-center shadow-2xl shadow-brand-lime/10 overflow-hidden"
            >
              {/* Highlight Background Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-brand-lime" />
              
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 leading-tight">
                ESPERA, PATRÃO… <br />
                <span className="text-brand-lime">NÃO COMPRA AINDA</span>
              </h2>
              
              <p className="text-zinc-400 font-medium mb-6 text-sm md:text-base px-4">
                Por praticamente o mesmo valor, você leva tudo completo e evita erro no seu sítio
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red px-4 py-2 rounded-xl flex items-center gap-2 font-black text-xs md:text-sm">
                  <Clock className="w-4 h-4 animate-pulse" />
                  A oferta expira em: {formatTime(timeLeft)}
                </div>
              </div>
              
              <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                {[
                  "+100 Projetos + Bônus Exclusivos",
                  "Planilha de ROI (Lucro Estimado)",
                  "Plantas de Construções Rurais",
                  "Atualizações Gratuitas"
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-white font-bold text-xs md:text-sm">
                    <Check className="w-5 h-5 text-brand-lime shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-8">
                <p className="text-zinc-500 line-through text-xs md:text-sm font-bold mb-1 uppercase">De R$197,00</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-brand-lime text-2xl font-black uppercase">Por apenas</span>
                  <span className="text-4xl md:text-5xl font-black text-white leading-none">R$19,90</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => {
                      trackPurchase(19.90, 'Upsell Plano Pro');
                      window.location.href = getRedirectUrl('https://pay.cakto.com.br/fzocrfs');
                    }}
                    className="w-full bg-brand-lime hover:bg-lime-400 text-black shadow-xl shadow-brand-lime/20"
                  >
                    QUERO O COMPLETO E EVITAR ERRO
                  </Button>
                </motion.div>
                
                <button
                  onClick={() => {
                    trackPurchase(9.90, 'Plano Básico');
                    window.location.href = getRedirectUrl('https://pay.cakto.com.br/be9evgt');
                  }}
                  className="text-zinc-500 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  Não, quero continuar no plano básico
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
