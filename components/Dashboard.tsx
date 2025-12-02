import React from 'react';
import { Activity, LayoutDashboard, Clock, CheckCircle, ChevronRight, Download, Calendar } from 'lucide-react';
import { User, Page, Language } from '../types';

interface DashboardProps {
  user: User | null;
  texts: {
    welcome: string;
    statusCard: string;
    progressCard: string;
    daysCard: string;
    recentActivity: string;
    quickActions: string;
    downloadForm: string;
    scheduleAppt: string;
    mockStatus: string;
    mockActivity1: string;
    mockActivity2: string;
    emptyActivity: string;
  };
  language: Language;
  onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, texts, language, onNavigate }) => {
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
             <h1 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-2">
              {texts.welcome} <span className="text-gold-500">{user.name}</span>
             </h1>
             <p className="text-gray-600 dark:text-gray-400">Here is your application overview.</p>
          </div>
          <div className="hidden sm:block text-right">
             <span className="text-sm text-gray-500 dark:text-gray-400">
               {new Date().toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {/* Status Card */}
           <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={64} className="text-navy-900 dark:text-white" />
               </div>
               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{texts.statusCard}</h3>
               <div className="text-2xl font-bold text-navy-900 dark:text-white mb-1">{texts.mockStatus}</div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                 <span className="text-sm text-yellow-600 dark:text-yellow-400">In Progress</span>
               </div>
           </div>

           {/* Completion Card */}
           <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <LayoutDashboard size={64} className="text-navy-900 dark:text-white" />
               </div>
               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{texts.progressCard}</h3>
               <div className="flex items-end gap-2">
                 <div className="text-4xl font-bold text-gold-500">30%</div>
                 <span className="text-sm text-gray-400 mb-1.5">Completed</span>
               </div>
               <div className="w-full bg-gray-200 dark:bg-navy-800 h-1.5 rounded-full mt-3">
                  <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
               </div>
           </div>

           {/* Days Card */}
           <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Clock size={64} className="text-navy-900 dark:text-white" />
               </div>
               <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{texts.daysCard}</h3>
               <div className="text-4xl font-bold text-navy-900 dark:text-white">~4-5</div>
               <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Days to submit</div>
           </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Recent Activity */}
           <div className="lg:col-span-2 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 p-6">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-6 flex items-center gap-2">
                 <Activity size={20} className="text-gold-500" />
                 {texts.recentActivity}
              </h3>
              <div className="space-y-6">
                 {/* Item 1 */}
                 <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <div className="w-2 h-2 rounded-full bg-gold-500 mt-2"></div>
                       <div className="w-0.5 h-full bg-gray-100 dark:bg-navy-800 my-1"></div>
                    </div>
                    <div className="pb-4">
                       <p className="text-navy-900 dark:text-white font-medium">{texts.mockActivity2}</p>
                       <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                 </div>
                 {/* Item 2 */}
                 <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-navy-700 mt-2"></div>
                       {/* End of line */}
                    </div>
                    <div>
                       <p className="text-navy-900 dark:text-white font-medium">{texts.mockActivity1}</p>
                       <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="space-y-6">
               <div className="bg-navy-900 dark:bg-navy-800 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                     <CheckCircle size={20} className="text-gold-400" />
                     {texts.quickActions}
                  </h3>
                  <div className="space-y-3">
                     <button 
                       onClick={() => onNavigate(Page.CHECKLIST)}
                       className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm flex items-center justify-between transition-colors"
                     >
                       <span>Continue Checklist</span>
                       <ChevronRight size={16} />
                     </button>
                     <button 
                       className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm flex items-center justify-between transition-colors"
                     >
                       <span className="flex items-center gap-2"><Download size={16} /> {texts.downloadForm}</span>
                     </button>
                     <button 
                       className="w-full py-3 px-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl text-left text-sm flex items-center justify-between transition-colors shadow-lg"
                     >
                       <span className="flex items-center gap-2"><Calendar size={16} /> {texts.scheduleAppt}</span>
                     </button>
                  </div>
               </div>
           </div>
        </div>
      </div>
  );
};

export default Dashboard;