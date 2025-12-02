
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, CheckCircle, FileText, Lock, ChevronRight, Menu, X, User as UserIcon, LogOut, BookCheck, ChevronDown, Laptop, UserCheck, AlertTriangle, Info, ShieldCheck, ListOrdered, Bot, Headset, Banknote, Users, CreditCard, FileDown, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Language, Theme, User, Page } from './types';
import { TEXTS, CHECKLIST_FILTERS, DETAILED_CHECKLIST_DATA, PDF_CONTENT_TEMPLATE } from './constants';
import SakuraBackground from './components/SakuraBackground';
import LoginModal from './components/LoginModal';
import ChatWidget from './components/ChatWidget';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TermsModal from './components/TermsModal';

// GatedContent Component with Payment Logic
interface GatedContentProps {
  user: User | null;
  texts: {
    locked: string;
    paymentLocked: string;
    paymentDesc: string;
    unlock: string;
    welcome: string;
  };
  onUnlock: () => void;
  children: React.ReactNode;
}

const GatedContent = ({ user, texts, onUnlock, children }: GatedContentProps) => {
  // If user is paid, show content
  if (user && user.paymentStatus === 'paid') {
      return <div className="animate-fade-in">{children}</div>;
  }

  // If user is logged in but pending/unpaid
  if (user && user.paymentStatus !== 'paid') {
      return (
        <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-950 p-8 text-center animate-fade-in">
          <CreditCard size={64} className="text-gray-400 dark:text-navy-600 mb-6" />
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">{texts.paymentLocked}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">{texts.paymentDesc}</p>
          <div className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium border border-yellow-200 dark:border-yellow-900/50">
             Payment Verification Pending
          </div>
          {/* Blurred Background Preview */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 blur-sm z-[-1]">
               <div className="grid grid-cols-2 gap-4 p-8">
                   <div className="h-32 bg-gray-400 rounded-lg"></div>
                   <div className="h-32 bg-gray-400 rounded-lg"></div>
                   <div className="h-64 bg-gray-400 rounded-lg col-span-2"></div>
               </div>
          </div>
        </div>
      );
  }

  // Not logged in
  return (
    <div className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-950 p-8 text-center animate-fade-in">
      <Lock size={64} className="text-gray-300 dark:text-navy-700 mb-6" />
      <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">{texts.locked}</h2>
      <button
        onClick={onUnlock}
        className="px-8 py-3 bg-gold-500 text-white font-bold rounded-lg hover:bg-gold-600 transition-colors shadow-lg"
      >
        {texts.unlock}
      </button>
      {/* Blurred Background Preview */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 blur-sm z-[-1]">
           <div className="grid grid-cols-2 gap-4 p-8">
               <div className="h-32 bg-gray-400 rounded-lg"></div>
               <div className="h-32 bg-gray-400 rounded-lg"></div>
               <div className="h-64 bg-gray-400 rounded-lg col-span-2"></div>
           </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ t, navigate, openTerms }: { t: any, navigate: (page: Page) => void, openTerms: () => void }) => (
  <footer className="bg-navy-950 text-white pt-16 pb-8 border-t border-navy-900 transition-colors">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Column 1: Contact & Logo */}
        <div>
          <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                   <Globe className="text-gold-500 w-full h-full absolute" strokeWidth={1.5} />
                   <div className="absolute -bottom-1 -right-1 bg-navy-950 rounded-full p-0.5 border border-navy-950">
                      <CheckCircle className="text-white w-4 h-4 fill-current" />
                   </div>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                PreVisa <span className="text-gold-500">MN</span>
              </span>
          </div>
          <p className="text-gray-400 text-sm mb-6 italic opacity-90">
            {t.footer.tagline}
          </p>

          <ul className="space-y-3 text-sm text-gray-400">
             <li className="flex items-start gap-3">
               <Mail size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
               <span className="opacity-90">{t.footer.email}</span>
             </li>
             <li className="flex items-start gap-3">
               <Clock size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
               <span className="opacity-90">{t.footer.workHours}</span>
             </li>
             <li className="flex items-start gap-3">
               <Phone size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
               <span className="opacity-90">{t.footer.phone}</span>
             </li>
          </ul>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-serif font-bold mb-6 text-white border-b-2 border-gold-500 inline-block pb-1">{t.footer.linksTitle}</h3>
          <ul className="space-y-3 text-sm text-gray-400">
             <li>
               <button onClick={() => navigate(Page.HOME)} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.nav.services}
               </button>
             </li>
             <li>
               <button onClick={() => navigate(Page.GUIDE)} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.nav.guide}
               </button>
             </li>
             <li>
               <button onClick={() => navigate(Page.CHECKLIST)} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.nav.visa}
               </button>
             </li>
             <li>
               <button onClick={() => navigate(Page.PRICING)} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.nav.pricing}
               </button>
             </li>
             <li>
               <button onClick={openTerms} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.footer.terms}
               </button>
             </li>
             <li>
               <button className="hover:text-gold-500 transition-colors flex items-center gap-2">
                 <ChevronRight size={14} className="text-gold-500" />
                 {t.footer.faq}
               </button>
             </li>
          </ul>
        </div>

        {/* Column 3: Legal & Support */}
        <div>
          <h3 className="text-lg font-serif font-bold mb-6 text-white border-b-2 border-gold-500 inline-block pb-1">{t.footer.legalTitle}</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
                <button className="hover:text-gold-500 transition-colors flex items-center gap-2">
                    <ShieldCheck size={14} />
                    {t.footer.faq}
                </button>
            </li>
            <li>
                <button onClick={openTerms} className="hover:text-gold-500 transition-colors flex items-center gap-2">
                    <FileText size={14} />
                    {t.footer.terms}
                </button>
            </li>
            <li>
                <button className="hover:text-gold-500 transition-colors flex items-center gap-2">
                    <Lock size={14} />
                    {t.footer.privacy}
                </button>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-navy-900 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
         <p>{t.footer.copyright}</p>
         <p className="mt-2 md:mt-0 opacity-60">VisaPrep Pro Premium Service</p>
      </div>
    </div>
  </footer>
);

function App() {
  const [language, setLanguage] = useState<Language>('mn');
  const [theme, setTheme] = useState<Theme>('light');
  const [user, setUser] = useState<User | null>(null);
  // Shared state to track the "Demo User's" payment status specifically for the simulation
  const [demoUserPaymentStatus, setDemoUserPaymentStatus] = useState<'pending' | 'paid' | 'cancelled'>('pending');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentChatTrigger, setPaymentChatTrigger] = useState<number>(0);
  const [paymentConfirmedTrigger, setPaymentConfirmedTrigger] = useState<number>(0);
  const [chatOpenTrigger, setChatOpenTrigger] = useState<number>(0);
  const footerRef = React.useRef<HTMLDivElement | null>(null);

  const t = TEXTS[language];

  // Handle Dark Mode Class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handlers
  const toggleLanguage = () => setLanguage(prev => prev === 'mn' ? 'en' : 'mn');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };
  
  const handleLogin = (newUser: User) => {
    // If logging in as the demo user, sync their payment status with our app state
    if (newUser.role === 'user') {
        newUser.paymentStatus = demoUserPaymentStatus;
    }
    setUser(newUser);
    
    // Check if we just logged in as the demo user AND they are now paid (triggered from admin)
    // If they were just approved, trigger the chat notification
    // Note: In a real app, this would be a socket event or polling.
    // Here we handle the transition if the user logs back in or if we are switching contexts.
    
    if (newUser.role === 'admin') {
      setCurrentPage(Page.ADMIN);
    } else {
      setCurrentPage(Page.DASHBOARD); 
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage(Page.HOME);
  };

  const handlePackageSelect = () => {
      // Instead of direct trigger, open Terms
      setIsTermsOpen(true);
  }

  const handleTermsAccepted = () => {
      setIsTermsOpen(false);
      setPaymentChatTrigger(Date.now());
  }

  // ADMIN ACTION: Approve Payment
  const handleApprovePayment = (userId: string) => {
      // Update the shared demo state
      setDemoUserPaymentStatus('paid');
      // If the current logged in user is the admin, we just updated the background state.
      // When we log back in as the user, they will be paid.
      // However, to make the demo smoother, if we were to switch back, we want the notification.
      setPaymentConfirmedTrigger(Date.now()); 
  };

  // ADMIN ACTION: Refund / Cancel Payment
  const handleRefundPayment = (userId: string) => {
      setDemoUserPaymentStatus('cancelled');
      // If the current user is the demo user, immediately reflect the cancelled status
      setUser(prev => prev ? { ...prev, paymentStatus: 'cancelled' } : prev);
  };

  // Components
  const Navbar = () => (
    <nav className="fixed w-full z-40 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md border-b border-gray-100 dark:border-navy-800 transition-colors duration-300">
      
      {/* Top Utility Bar */}
      <div className="bg-navy-900 text-white text-xs py-1 px-4 sm:px-8 flex justify-end gap-4">
        <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-gold-400 transition-colors">
          <Globe size={12} />
          <span className="uppercase font-bold">{language}</span>
        </button>
        <button onClick={toggleTheme} className="flex items-center gap-1 hover:text-gold-400 transition-colors">
          {theme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentPage(Page.HOME)}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
                 {/* Globe Icon */}
                 <Globe className="text-navy-900 dark:text-gold-500 w-full h-full absolute transition-colors" strokeWidth={1.5} />
                 {/* Passport/Check Badge */}
                 <div className="absolute -bottom-1 -right-1 bg-white dark:bg-navy-900 rounded-full p-0.5 border border-white dark:border-navy-900">
                    <CheckCircle className="text-gold-500 w-5 h-5 fill-current" />
                 </div>
            </div>
            <span className="font-serif font-bold text-xl text-navy-900 dark:text-white tracking-tight group-hover:opacity-90 transition-opacity">
              PreVisa <span className="text-gold-500">MN</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentPage(Page.HOME)} className={`font-medium transition-colors ${currentPage === Page.HOME ? 'text-navy-900 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-gold-400'}`}>
              {t.nav.services}
            </button>
            <button onClick={() => setCurrentPage(Page.GUIDE)} className={`font-medium transition-colors ${currentPage === Page.GUIDE ? 'text-navy-900 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-gold-400'}`}>
              {t.nav.guide}
            </button>

            {/* VISUALIZED INTERACTIVE DROPDOWN: Visa */}
            <div className="relative group">
                <button 
                  className={`flex items-center gap-1 font-medium transition-colors py-2 ${currentPage === Page.CHECKLIST ? 'text-navy-900 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 group-hover:text-navy-900 dark:group-hover:text-gold-400'}`}
                >
                  {t.nav.visa}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2 z-50">
                    <div className="bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-gray-100 dark:border-navy-800 overflow-hidden">
                        {/* Option 1: Apply Online */}
                        <button 
                            onClick={() => setCurrentPage(Page.CHECKLIST)}
                            className="w-full text-left px-4 py-4 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors flex items-center gap-3 border-b border-gray-50 dark:border-navy-800"
                        >
                            <div className="bg-gold-100 dark:bg-navy-700 p-2 rounded-lg text-gold-600 dark:text-gold-400">
                                <Laptop size={18} />
                            </div>
                            <div>
                                <span className="block font-bold text-navy-900 dark:text-white text-sm">{t.nav.applyOnline}</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">Digital process</span>
                            </div>
                        </button>
                        
                        {/* Option 2: Apply In-Person */}
                        <button 
                             onClick={() => setCurrentPage(Page.GUIDE)} 
                             className="w-full text-left px-4 py-4 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors flex items-center gap-3"
                        >
                            <div className="bg-navy-100 dark:bg-navy-700 p-2 rounded-lg text-navy-600 dark:text-gold-400">
                                <UserCheck size={18} />
                            </div>
                            <div>
                                <span className="block font-bold text-navy-900 dark:text-white text-sm">{t.nav.applyInPerson}</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">Embassy visit</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <button onClick={() => setCurrentPage(Page.PRICING)} className={`font-medium transition-colors ${currentPage === Page.PRICING ? 'text-navy-900 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-gold-400'}`}>
              {t.nav.pricing}
            </button>
            <button onClick={scrollToFooter} className="font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-navy-900 dark:hover:text-gold-400">
              {t.nav.contact}
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-navy-800">
                <button 
                  onClick={() => setCurrentPage(user.role === 'admin' ? Page.ADMIN : Page.DASHBOARD)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors group ${currentPage === Page.DASHBOARD || currentPage === Page.ADMIN ? 'bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-gold-400' : 'hover:bg-gray-50 dark:hover:bg-navy-900'}`}
                >
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full border border-gray-200" />
                  <span className="text-sm font-medium dark:text-white group-hover:text-navy-900 dark:group-hover:text-gold-400">
                    {user.role === 'admin' ? 'Admin Panel' : t.nav.dashboard}
                  </span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title={t.nav.logout}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                {t.nav.login}
              </button>
            )}
          </div>

           {/* Mobile Menu Button */}
           <button 
             className="md:hidden text-navy-900 dark:text-white"
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
       {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-navy-950 border-b border-gray-200 dark:border-navy-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button onClick={() => { setCurrentPage(Page.HOME); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 rounded-md">
              {t.nav.services}
            </button>
            <button onClick={() => { setCurrentPage(Page.GUIDE); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 rounded-md">
              {t.nav.guide}
            </button>
            
            {/* Mobile Visa Submenu */}
            <div className="border-l-2 border-gold-400 ml-3 pl-3 my-2 space-y-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.nav.visa}</span>
                <button onClick={() => { setCurrentPage(Page.CHECKLIST); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-sm font-medium text-navy-900 dark:text-white bg-gray-50 dark:bg-navy-800 rounded-md flex items-center gap-2">
                   <Laptop size={14} /> {t.nav.applyOnline}
                </button>
                <button onClick={() => { setCurrentPage(Page.GUIDE); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-sm font-medium text-navy-900 dark:text-white bg-gray-50 dark:bg-navy-800 rounded-md flex items-center gap-2">
                   <UserCheck size={14} /> {t.nav.applyInPerson}
                </button>
            </div>

            <button onClick={() => { setCurrentPage(Page.PRICING); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 rounded-md">
              {t.nav.pricing}
            </button>

            {user ? (
               <>
               <button onClick={() => { setCurrentPage(user.role === 'admin' ? Page.ADMIN : Page.DASHBOARD); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-base font-medium text-navy-900 dark:text-gold-400 hover:bg-gray-50 dark:hover:bg-navy-900 rounded-md">
                  {user.role === 'admin' ? 'Admin Panel' : t.nav.dashboard}
               </button>
               <button onClick={handleLogout} className="block w-full text-left py-2 px-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                 {t.nav.logout}
               </button>
               </>
            ) : (
              <button onClick={() => { setIsLoginOpen(true); setMobileMenuOpen(false); }} className="block w-full text-left py-2 px-3 text-base font-medium text-navy-900 dark:text-gold-500 font-bold">
                {t.nav.login}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Sakura Background */}
      <SakuraBackground isDark={theme === 'dark'} />
      
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40 dark:from-navy-950/30 dark:via-navy-950/10 dark:to-navy-950 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in mt-16">
        <h2 className="text-gold-600 dark:text-gold-400 font-bold tracking-widest text-sm sm:text-base uppercase mb-4">
          {t.hero.title}
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-navy-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
          {t.hero.tagline}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setCurrentPage(Page.CHECKLIST)}
            className="w-full sm:w-auto px-8 py-4 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
          >
            {t.hero.ctaPrimary}
          </button>
          <button 
             onClick={() => setCurrentPage(Page.GUIDE)}
             className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-navy-900/50 backdrop-blur-sm border-2 border-navy-900 dark:border-gold-500 text-navy-900 dark:text-white rounded-full font-bold text-lg hover:bg-navy-900 hover:text-white dark:hover:bg-gold-500 dark:hover:text-navy-900 transition-all"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );

  // QUICK ACCESS LINKS – light-first design with dark mode support
  const Services = () => (
    <section className="py-16 bg-white dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
           <h2 className="text-gold-500 font-bold tracking-widest text-sm sm:text-base uppercase mb-2">
              {t.quickLinks.title}
           </h2>
           <div className="w-12 h-1 bg-navy-200 dark:bg-navy-800 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-3">
            {/* Link 1: Checklist */}
            <button 
                onClick={() => setCurrentPage(Page.CHECKLIST)}
                className="group relative flex justify-between items-center px-6 py-4 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 hover:border-gold-500 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
            >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold-50 dark:bg-navy-950 rounded-lg flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform shadow-sm">
                      <BookCheck size={20} />
                  </div>
                  <div>
                      <h3 className="text-[15px] font-semibold text-navy-900 dark:text-white">{t.quickLinks.checklist.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-navy-300 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                        {t.quickLinks.checklist.desc}
                      </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 dark:text-navy-500 group-hover:text-gold-500 transition-colors" />
            </button>

            {/* Link 2: Guide */}
            <button 
                onClick={() => setCurrentPage(Page.GUIDE)}
                className="group relative flex justify-between items-center px-6 py-4 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 hover:border-gold-500 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
            >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold-50 dark:bg-navy-950 rounded-lg flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform shadow-sm">
                      <ListOrdered size={20} />
                  </div>
                  <div>
                      <h3 className="text-[15px] font-semibold text-navy-900 dark:text-white">{t.quickLinks.guide.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-navy-300 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                        {t.quickLinks.guide.desc}
                      </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 dark:text-navy-500 group-hover:text-gold-500 transition-colors" />
            </button>

             {/* Link 3: Pricing */}
             <button 
                onClick={() => setCurrentPage(Page.PRICING)}
                className="group relative flex justify-between items-center px-6 py-4 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 hover:border-gold-500 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
            >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold-50 dark:bg-navy-950 rounded-lg flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform shadow-sm">
                      <Banknote size={20} />
                  </div>
                  <div>
                      <h3 className="text-[15px] font-semibold text-navy-900 dark:text-white">{t.quickLinks.pricing.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-navy-300 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                        {t.quickLinks.pricing.desc}
                      </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 dark:text-navy-500 group-hover:text-gold-500 transition-colors" />
            </button>

             {/* Link 4: Support */}
             <button 
                onClick={() => setChatOpenTrigger(Date.now())}
                className="group relative flex justify-between items-center px-6 py-4 bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-800 hover:border-gold-500 rounded-xl text-left transition-all duration-200 hover:shadow-sm"
            >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold-50 dark:bg-navy-950 rounded-lg flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform shadow-sm">
                      <Headset size={20} />
                  </div>
                  <div>
                      <h3 className="text-[15px] font-semibold text-navy-900 dark:text-white">{t.quickLinks.support.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-navy-300 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                        {t.quickLinks.support.desc}
                      </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 dark:text-navy-500 group-hover:text-gold-500 transition-colors" />
            </button>
        </div>
      </div>
    </section>
  );

  // ADVANTAGES (Previously Services)
  const Advantages = () => (
    <section className="py-24 bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          
          {/* Card 1: AI Document Check */}
          <div className="w-full md:w-[calc(33.333%-2rem)] min-w-[300px] group relative p-8 bg-white dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 hover:shadow-xl cursor-default">
            <div className="w-14 h-14 bg-navy-50 dark:bg-navy-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Bot className="text-navy-900 dark:text-gold-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
              {t.services.aiCheck.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.services.aiCheck.desc}
            </p>
          </div>

          {/* Card 2: 24/7 Expert Support (Informational) */}
          <div className="w-full md:w-[calc(33.333%-2rem)] min-w-[300px] group relative p-8 bg-white dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 hover:shadow-xl cursor-default">
            <div className="w-14 h-14 bg-navy-50 dark:bg-navy-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <Headset className="text-navy-900 dark:text-gold-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
              {t.services.expertSupport.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.services.expertSupport.desc}
            </p>
          </div>

          {/* Card 3: Financial */}
          <div className="w-full md:w-[calc(33.333%-2rem)] min-w-[300px] group relative p-8 bg-white dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 hover:shadow-xl cursor-default">
            <div className="w-14 h-14 bg-navy-50 dark:bg-navy-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-navy-900 dark:text-gold-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
              {t.services.financial.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.services.financial.desc}
            </p>
          </div>

          {/* Card 4: Process */}
          <div className="w-full md:w-[calc(33.333%-2rem)] min-w-[300px] group relative p-8 bg-white dark:bg-navy-950 rounded-2xl border border-gray-100 dark:border-navy-800 hover:border-gold-400 dark:hover:border-gold-500 transition-all duration-300 hover:shadow-xl cursor-default">
            <div className="w-14 h-14 bg-navy-50 dark:bg-navy-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ListOrdered className="text-navy-900 dark:text-gold-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">
              {t.services.process.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.services.process.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const InteractiveChecklist = () => {
    // States for filters
    const [occupation, setOccupation] = useState('employed');
    const [funding, setFunding] = useState('self');
    const [isMinor, setIsMinor] = useState(false);

    const info = t.checklistInfo;

    // Helper to get text based on language
    const getText = (item: any, key: 'title' | 'desc' | 'warnings') => {
        const langKey = language === 'mn' ? `${key}Mn` : `${key}En`;
        return item[langKey];
    };

    const handleDownloadPdf = () => {
        // Create blob from the constant template
        const element = document.createElement("a");
        const file = new Blob([PDF_CONTENT_TEMPLATE], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        // We use .txt for safety in this environment, but user asked for PDF visualization
        element.download = "PreVisa_Checklist_Detailed.txt"; 
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element);
    };

    const renderList = (items: any[], title: string) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="mb-8 animate-fade-in">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4 border-l-4 border-gold-500 pl-3 uppercase tracking-wide">
                    {title}
                </h3>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-navy-900 rounded-xl p-5 border border-gray-100 dark:border-navy-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500 cursor-pointer" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-navy-900 dark:text-white mb-1">{getText(item, 'title')}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{getText(item, 'desc')}</p>
                                    
                                    {/* Warnings / Alerts */}
                                    {item.warningsEn && (
                                        <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-2 text-red-700 dark:text-red-400 font-bold text-xs uppercase">
                                                <AlertTriangle size={14} />
                                                <span>Critical Warning</span>
                                            </div>
                                            <ul className="list-disc list-inside text-xs text-red-600 dark:text-red-300 space-y-1">
                                                {getText(item, 'warnings').map((warn: string, idx: number) => (
                                                    <li key={idx}>{warn}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto py-24 px-4">
            <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-6">{t.services.checklist.title}</h2>
            
            {/* DOWNLOAD BUTTON */}
            <div className="mb-8">
                 <button 
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                 >
                     <FileDown size={20} />
                     {info.downloadPdf}
                 </button>
            </div>

            {/* Control Panel */}
            <div className="bg-navy-900 dark:bg-navy-800 p-6 rounded-2xl text-white mb-10 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Occupation */}
                    <div>
                        <label className="block text-xs font-bold text-gold-400 uppercase mb-2">{info.controls.occupation}</label>
                        <select 
                            value={occupation} 
                            onChange={(e) => setOccupation(e.target.value)}
                            className="w-full bg-navy-800 dark:bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
                        >
                            {CHECKLIST_FILTERS.occupations.map(opt => (
                                <option key={opt.value} value={opt.value}>{language === 'mn' ? opt.labelMn : opt.labelEn}</option>
                            ))}
                        </select>
                    </div>

                    {/* Funding */}
                    <div>
                        <label className="block text-xs font-bold text-gold-400 uppercase mb-2">{info.controls.funding}</label>
                        <select 
                            value={funding} 
                            onChange={(e) => setFunding(e.target.value)}
                            className="w-full bg-navy-800 dark:bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm"
                        >
                             {CHECKLIST_FILTERS.funding.map(opt => (
                                <option key={opt.value} value={opt.value}>{language === 'mn' ? opt.labelMn : opt.labelEn}</option>
                            ))}
                        </select>
                    </div>

                    {/* Minor Checkbox */}
                    <div className="flex items-center">
                         <label className="flex items-center gap-3 cursor-pointer group">
                             <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${isMinor ? 'bg-gold-500 border-gold-500 text-navy-900' : 'border-gray-500 group-hover:border-gold-400'}`}>
                                 {isMinor && <CheckCircle size={16} />}
                             </div>
                             <input type="checkbox" checked={isMinor} onChange={() => setIsMinor(!isMinor)} className="hidden" />
                             <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{info.controls.minor}</span>
                         </label>
                    </div>
                </div>
            </div>

            {/* Checklist Output */}
            <div className="space-y-2">
                {renderList(DETAILED_CHECKLIST_DATA.core, info.sections.core)}
                {/* @ts-ignore */}
                {renderList(DETAILED_CHECKLIST_DATA.occupation[occupation], info.sections.occupation)}
                {/* @ts-ignore */}
                {renderList(DETAILED_CHECKLIST_DATA.financial[funding], info.sections.financial)}
                {isMinor && renderList(DETAILED_CHECKLIST_DATA.minor, info.sections.minor)}
            </div>

             <div className="mt-8 pt-8 border-t border-gray-200 dark:border-navy-700 flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                      <Info size={16} /> 
                      {language === 'mn' ? 'Жагсаалтыг хадгалах боломжтой.' : 'Progress can be saved.'}
                  </span>
                  <button className="px-6 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-lg font-medium shadow-md hover:opacity-90 transition-opacity">
                      {language === 'mn' ? 'Хадгалах' : 'Save List'}
                  </button>
              </div>
        </div>
    );
  };

  const StepByStepGuide = () => (
    <div className="max-w-4xl mx-auto py-24 px-4">
        <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-12">{t.services.guide.title}</h2>
        <div className="relative border-l-4 border-gold-200 dark:border-navy-800 ml-4 space-y-12">
            {t.steps.map((s, idx) => (
                <div key={idx} className="relative pl-8 group animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="absolute -left-[20px] top-0 w-10 h-10 rounded-full bg-white dark:bg-navy-900 border-4 border-gold-400 flex items-center justify-center font-bold text-navy-900 dark:text-gold-400 z-10 shadow-sm">
                        {idx + 1}
                    </div>
                    <div className="bg-white dark:bg-navy-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-navy-800 group-hover:border-gold-400 transition-colors">
                        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{s.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const PricingSection = () => (
    <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-4">
          {t.pricing.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{t.pricing.desc}</p>
        <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mt-4"></div>
      </div>

      {/* WARNING BOX */}
      <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl flex items-start gap-4">
              <AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={24} />
              <div>
                  <h3 className="font-bold text-red-700 dark:text-red-400 text-lg mb-1">
                    {language === 'mn' ? 'АНХААРУУЛГА' : 'WARNING'}
                  </h3>
                  <p className="text-red-600 dark:text-red-300">
                    {t.pricing.warning}
                  </p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Standard Plan */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 p-8 flex flex-col hover:shadow-lg transition-shadow">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{t.pricing.standard.title}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-navy-900 dark:text-gold-500">{t.pricing.standard.price}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">/ {t.pricing.standard.unit}</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {t.pricing.standard.features.map((feat: string, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <button 
             onClick={handlePackageSelect}
             className="w-full py-3 bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-white font-bold rounded-xl hover:bg-navy-200 dark:hover:bg-navy-700 transition-colors"
          >
            {t.pricing.cta}
          </button>
        </div>

        {/* Group Plan */}
        <div className="bg-navy-900 dark:bg-navy-800 rounded-2xl shadow-xl border-2 border-gold-500 p-8 flex flex-col relative overflow-hidden transform md:-translate-y-4">
          <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
            BEST VALUE
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">{t.pricing.group.title}</h3>
            <p className="text-gold-400 text-sm mb-2">{t.pricing.group.subtitle}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{t.pricing.group.price}</span>
              <span className="text-gray-400 text-sm">/ {t.pricing.group.unit}</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {t.pricing.group.features.map((feat: string, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-gray-200">
                <CheckCircle size={18} className="text-gold-500 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <button 
             onClick={handlePackageSelect}
             className="w-full py-3 bg-gold-500 text-navy-900 font-bold rounded-xl hover:bg-gold-400 transition-colors shadow-lg"
          >
            {t.pricing.cta}
          </button>
        </div>
      </div>
    </div>
  );

  const ContactFAQSection = () => {
    const faqs = language === 'mn'
      ? [
          {
            q: 'VFS Global-ийн визний хураамж үйлчилгээний үнэд багтсан уу?',
            a: 'Үгүй. Манай 70,000₮ / 50,000₮ үйлчилгээний хөлс нь зөвхөн бичиг баримт бэлтгэл, зөвлөгөөний үйлчилгээ бөгөөд VFS Global-ийн албан ёсны визний хураамжийг та тусад нь төлнө.'
          },
          {
            q: 'Төлбөр төлсний дараа виз татгалзвал буцаан олголт хийдэг үү?',
            a: 'Манай үйлчилгээ нь зөвлөгөө, материалын бэлтгэлд чиглэдэг тул төлбөрийг буцаан олгохгүй. Визний шийдвэрийг Япон Улсын ЭСЯ болон Виз Мэдүүлгийн Төв дангаар гаргадаг.'
          },
          {
            q: 'Тантай хэрхэн холбогдох вэ?',
            a: 'Та хөл доорх имэйл, утасны дугаараар бидэнтэй холбогдох эсвэл Live Chat ашиглан асуултаа илгээж болно.'
          }
        ]
      : [
          {
            q: 'Is the VFS Global visa fee included in your service price?',
            a: 'No. Our 70,000₮ / 50,000₮ service fee only covers consultation and document preparation. The official VFS Global visa application fee is paid separately.'
          },
          {
            q: 'Do you offer refunds if my visa is refused?',
            a: 'No. Our work focuses on guidance and document preparation, and the final decision belongs only to the Embassy / Visa Center, so the service fee is non‑refundable.'
          },
          {
            q: 'How can I contact you?',
            a: 'You can reach us via the email and phone in the footer, or send your question directly through the Live Chat.'
          }
        ];

    return (
      <section id="contact-faq" className="py-20 bg-white dark:bg-navy-950 border-t border-gray-100 dark:border-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-3">
              {language === 'mn' ? 'Холбоо барих / FAQ' : 'Contact / FAQ'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'mn'
                ? 'Түгээмэл асуултаа доороос шалгаж, шийдэгдэхгүй бол шууд бидэнтэй холбогдоорой.'
                : 'Review common questions below, or reach out directly if you need more help.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-800 p-5"
                >
                  <h3 className="font-semibold text-navy-900 dark:text-white mb-2">
                    {item.q}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-navy-900 dark:bg-navy-800 rounded-2xl p-6 text-white space-y-4">
              <h3 className="text-xl font-serif font-bold">
                {language === 'mn' ? 'Шууд асуулт илгээх' : 'Send a direct question'}
              </h3>
              <p className="text-sm text-navy-100">
                {language === 'mn'
                  ? 'Live Chat болон доорх формыг ашиглан бидэнтэй холбогдоорой. Бид ажлын цагаар эргэн холбогдоно.'
                  : 'Use the Live Chat or the simple form below and we will get back to you during business hours.'}
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder={language === 'mn' ? 'Имэйл хаяг' : 'Email address'}
                  className="w-full px-4 py-2 rounded-lg bg-navy-800 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <textarea
                  rows={4}
                  placeholder={language === 'mn' ? 'Таны асуулт...' : 'Your question...'}
                  className="w-full px-4 py-2 rounded-lg bg-navy-800 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
                />
                <button
                  type="button"
                  className="w-full py-2.5 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-400 transition-colors"
                  onClick={() => setChatOpenTrigger(Date.now())}
                >
                  {language === 'mn' ? 'Live Chat нээх' : 'Open Live Chat'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Special rendering for Admin Dashboard to take full screen
  if (currentPage === Page.ADMIN && user?.role === 'admin') {
     return (
       <AdminDashboard 
         user={user} 
         language={language} 
         onLogout={handleLogout} 
         onApprovePayment={handleApprovePayment}
         onRefundPayment={handleRefundPayment}
       />
     );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-navy-950 transition-colors duration-300 font-sans selection:bg-gold-200 selection:text-navy-900`}>
      <Navbar />
      
      <main className="pt-16 flex-grow">
        {currentPage === Page.HOME && (
          <>
            <Hero />
            <Services />
            <Advantages />
          </>
        )}

        {currentPage === Page.CHECKLIST && (
            <GatedContent user={user} texts={t.gated} onUnlock={() => setIsLoginOpen(true)}>
                <InteractiveChecklist />
            </GatedContent>
        )}

        {currentPage === Page.GUIDE && (
            <GatedContent user={user} texts={t.gated} onUnlock={() => setIsLoginOpen(true)}>
                <StepByStepGuide />
            </GatedContent>
        )}

        {currentPage === Page.PRICING && (
            <PricingSection />
        )}

        {currentPage === Page.DASHBOARD && (
             <GatedContent user={user} texts={t.gated} onUnlock={() => setIsLoginOpen(true)}>
                <Dashboard 
                  user={user} 
                  texts={t.dashboard} 
                  language={language}
                  onNavigate={setCurrentPage}
                />
             </GatedContent>
        )}
      </main>
      
      <ContactFAQSection />

      <div ref={footerRef}>
        <Footer 
          t={t} 
          navigate={setCurrentPage} 
          openTerms={() => setIsTermsOpen(true)}
        />
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
        isDark={theme === 'dark'}
      />

      <TermsModal 
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={handleTermsAccepted}
        language={language}
      />

      <ChatWidget 
        language={language} 
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        triggerPaymentFlow={paymentChatTrigger}
        triggerPaymentConfirmed={paymentConfirmedTrigger}
        triggerOpen={chatOpenTrigger}
      />
    </div>
  );
}

export default App;
