import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const getApiKey = () => {
  // Tenta obter de import.meta.env (Vite) ou process.env (Vercel Node environment)
  // @ts-ignore
  const key = (typeof process !== 'undefined' && process.env?.API_KEY) || 
              // @ts-ignore
              import.meta.env?.VITE_API_KEY || "";
  return key;
};

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("API Key não configurada no ambiente.");
    return "Erro: Chave de API não configurada. Verifique as variáveis de ambiente no Vercel.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Sem resposta do servidor.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, encontrei um erro técnico ao processar sua solicitação.";
  }
};