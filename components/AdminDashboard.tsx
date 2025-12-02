
import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  MoreVertical, 
  CheckCircle,
  Clock,
  XCircle,
  Send,
  LogOut,
  LayoutDashboard,
  Filter,
  Download,
  CreditCard,
  Image as ImageIcon,
  Calendar,
  Link as LinkIcon,
  ToggleLeft,
  ToggleRight,
  UploadCloud
} from 'lucide-react';
import { User, Language, Banner } from '../types';
import { TEXTS } from '../constants';

interface AdminDashboardProps {
  user: User | null;
  language: Language;
  onLogout: () => void;
  onApprovePayment?: (userId: string) => void;
  onRefundPayment?: (userId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, language, onLogout, onApprovePayment, onRefundPayment }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'support' | 'users' | 'banner'>('overview');
  const t = TEXTS[language].admin;

  // Mock State for Banner
  const [bannerConfig, setBannerConfig] = useState<Banner>({
    id: '1',
    title: 'Spring Discount',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=600',
    type: 'discount',
    linkUrl: '/pricing',
    isActive: true,
    startDate: '2024-03-01',
    endDate: '2024-03-31'
  });

  if (!user) return null;

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-navy-800 text-white shadow-lg' 
          : 'text-gray-400 hover:bg-navy-900 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  const ApplicationsTable = ({ full = false }) => (
    <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 overflow-hidden">
        {!full && (
            <div className="px-6 py-4 border-b border-gray-100 dark:border-navy-800 flex justify-between items-center">
            <h3 className="font-bold text-navy-900 dark:text-white">Recent Applications</h3>
            <button 
                onClick={() => setActiveTab('applications')}
                className="text-sm text-gold-500 font-medium hover:underline"
            >
                View All
            </button>
            </div>
        )}
        <table className="w-full">
        <thead className="bg-gray-50 dark:bg-navy-950 text-xs uppercase text-gray-500 font-semibold">
            <tr>
            <th className="px-6 py-3 text-left">Applicant</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Payment</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-right">Action</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-navy-800">
            {[1, 2, 3, 4, 5].slice(0, full ? 5 : 3).map((i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors">
                <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-100 dark:bg-navy-800 flex items-center justify-center text-xs font-bold text-navy-700 dark:text-white">
                    U{i}
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-navy-900 dark:text-white">
                             {i === 1 ? 'Bat-Erdene (Demo)' : `User ${i}`}
                        </span>
                        {full && <span className="text-xs text-gray-400">ID: #2024-{1000+i}</span>}
                    </div>
                </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">Tourist (Single)</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    i === 2 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    i === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {i === 2 ? 'Paid' : i === 1 ? 'Pending' : 'Unpaid'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Oct {20 + i}, 2024</td>
                <td className="px-6 py-4 text-right space-x-2">
                  {/* Demo Payment Approval Button for Pending Demo User */}
                  {i === 1 && onApprovePayment && (
                    <button 
                      onClick={() => onApprovePayment('12345')}
                      className="text-xs bg-gold-500 text-navy-900 px-3 py-1 rounded-md font-bold hover:bg-gold-600 transition-colors inline-flex items-center gap-1"
                    >
                      <CreditCard size={12} />
                      {t.approvePayment}
                    </button>
                  )}
                  {/* Demo Refund / Cancellation Button for Paid User */}
                  {i === 2 && onRefundPayment && (
                    <button
                      onClick={() => onRefundPayment('12345')}
                      className="text-xs bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-1"
                    >
                      <XCircle size={12} />
                      {language === 'mn' ? 'ТӨЛБӨР БУЦААХ' : 'Refund / Cancel'}
                    </button>
                  )}
                  {i !== 1 && i !== 2 && (
                    <button className="text-gray-400 hover:text-navy-900 dark:hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  )}
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-navy-950 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-950 border-r border-navy-900 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-navy-900 font-bold">
              A
            </div>
            <h1 className="text-white font-serif font-bold tracking-wide">PreVisa Admin</h1>
          </div>
          
          <nav className="space-y-2">
            <SidebarItem id="overview" icon={LayoutDashboard} label={t.overview} />
            <SidebarItem id="applications" icon={FileText} label={t.applications} />
            <SidebarItem id="support" icon={MessageSquare} label={t.liveChat} />
            <SidebarItem id="users" icon={Users} label={t.users} />
            <SidebarItem id="banner" icon={ImageIcon} label={t.banner} />
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-navy-900">
          <div className="flex items-center gap-3 mb-4">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-600" />
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-gray-500 text-xs truncate">Administrator</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-navy-800 rounded-lg text-gray-400 hover:text-white hover:bg-navy-900 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800 px-8 py-4 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">
            {activeTab === 'overview' && t.overview}
            {activeTab === 'applications' && t.applications}
            {activeTab === 'support' && t.liveChat}
            {activeTab === 'users' && t.users}
            {activeTab === 'banner' && t.banner}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 text-navy-900 dark:text-white w-64"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:text-navy-900 dark:hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW CONTENT */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: t.stats.totalUsers, value: '1,284', change: '+12%', icon: Users, color: 'text-blue-500' },
                  { label: t.stats.pendingVisas, value: '45', change: '-5%', icon: Clock, color: 'text-gold-500' },
                  { label: t.stats.activeChats, value: '8', change: '+2', icon: MessageSquare, color: 'text-green-500' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white dark:bg-navy-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl bg-gray-50 dark:bg-navy-800 ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-navy-900 dark:text-white mb-1">{stat.value}</h3>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              <ApplicationsTable full={false} />
            </div>
          )}

          {/* APPLICATIONS CONTENT */}
          {activeTab === 'applications' && (
             <div className="space-y-6 animate-fade-in">
                 {/* Filters */}
                 <div className="flex justify-between items-center">
                     <div className="flex gap-2">
                         <button className="px-4 py-2 bg-navy-900 text-white rounded-lg text-sm font-medium">All Applications</button>
                         <button className="px-4 py-2 bg-white dark:bg-navy-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-navy-800 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-navy-800">Pending</button>
                         <button className="px-4 py-2 bg-white dark:bg-navy-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-navy-800 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-navy-800">Approved</button>
                     </div>
                     <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-navy-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800">
                         <Filter size={16} /> Filter
                     </button>
                 </div>
                 
                 <ApplicationsTable full={true} />
             </div>
          )}

          {/* LIVE SUPPORT CONTENT */}
          {activeTab === 'support' && (
            <div className="h-[calc(100vh-140px)] flex gap-6 animate-fade-in">
              {/* Active Chats List */}
              <div className="w-1/3 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-navy-800">
                  <h3 className="font-bold text-navy-900 dark:text-white">{t.chat.activeList}</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className={`p-4 border-b border-gray-100 dark:border-navy-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors ${i === 1 ? 'bg-navy-50 dark:bg-navy-800 border-l-4 border-l-gold-500' : ''}`}>
                       <div className="flex justify-between mb-1">
                         <span className="font-medium text-navy-900 dark:text-white text-sm">Bat-Erdene</span>
                         <span className="text-xs text-gray-400">2m ago</span>
                       </div>
                       <p className="text-xs text-gray-500 truncate">Can I submit my bank statement from last month?</p>
                     </div>
                   ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 dark:border-navy-800 flex justify-between items-center bg-gray-50 dark:bg-navy-950">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      <div>
                        <h3 className="font-bold text-navy-900 dark:text-white">Bat-Erdene</h3>
                        <p className="text-xs text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-navy-900 dark:hover:text-white border border-gray-200 dark:border-navy-800 rounded-lg">
                        <CheckCircle size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-500 border border-gray-200 dark:border-navy-800 rounded-lg">
                        <XCircle size={18} />
                      </button>
                   </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50 dark:bg-navy-950/50">
                    <div className="flex justify-start">
                       <div className="max-w-[70%] bg-white dark:bg-navy-800 p-3 rounded-xl rounded-bl-none shadow-sm text-sm text-gray-800 dark:text-gray-200">
                          Hello, I have a question about the financial requirements.
                       </div>
                    </div>
                    <div className="flex justify-start">
                       <div className="max-w-[70%] bg-white dark:bg-navy-800 p-3 rounded-xl rounded-bl-none shadow-sm text-sm text-gray-800 dark:text-gray-200">
                          Can I submit my bank statement from last month? Or does it have to be from this week?
                       </div>
                    </div>
                    <div className="flex justify-center my-4">
                       <span className="text-xs text-gray-400 bg-gray-100 dark:bg-navy-900 px-3 py-1 rounded-full">Today 10:23 AM</span>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900">
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder={t.chat.typeReply}
                        className="flex-1 bg-gray-100 dark:bg-navy-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 text-navy-900 dark:text-white"
                      />
                      <button className="bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 px-6 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                         <Send size={18} />
                         <span className="hidden sm:inline">{t.chat.send}</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* BANNER MANAGEMENT CONTENT */}
          {activeTab === 'banner' && (
            <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
                {/* Configuration Form */}
                <div className="flex-1 bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 p-6">
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-6 border-b border-gray-100 dark:border-navy-800 pb-3">
                        {t.bannerConfig.title}
                    </h3>
                    
                    <div className="space-y-6">
                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.bannerConfig.type}</label>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setBannerConfig({...bannerConfig, type: 'discount'})}
                                    className={`flex-1 py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${bannerConfig.type === 'discount' ? 'bg-navy-50 dark:bg-navy-800 border-gold-500 text-navy-900 dark:text-gold-400' : 'border-gray-200 dark:border-navy-700 text-gray-500'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${bannerConfig.type === 'discount' ? 'border-gold-500 bg-gold-500' : 'border-gray-400'}`}></div>
                                    <span className="font-medium text-sm">{t.bannerConfig.typeDiscount}</span>
                                </button>
                                <button 
                                    onClick={() => setBannerConfig({...bannerConfig, type: 'standard'})}
                                    className={`flex-1 py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${bannerConfig.type === 'standard' ? 'bg-navy-50 dark:bg-navy-800 border-gold-500 text-navy-900 dark:text-gold-400' : 'border-gray-200 dark:border-navy-700 text-gray-500'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 ${bannerConfig.type === 'standard' ? 'border-gold-500 bg-gold-500' : 'border-gray-400'}`}></div>
                                    <span className="font-medium text-sm">{t.bannerConfig.typeStandard}</span>
                                </button>
                            </div>
                        </div>

                        {/* Image Upload Simulation */}
                        <div>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.bannerConfig.image}</label>
                             <div className="border-2 border-dashed border-gray-300 dark:border-navy-700 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-navy-900/50 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors cursor-pointer group">
                                <div className="p-4 bg-white dark:bg-navy-800 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <UploadCloud className="text-navy-900 dark:text-gold-500" size={32} />
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.bannerConfig.upload}</span>
                                <span className="text-xs text-gray-400 mt-1">JPG, PNG up to 2MB</span>
                             </div>
                        </div>

                        {/* Link Input */}
                        <div>
                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.bannerConfig.link}</label>
                             <div className="relative">
                                 <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                 <input 
                                    type="text" 
                                    value={bannerConfig.linkUrl}
                                    onChange={(e) => setBannerConfig({...bannerConfig, linkUrl: e.target.value})}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none text-navy-900 dark:text-white text-sm"
                                 />
                             </div>
                        </div>

                        {/* Schedule & Visibility */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.bannerConfig.schedule}</label>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">{t.bannerConfig.startDate}</span>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="date" 
                                            value={bannerConfig.startDate}
                                            onChange={(e) => setBannerConfig({...bannerConfig, startDate: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-lg text-sm text-navy-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">{t.bannerConfig.endDate}</span>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="date" 
                                            value={bannerConfig.endDate}
                                            onChange={(e) => setBannerConfig({...bannerConfig, endDate: e.target.value})}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-navy-950 border border-gray-200 dark:border-navy-700 rounded-lg text-sm text-navy-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-950 rounded-xl border border-gray-200 dark:border-navy-700">
                                <span className="font-medium text-navy-900 dark:text-white text-sm">{t.bannerConfig.showOnHome}</span>
                                <button 
                                    onClick={() => setBannerConfig({...bannerConfig, isActive: !bannerConfig.isActive})}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 ${bannerConfig.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-navy-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${bannerConfig.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                            {t.bannerConfig.save}
                        </button>
                    </div>
                </div>

                {/* Status Preview */}
                <div className="w-full lg:w-96">
                    <div className="bg-white dark:bg-navy-900 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-800 p-6 sticky top-24">
                         <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-6 border-b border-gray-100 dark:border-navy-800 pb-3 flex items-center gap-2">
                            <LayoutDashboard size={18} className="text-gold-500" />
                            {t.bannerConfig.preview}
                        </h3>

                        {bannerConfig.isActive ? (
                             <div className="space-y-4">
                                <div className="relative rounded-xl overflow-hidden shadow-md group">
                                    <img src={bannerConfig.imageUrl} alt="Banner Preview" className="w-full h-48 object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider border border-white px-3 py-1 rounded-full">Preview Mode</span>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                                        ACTIVE
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Status</span>
                                        <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                                            <CheckCircle size={14} /> Live
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Type</span>
                                        <span className="text-navy-900 dark:text-white capitalize font-medium">{bannerConfig.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="text-navy-900 dark:text-white font-medium">{bannerConfig.startDate} - {bannerConfig.endDate}</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100 dark:border-navy-800">
                                         <span className="text-xs text-gray-400 block mb-1">Target Link</span>
                                         <a href="#" className="text-gold-600 dark:text-gold-400 text-sm truncate block hover:underline">{bannerConfig.linkUrl}</a>
                                    </div>
                                </div>
                             </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                    <XCircle size={24} />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{t.bannerConfig.noActive}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          )}

          {/* Placeholder for Users Tab */}
          {activeTab === 'users' && (
            <div className="flex items-center justify-center h-64 text-gray-400 animate-fade-in">
              <Users size={48} className="mb-4 opacity-20" />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;