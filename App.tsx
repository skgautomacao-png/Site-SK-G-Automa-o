
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Box, 
  FileSearch, 
  Wrench, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  Factory,
  CheckCircle2,
  Clock
} from 'lucide-react';

// --- CONFIGURAÇÕES DE ATIVOS ---
const ASSETS = {
  logo: "https://i.imgur.com/4mqgtQW.png",
  mascot: "https://i.imgur.com/CWKo3Ua.png", 
  brands: {
    camozzi: "https://i.imgur.com/ZIGyGN5.png",
    thomson: "https://i.imgur.com/ttxYiND.png",
    bray: "https://i.imgur.com/NfbOozz.png",
    mantova: "https://i.imgur.com/liJz01T.png",
    genebre: "https://i.imgur.com/Rt26hXw.png",
    ecoroll: "https://i.imgur.com/B27OTR2.png"
  },
  heroBgs: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1920&auto=format&fit=crop"
  ],
  portfolio: [
    "https://i.imgur.com/lzdInzh.png", "https://i.imgur.com/k2MjQMk.png", "https://i.imgur.com/FMf5AdW.png",
    "https://i.imgur.com/HtWU4ub.png", "https://i.imgur.com/U76W3FQ.png", "https://i.imgur.com/PomIzC3.png",
    "https://i.imgur.com/9RvHtZ9.png", "https://i.imgur.com/YzdK49u.png", "https://i.imgur.com/LoFuj1R.png",
    "https://i.imgur.com/p91cG3w.png", "https://i.imgur.com/wf0Ft3v.png"
  ],
  clients: [
    "https://i.imgur.com/CAF1EEN.png", "https://i.imgur.com/FBo9PHp.png", "https://i.imgur.com/TzAzS85.png",
    "https://i.imgur.com/lz7bjaL.png", "https://i.imgur.com/SZIjTQh.png", "https://i.imgur.com/zZWtwBF.png",
    "https://i.imgur.com/doaLu9k.png", "https://i.imgur.com/GuOywDI.png", "https://i.imgur.com/b5AIxVX.png",
    "https://i.imgur.com/zYfHMav.png", "https://i.imgur.com/JbhxG40.png", "https://i.imgur.com/uQwhPEy.png",
    "https://i.imgur.com/54fDGmO.png", "https://i.imgur.com/V1u3bAy.png"
  ]
};

export default function App() {
  const [currentBg, setCurrentBg] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % ASSETS.heroBgs.length);
    }, 5000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5511997379588";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased scroll-smooth">
      <style>{`
        html { scroll-behavior: smooth; }
        section { scroll-margin-top: 80px; }
        .carousel-track {
          display: flex;
          width: calc(250px * 28);
          animation: scroll 40s linear infinite;
        }
        .carousel-track:hover { animation-play-state: paused; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 14)); }
        }
      `}</style>

      {/* HEADER - Restaurado Logo Colorido e Verde Escuro */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#0a3622] shadow-md py-2' : 'bg-[#0a3622]/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')} className="block">
            {/* Removido brightness-0 invert para mostrar a cor real do logo */}
            <img src={ASSETS.logo} alt="SK-G Automação" className="h-10 md:h-12 w-auto object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {['Início', 'Empresa', 'Produtos', 'Soluções', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace('í', 'i').replace('çõ', 'so')}`} 
                onClick={(e) => handleScrollTo(e, item.toLowerCase().replace('í', 'i').replace('çõ', 'so'))}
                className="text-sm font-bold uppercase tracking-wider text-white hover:text-red-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#contato" 
              onClick={(e) => handleScrollTo(e, 'contato')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all"
            >
              Falar com Consultores
            </a>
          </nav>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-[#0a3622] p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-8">
            <img src={ASSETS.logo} alt="SK-G" className="h-8" />
            <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          {['Início', 'Empresa', 'Produtos', 'Soluções', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace('í', 'i').replace('çõ', 'so')}`} 
              onClick={(e) => handleScrollTo(e, item.toLowerCase().replace('í', 'i').replace('çõ', 'so'))}
              className="text-2xl font-black text-white border-b border-white/10 pb-4"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        {ASSETS.heroBgs.map((bg, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentBg === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img src={bg} alt="Industrial Background" className="w-full h-full object-cover" />
          </div>
        ))}
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-7xl font-black leading-tight mb-6 tracking-tighter">
            Automação Industrial e Pneumática <br />
            <span className="text-red-500">com Atuação Consultiva e Técnica</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl mx-auto font-medium">
            Há mais de uma década, a SK-G Automação atua como parceira completa da indústria, com foco em confiabilidade operacional e produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contato" 
              onClick={(e) => handleScrollTo(e, 'contato')}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-red-600/20"
            >
              Fale com nossos consultores
            </a>
            <a 
              href="#solucoes" 
              onClick={(e) => handleScrollTo(e, 'solucoes')}
              className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 rounded-xl font-black text-lg transition-all"
            >
              Nossas Soluções
            </a>
          </div>
        </div>
      </section>

      {/* EMPRESA SECTION */}
      <section id="empresa" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4">Nossa Empresa</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Parceria Técnica há mais de 10 anos.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Nossa equipe altamente qualificada atua de forma técnica e consultiva, apoiando indústrias desde a definição da solução até a aplicação em campo. 
              Focamos na aplicação correta dos componentes para eliminar o retrabalho.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-red-50 p-3 rounded-lg text-red-600 h-fit"><Clock size={24} /></div>
                <div>
                  <p className="font-black text-slate-900 text-lg">10+ Anos</p>
                  <p className="text-sm text-slate-500 font-bold">Experiência Industrial</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-green-600 h-fit"><CheckCircle2 size={24} /></div>
                <div>
                  <p className="font-black text-slate-900 text-lg">100% Técnico</p>
                  <p className="text-sm text-slate-500 font-bold">Atendimento Consultivo</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <Cpu className="text-red-600 mb-4" size={32} />
                <h4 className="font-black text-slate-900 mb-2">Painéis</h4>
                <p className="text-xs text-slate-500 font-bold">Montagem personalizada e dimensionamento técnico.</p>
              </div>
              <div className="bg-slate-950 p-8 rounded-3xl text-white">
                <Factory className="text-red-500 mb-4" size={32} />
                <h4 className="font-black mb-2">Reforma</h4>
                <p className="text-xs text-slate-400 font-bold">Revitalização de cilindros pneumáticos.</p>
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="bg-red-600 p-8 rounded-3xl text-white">
                <Box className="text-white mb-4" size={32} />
                <h4 className="font-black mb-2">Distribuição</h4>
                <p className="text-xs text-red-100 font-bold">Distribuidor autorizado Camozzi Automation.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <Wrench className="text-slate-900 mb-4" size={32} />
                <h4 className="font-black text-slate-900 mb-2">Serviços</h4>
                <p className="text-xs text-slate-500 font-bold">Consultoria, manutenção e assistência técnica.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">Parcerias Estratégicas</h2>
            <h3 className="text-3xl font-black text-slate-900">Marcas Líderes Mundiais</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(ASSETS.brands).map(([name, logo], i) => (
              <div key={i} className="flex flex-col items-center group">
                {name === 'camozzi' && (
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">Distribuidor Autorizado</span>
                )}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 w-full h-24 flex items-center justify-center transition-all group-hover:shadow-lg">
                  <img src={logo} alt={name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUTOS SECTION */}
      <section id="produtos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">Nosso Portfólio</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">Soluções em Pneumática</h3>
            </div>
            <a href="#contato" onClick={(e) => handleScrollTo(e, 'contato')} className="text-red-600 font-black uppercase tracking-widest text-sm flex items-center gap-2 group">
              Consultar catálogo completo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Válvulas', desc: 'Direcionais e Solenoides', icon: <Settings /> },
              { title: 'Atuadores', desc: 'Cilindros ISO e Especiais', icon: <Cpu /> },
              { title: 'Tratamento', desc: 'Filtros e Reguladores FRL', icon: <Factory /> },
              { title: 'Conexões', desc: 'Engates Rápidos e Tubos', icon: <Box /> }
            ].map((p, idx) => (
              <div key={idx} className="p-10 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-slate-950 hover:text-white transition-all group">
                <div className="text-red-600 mb-6 group-hover:text-red-500">{p.icon}</div>
                <h4 className="text-xl font-black mb-2">{p.title}</h4>
                <p className="text-sm text-slate-500 group-hover:text-slate-400 font-bold">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUCOES (PORTFOLIO) SECTION */}
      <section id="solucoes" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">Nosso Trabalho</h2>
            <h3 className="text-4xl font-black text-slate-900">Soluções Aplicadas</h3>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {ASSETS.portfolio.map((img, i) => (
              <div key={i} className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={img} alt={`Aplicação SK-G ${i}`} className="w-full h-auto" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTES CAROUSEL */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-slate-900 font-black text-2xl tracking-tight">Empresas que confiam em nossas soluções</h2>
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Atuação consolidada em diferentes segmentos industriais</p>
        </div>
        <div className="carousel-track">
          {[...ASSETS.clients, ...ASSETS.clients].map((client, idx) => (
            <div key={idx} className="w-[250px] px-8 flex items-center justify-center">
              <img src={client} alt="Cliente SK-G" className="max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO SECTION */}
      <section id="contato" className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-red-500 font-black uppercase tracking-widest text-xs mb-6">Contato Técnico e Comercial</h2>
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
                Fale com nossos <br /> <span className="text-red-500">Consultores.</span>
              </h3>
              <p className="text-xl text-slate-400 font-medium mb-12">
                Receba orientação técnica e comercial especializada para sua aplicação. Atendimento focado na sua produtividade.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="bg-red-600 p-6 rounded-2xl shadow-xl shadow-red-600/30 transition-transform hover:scale-105">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white"><Phone size={42} /></a>
                  </div>
                  <div>
                    <p className="text-sm font-black text-red-500 uppercase tracking-[0.2em] mb-1">WhatsApp</p>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-3xl md:text-4xl font-black hover:text-red-500 transition-colors tracking-tighter">+55 11 99737-9588</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-white/10 p-6 rounded-2xl transition-transform hover:scale-105">
                    <Mail size={42} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-1">E-mail para Cotações</p>
                    <p className="text-3xl md:text-4xl font-black tracking-tighter">vendas@skgautomacao.com.br</p>
                  </div>
                </div>
              </div>

              {/* BLOCO DE SUPORTE TÉCNICO COM MASCOTE ATUALIZADO E AMPLIADO */}
              <div className="mt-20 flex flex-col md:flex-row items-center gap-12 bg-white/5 p-12 rounded-[4rem] border border-white/10 max-w-3xl transition-all hover:bg-white/10 hover:border-red-600/50 duration-500 group">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-4 bg-red-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img 
                    src={ASSETS.mascot} 
                    alt="Mascote SK-G" 
                    className="relative h-48 w-48 md:h-56 md:w-56 object-contain bg-white p-3 rounded-[2rem] border-[5px] border-red-600 shadow-2xl" 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter mb-6">Suporte técnico Especializado</p>
                  <p className="text-lg md:text-xl text-slate-300 font-bold italic leading-relaxed">
                    "Qualidade e precisão em cada componente fornecido."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl">
              <h4 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Solicitar Atendimento</h4>
              <form className="space-y-6" action="mailto:vendas@skgautomacao.com.br" method="post" encType="text/plain">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                  <input type="text" name="nome" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-red-600 transition-colors font-bold text-slate-900" placeholder="Digite seu nome..." required />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresa</label>
                    <input type="text" name="empresa" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-red-600 transition-colors font-bold text-slate-900" placeholder="Nome da empresa..." required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone</label>
                    <input type="tel" name="telefone" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-red-600 transition-colors font-bold text-slate-900" placeholder="(00) 00000-0000" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail Corporativo</label>
                  <input type="email" name="email" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 focus:outline-none focus:border-red-600 transition-colors font-bold text-slate-900" placeholder="email@empresa.com.br" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Como podemos ajudar?</label>
                  <textarea name="mensagem" className="w-full bg-slate-50 border-b-2 border-slate-200 p-4 h-32 focus:outline-none focus:border-red-600 transition-colors font-bold text-slate-900" placeholder="Descreva sua necessidade técnica..."></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-6 rounded-2xl text-xl uppercase tracking-widest shadow-xl shadow-red-600/30 transition-all">
                  Solicitar atendimento
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar com um Consultor
        </span>
      </a>

      {/* FOOTER - Logo com cor real restaurada */}
      <footer className="bg-slate-950 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={ASSETS.logo} alt="SK-G" className="h-12 w-auto object-contain" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Automação Industrial e Pneumática | Há mais de 10 anos em campo.</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#empresa" onClick={(e) => handleScrollTo(e, 'empresa')} className="hover:text-white transition-colors">Empresa</a>
            <a href="#produtos" onClick={(e) => handleScrollTo(e, 'produtos')} className="hover:text-white transition-colors">Produtos</a>
            <a href="#solucoes" onClick={(e) => handleScrollTo(e, 'solucoes')} className="hover:text-white transition-colors">Soluções</a>
            <a href="#contato" onClick={(e) => handleScrollTo(e, 'contato')} className="hover:text-white transition-colors">Contato</a>
          </div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© {new Date().getFullYear()} SK-G Automação Industrial</p>
        </div>
      </footer>
    </div>
  );
}
