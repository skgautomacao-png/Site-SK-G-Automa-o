
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { MASCOT_URL } from '../constants';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '![Mascote SK-G](https://i.imgur.com/jAm2QjF.png) **ESPECIALISTA SK-G DIZ:** Olá! Sou o assistente técnico da SK-G. Como posso ajudar com suas transcodificações ou dúvidas sobre produtos Camozzi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-4 md:right-8 z-[200] flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-[450px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh]"
          >
            {/* Header */}
            <div className="bg-[#0a3622] p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full p-1 border-2 border-red-500 overflow-hidden">
                  <img src={MASCOT_URL} alt="Mascote" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-white tracking-tight leading-none text-sm uppercase">Especialista SK-G</h3>
                  <p className="text-[10px] text-green-300 font-bold uppercase tracking-widest mt-1">Suporte Técnico Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    <MarkdownRenderer content={msg.text} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none flex gap-2 border border-slate-100 shadow-sm">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Digite sua dúvida técnica..."
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-bold text-slate-900"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-red-600 p-3 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20"
                >
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/40 border-4 border-white z-50 overflow-hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
        ) : (
          <img src={MASCOT_URL} alt="Suporte" className="w-10 h-10 object-contain" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
