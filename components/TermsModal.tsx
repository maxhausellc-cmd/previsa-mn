
import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, X } from 'lucide-react';
import { TEXTS } from '../constants';
import { Language } from '../types';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  language: Language;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept, language }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const t = TEXTS[language].terms;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4">
      <div className="bg-white dark:bg-navy-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-navy-800 flex justify-between items-center bg-navy-900 dark:bg-navy-950">
          <div className="flex items-center gap-3 text-white">
            <ShieldCheck size={24} className="text-gold-500" />
            <h2 className="text-xl font-bold font-serif">{t.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-700 dark:text-gray-300">
            {/* Legal Basis */}
            <div className="bg-gray-50 dark:bg-navy-800 p-4 rounded-xl border border-gray-100 dark:border-navy-700">
                <h3 className="font-bold text-navy-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                    {t.legalBasisTitle}
                </h3>
                <p className="text-sm leading-relaxed">{t.legalBasisText}</p>
            </div>

            {/* Liability */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {t.liabilityTitle}
                </h3>
                <p className="text-sm leading-relaxed text-red-800 dark:text-red-300">
                    {/* Render with bold formatting if markdown style used in constant, or just regular text */}
                    {t.liabilityText.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                </p>
            </div>
        </div>

        {/* Footer / Actions */}
        <div className="p-6 border-t border-gray-100 dark:border-navy-800 bg-gray-50 dark:bg-navy-950">
            <label className="flex items-start gap-3 cursor-pointer group mb-6 select-none">
                <div className="relative flex items-center">
                    <input 
                        type="checkbox" 
                        checked={isAccepted}
                        onChange={(e) => setIsAccepted(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-800 checked:bg-gold-500 checked:border-gold-500 transition-all"
                    />
                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-navy-900 dark:group-hover:text-white transition-colors pt-0.5">
                    {t.agreeLabel}
                </span>
            </label>

            <div className="flex gap-4">
                <button 
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
                >
                    {t.cancelBtn}
                </button>
                <button 
                    onClick={onAccept}
                    disabled={!isAccepted}
                    className="flex-1 py-3 px-4 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-bold rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {t.acceptBtn}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
