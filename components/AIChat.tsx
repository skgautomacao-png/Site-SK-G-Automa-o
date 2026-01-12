import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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
    <div className="flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-[450px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh]"
          >
            <div className="bg-[#0a3622] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={MASCOT_URL} alt="Mascote" className="w-10 h-10 bg-white rounded-full p-1 border-2 border-red-500 object-contain" />
                <div>
                  <h3 className="font-black text-white text-sm uppercase">Especialista SK-G</h3>
                  <p className="text-[10px] text-green-300 font-bold">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                    <MarkdownRenderer content={msg.text} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 p-4 bg-white rounded-2xl w-fit shadow-sm">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-white flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Dúvida técnica..." className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20" />
              <button onClick={handleSend} disabled={isLoading} className="bg-red-600 p-3 rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"><Send size={20} className="text-white" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden group"
      >
        {isOpen ? <X className="text-white" /> : <img src={MASCOT_URL} alt="Suporte" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />}
      </motion.button>
    </div>
  );
};

export default AIChat;