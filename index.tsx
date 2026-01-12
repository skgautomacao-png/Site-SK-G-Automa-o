
import { GoogleGenAI } from "@google/genai";

// Configurações e Ativos
const CLIENTS = [
  "https://i.imgur.com/CAF1EEN.png", "https://i.imgur.com/FBo9PHp.png", "https://i.imgur.com/TzAzS85.png",
  "https://i.imgur.com/lz7bjaL.png", "https://i.imgur.com/SZIjTQh.png", "https://i.imgur.com/zZWtwBF.png",
  "https://i.imgur.com/doaLu9k.png", "https://i.imgur.com/GuOywDI.png", "https://i.imgur.com/b5AIxVX.png",
  "https://i.imgur.com/zYfHMav.png", "https://i.imgur.com/JbhxG40.png", "https://i.imgur.com/uQwhPEy.png"
];

const SYSTEM_PROMPT = "Você é o Engenheiro Especialista da SK-G Automação. Sua missão é converter especificações da concorrência (SMC, Festo) para Camozzi. Use tabelas Markdown. Sempre comece com 'ESPECIALISTA SK-G DIZ:'.";

// Inicialização Gemini
const getAiClient = () => {
  const apiKey = (typeof process !== 'undefined' && process.env.API_KEY) || '';
  return new GoogleGenAI({ apiKey });
};

// Funções de Interface
const initApp = () => {
  // 1. Carrossel de Clientes (Duplicado para loop infinito)
  const carousel = document.getElementById('client-carousel');
  if (carousel) {
    const fullList = [...CLIENTS, ...CLIENTS];
    carousel.innerHTML = fullList.map(img => `
      <div class="w-[200px] px-8 flex items-center justify-center">
        <img src="${img}" class="max-h-12 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
      </div>
    `).join('');
  }

  // 2. Troca de Fundo Hero
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  setInterval(() => {
    slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
  }, 5000);

  // 3. Scroll Header
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-[#0a3622]', 'py-2');
      header.classList.remove('bg-[#0a3622]/90', 'py-4');
    } else {
      header.classList.remove('bg-[#0a3622]', 'py-2');
      header.classList.add('bg-[#0a3622]/90', 'py-4');
    }
  });

  // 4. Chat Logic
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input') as HTMLInputElement;
  const sendBtn = document.getElementById('send-btn');
  const closeChat = document.getElementById('close-chat');

  const toggleChat = () => chatWindow?.classList.toggle('open');
  chatToggle?.addEventListener('click', toggleChat);
  closeChat?.addEventListener('click', toggleChat);

  const addMessage = (text: string, isUser: boolean) => {
    const div = document.createElement('div');
    div.className = isUser 
      ? 'bg-red-600 text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[80%] text-sm font-bold'
      : 'bg-white text-slate-800 p-3 rounded-2xl rounded-tl-none border shadow-sm max-w-[90%] text-sm font-medium';
    div.innerText = text;
    chatMessages?.appendChild(div);
    chatMessages?.scrollTo(0, chatMessages.scrollHeight);
  };

  const handleSend = async () => {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    chatInput.value = '';
    
    // Loading state
    const loading = document.createElement('div');
    loading.className = 'text-[10px] font-black text-slate-400 uppercase animate-pulse';
    loading.innerText = 'Especialista está analisando...';
    chatMessages?.appendChild(loading);

    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: { systemInstruction: SYSTEM_PROMPT }
      });
      
      chatMessages?.removeChild(loading);
      addMessage(response.text || 'Desculpe, tive um erro técnico.', false);
    } catch (err) {
      chatMessages?.removeChild(loading);
      addMessage('Erro ao conectar com a engenharia. Tente novamente.', false);
    }
  };

  sendBtn?.addEventListener('click', handleSend);
  chatInput?.addEventListener('keypress', (e) => e.key === 'Enter' && handleSend());
};

document.addEventListener('DOMContentLoaded', initApp);
