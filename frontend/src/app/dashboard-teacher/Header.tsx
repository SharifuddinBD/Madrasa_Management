// dashboard-teacher/Header.tsx
'use client';
import React from 'react';
import { Menu, Search, Bell, Moon, User } from 'lucide-react';
import { ViewType, TeacherProfile } from './types';

interface HeaderProps {
  currentView: ViewType;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setShowProfile: (show: boolean) => void;
  handleMoonClick: () => void;
  teacherProfile: TeacherProfile;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  sidebarOpen,
  setSidebarOpen,
  setShowProfile,
  handleMoonClick,
  teacherProfile,
}) => {
  const getViewTitle = (): string => {
    const titles: Record<ViewType, string> = {
      dashboard: 'ড্যাশবোর্ড',
      attendance: 'হাজিরা',
      grading: 'পরীক্ষার নম্বর',
      homework: 'গৃহকর্ম',
      notices: 'নোটিশ বোর্ড',
      settings: 'সেটিংস',
      login: '',
    };
    return titles[currentView];
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{getViewTitle()}</h1>
            <p className="text-gray-600 text-sm">بسم الله الرحمن الرحيم</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="খোঁজ করুন..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </div>
          </button>
          
          <button
            onClick={handleMoonClick}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            title="বিশেষ কিছু আছে এখানে... 🌙"
          >
            <Moon className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-800">{teacherProfile.name}</p>
              <p className="text-xs text-gray-600">{teacherProfile.designation}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;