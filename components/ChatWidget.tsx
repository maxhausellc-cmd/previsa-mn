
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User as UserIcon, Loader2, CheckCircle } from 'lucide-react';
import { Message, User } from '../types';
import { TEXTS } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatWidgetProps {
  language: 'mn' | 'en';
  user: User | null;
  onOpenLogin: () => void;
  triggerPaymentFlow?: number;
  triggerPaymentConfirmed?: number; // New trigger for payment success
  triggerOpen?: number;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ language, user, onOpenLogin, triggerPaymentFlow, triggerPaymentConfirmed, triggerOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = TEXTS[language].chat;

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0 && isOpen) {
      setMessages([{
        id: 'init',
        role: 'assistant',
        text: t.greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language, messages.length, t.greeting]);

  // Handle External Payment Trigger
  useEffect(() => {
    if (triggerPaymentFlow) {
        setIsOpen(true);
        setIsPaymentMode(true);
        const paymentMsg: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            text: t.payment.askCount,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, paymentMsg]);
    }
  }, [triggerPaymentFlow, t.payment.askCount]);

  // Handle Payment Confirmation Trigger
  useEffect(() => {
    if (triggerPaymentConfirmed) {
        setIsOpen(true);
        const confirmMsg: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            text: t.payment.confirmed,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, confirmMsg]);
        // Play notification sound or visual cue here if needed
    }
  }, [triggerPaymentConfirmed, t.payment.confirmed]);

  // Handle Generic Open Trigger
  useEffect(() => {
    if (triggerOpen) {
      setIsOpen(true);
    }
  }, [triggerOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    if (!user && !isPaymentMode) {
        setIsOpen(false);
        onOpenLogin();
        return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // --- PAYMENT LOGIC INTERCEPTOR ---
    if (isPaymentMode) {
        // Try to parse number
        const count = parseInt(newMessage.text.replace(/\D/g, ''));
        
        setTimeout(() => {
            if (!isNaN(count) && count > 0) {
                const pricePerPerson = count >= 5 ? 50000 : 70000;
                const total = pricePerPerson * count;
                const formattedTotal = total.toLocaleString();
                const responseText = t.payment.invoice.replace('{total}', formattedTotal);
                
                const replyMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    text: responseText,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, replyMessage]);
                // Exit payment mode after showing invoice to allow regular questions
                setIsPaymentMode(false); 
            } else {
                 const replyMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    text: language === 'mn' ? "Уучлаарай, тоо оруулна уу. (Жишээ нь: 3)" : "Please enter a valid number. (e.g., 3)",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, replyMessage]);
            }
            setIsTyping(false);
        }, 800);
        return;
    }
    // ----------------------------------

    const responseText = await sendMessageToGemini(newMessage.text, language);

    const replyMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, replyMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 bg-navy-900 dark:bg-gold-500 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          >
             {/* Ping animation to show activity */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75 animate-ping group-hover:hidden"></span>
            <MessageCircle size={28} className="relative" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-navy-800 overflow-hidden flex flex-col h-[500px] animate-fade-in">
          {/* Header */}
          <div className="bg-navy-900 dark:bg-navy-950 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 font-bold text-lg">
                  VP
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-navy-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">{t.header}</h3>
                <p className="text-xs text-gold-400">Online | AI Supported</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-navy-800 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white rounded-br-none'
                      : 'bg-white dark:bg-navy-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                 <div className="bg-white dark:bg-navy-700 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                 </div>
              </div>
            )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800">
            {/* Allow typing if user is logged in OR in payment mode */}
            {user || isPaymentMode ? (
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <input
                     type="text"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={handleKeyPress}
                     placeholder={isPaymentMode ? (language === 'mn' ? "Тоогоо оруулна уу..." : "Enter number..." ) : t.placeholder}
                     className="flex-1 bg-gray-100 dark:bg-navy-800 text-gray-800 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
                     autoFocus={isPaymentMode}
                   />
                   <button
                     onClick={handleSend}
                     disabled={isTyping || !inputValue.trim()}
                     className="p-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 disabled:opacity-50 transition-colors"
                   >
                     <Send size={18} />
                   </button>
                 </div>
                 {isPaymentMode && (
                   <button
                     type="button"
                     onClick={() => setIsPaymentMode(false)}
                     className="w-full text-xs text-red-600 dark:text-red-400 underline mt-1 text-center"
                   >
                     {t.payment.cancel}
                   </button>
                 )}
               </div>
            ) : (
                <button 
                  onClick={() => {
                      setIsOpen(false);
                      onOpenLogin();
                  }}
                  className="w-full py-2 bg-navy-800 text-white text-sm rounded-lg hover:bg-navy-700 transition-colors"
                >
                    Login to Chat
                </button>
            )}
           
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
