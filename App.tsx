
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ChevronRight, 
  Cpu, 
  Box, 
  Wrench, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  Factory,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Linkedin,
  Instagram
} from 'lucide-react';
import AIChat from './components/AIChat';
import WhatsAppButton from './components/WhatsAppButton';

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
  const CAMOZZI_CATALOG_URL = "https://shop.camozzi.com/store/camozzi/it/en/";
  const INTERNAL_CATALOG_URL = "https://drive.google.com/file/d/1RF2ZjgEwPpZqgOHCqJCCawGrZIN4pFeK/view?usp=drive_link";
  const LINKEDIN_URL = "https://www.linkedin.com/company/22287145/";
  const INSTAGRAM_URL = "https://www.instagram.com/skgautomacao/";

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

      {/* Floating Elements */}
      <div className="fixed bottom-32 right-6 md:right-8 z-[200]">
        <AIChat />
      </div>
      <div className="fixed bottom-8 right-6 md:right-8 z-[210]">
        <WhatsAppButton />
      </div>

      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#0a3622] shadow-md py-2' : 'bg-[#0a3622]/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#inicio" onClick={(e) => handleScrollTo(e, 'inicio')} className="block">
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

      {/* Hero Section */}
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
            <a href="#contato" onClick={(e) => handleScrollTo(e, 'contato')} className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-red-600/20">Fale com nossos consultores</a>
            <a href="#solucoes" onClick={(e) => handleScrollTo(e, 'solucoes')} className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 rounded-xl font-black text-lg transition-all">Nossas Soluções</a>
          </div>
        </div>
      </section>

      {/* Empresa Section */}
      <section id="empresa" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4">Nossa Empresa</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">Parceria Técnica há mais de 10 anos.</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">Nossa equipe altamente qualificada atua de forma técnica e consultiva, apoiando indústrias desde a definição da solução até a aplicação em campo.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-red-50 p-3 rounded-lg text-red-600 h-fit"><Clock size={24} /></div>
                <div><p className="font-black text-slate-900 text-lg">10+ Anos</p><p className="text-sm text-slate-500 font-bold">Experiência Industrial</p></div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-green-600 h-fit"><CheckCircle2 size={24} /></div>
                <div><p className="font-black text-slate-900 text-lg">100% Técnico</p><p className="text-sm text-slate-500 font-bold">Atendimento Consultivo</p></div>
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

      {/* Brands Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-16">Marcas Líderes Mundiais</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {Object.entries(ASSETS.brands).map(([name, logo], i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center transition-all hover:shadow-lg">
                <img src={logo} alt={name} className="max-h-12 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">Nosso Portfólio</h2>
              <h3 className="text-4xl font-black text-slate-900">Soluções em Pneumática</h3>
            </div>
            <a href={CAMOZZI_CATALOG_URL} target="_blank" className="text-red-600 font-black uppercase tracking-widest text-sm flex items-center gap-2 group">Catálogo Camozzi <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></a>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Válvulas', desc: 'Solenoides e Direcionais', icon: <Settings /> },
              { title: 'Atuadores', desc: 'Cilindros ISO e Especiais', icon: <Cpu /> },
              { title: 'Tratamento', desc: 'Filtros e Reguladores FRL', icon: <Factory /> },
              { title: 'Conexões', desc: 'Engates e Tubos', icon: <Box /> }
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

      {/* Solucoes Section */}
      <section id="solucoes" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-red-600 font-black uppercase tracking-widest text-xs mb-4">Nosso Trabalho</h2>
            <h3 className="text-4xl font-black text-slate-900">Soluções Aplicadas</h3>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {ASSETS.portfolio.map((img, i) => (
              <div key={i} className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-md group">
                <img src={img} alt={`Aplicação SK-G ${i}`} className="w-full h-auto" />
                <div className="p-5 flex justify-center border-t border-slate-50">
                  <a href={INTERNAL_CATALOG_URL} target="_blank" className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px] hover:text-red-700">Saiba mais... <ExternalLink size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden text-center">
        <h3 className="text-slate-900 font-black text-2xl mb-12">Empresas que confiam em nós</h3>
        <div className="carousel-track">
          {[...ASSETS.clients, ...ASSETS.clients].map((client, idx) => (
            <div key={idx} className="w-[250px] px-8 flex items-center justify-center">
              <img src={client} alt="Cliente" className="max-h-16 w-auto object-contain transition-all hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-24 bg-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-red-500 font-black uppercase tracking-widest text-xs mb-6">Contato Técnico</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Fale com nossos <span className="text-red-500">Consultores.</span></h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-red-600 p-6 rounded-2xl shadow-lg shadow-red-600/20"><Phone size={42} /></div>
                <div><p className="text-sm font-black text-red-500 uppercase tracking-widest">WhatsApp</p><a href={WHATSAPP_URL} target="_blank" className="text-3xl font-black hover:text-red-400 transition-colors">+55 11 99737-9588</a></div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 p-6 rounded-2xl"><Mail size={42} /></div>
                <div><p className="text-sm font-black text-slate-500 uppercase tracking-widest">E-mail Corporativo</p><p className="text-xl font-black">vendas.jundiai@skgautomacao.com.br</p></div>
              </div>
            </div>
            <div className="mt-20 flex flex-col md:flex-row items-center gap-12 bg-white/5 p-12 rounded-[4rem] border border-white/10">
              <img src={ASSETS.mascot} alt="Mascote" className="h-48 w-48 object-contain bg-white p-3 rounded-[2rem] border-[5px] border-red-600 shadow-2xl" />
              <div className="flex-1"><p className="text-3xl font-black mb-4 tracking-tighter">Suporte técnico Especializado</p><p className="text-lg text-slate-300 font-bold italic">"Qualidade e precisão em cada componente fornecido."</p></div>
            </div>
          </div>
          <div className="bg-white p-10 md:p-16 rounded-[3rem] text-slate-900 shadow-2xl">
            <h4 className="text-3xl font-black mb-8 tracking-tight text-center lg:text-left">Solicitar Atendimento</h4>
            <form className="space-y-6">
              <input type="text" placeholder="Nome" className="w-full bg-slate-50 border-b-2 p-4 text-slate-900 font-bold focus:outline-none focus:border-red-600 transition-all" />
              <input type="text" placeholder="Empresa" className="w-full bg-slate-50 border-b-2 p-4 text-slate-900 font-bold focus:outline-none focus:border-red-600 transition-all" />
              <input type="email" placeholder="E-mail Corporativo" className="w-full bg-slate-50 border-b-2 p-4 text-slate-900 font-bold focus:outline-none focus:border-red-600 transition-all" />
              <textarea placeholder="Necessidade Técnica" className="w-full bg-slate-50 border-b-2 p-4 h-32 text-slate-900 font-bold focus:outline-none focus:border-red-600 transition-all"></textarea>
              <button className="w-full bg-red-600 text-white font-black py-6 rounded-2xl text-xl uppercase tracking-widest hover:bg-red-700 transition-all transform hover:-translate-y-1">Solicitar agora</button>
            </form>
          </div>
        </div>
      </section>

      {/* Expanded Footer */}
      <footer className="bg-[#051a10] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & About */}
          <div>
            <img src={ASSETS.logo} alt="SK-G" className="h-10 mb-6" />
            <p className="text-slate-400 text-sm leading-relaxed font-medium mb-8">
              Distribuidor autorizado Camozzi Automation. Especialistas em soluções pneumáticas e automação industrial para alta performance.
            </p>
            <div className="flex gap-4">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition-all text-white"><Linkedin size={20} /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition-all text-white"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Links Rápidos</h5>
            <ul className="space-y-4">
              {['Início', 'Empresa', 'Produtos', 'Soluções', 'Contato'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace('í', 'i').replace('çõ', 'so')}`} 
                    onClick={(e) => handleScrollTo(e, link.toLowerCase().replace('í', 'i').replace('çõ', 'so'))}
                    className="text-slate-400 hover:text-red-500 font-bold text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Atendimento</h5>
            <ul className="space-y-6 text-slate-400 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin className="text-red-500 shrink-0" size={20} />
                <span>Rua Jacinto Zequim, 117 - Sala 5<br />Jardim Alice - Medeiros<br />Jundiaí - SP, 13212-321</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-red-500 shrink-0" size={20} />
                <span>+55 11 99737-9588</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-red-500 shrink-0" size={20} />
                <span>vendas.jundiai@skgautomacao.com.br</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Brands */}
          <div>
            <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Nossas Marcas</h5>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(ASSETS.brands).slice(0, 4).map(([name, logo], i) => (
                <div key={i} className="bg-white p-3 rounded-xl flex items-center justify-center border border-white/5 shadow-sm">
                  <img src={logo} alt={name} className="max-h-8 w-auto object-contain" />
                </div>
              ))}
            </div>
            <p className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Engenharia e Qualidade
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} SK-G Automação Industrial - Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <a href="#" className="hover:text-red-500 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-red-500 transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
