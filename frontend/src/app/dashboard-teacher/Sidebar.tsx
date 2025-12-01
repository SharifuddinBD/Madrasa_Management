// dashboard-teacher/Sidebar.tsx
'use client';
import React from 'react';
import { BookOpen, Home, ClipboardList, GraduationCap, BookMarked, Settings, LogOut, Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ViewType } from './types';

interface SidebarItem {
  id: ViewType;
  label: string;
  icon: any;
  color: string;
}

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, sidebarOpen }) => {
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Home, color: 'text-emerald-600' },
    { id: 'attendance', label: 'হাজিরা', icon: ClipboardList, color: 'text-blue-600' },
    { id: 'grading', label: 'পরীক্ষার নম্বর', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'homework', label: 'গৃহকর্ম', icon: BookMarked, color: 'text-orange-600' },
    { id: 'notices', label: 'নোটিশ', icon: Bell, color: 'text-red-600' },
    { id: 'settings', label: 'সেটিংস', icon: Settings, color: 'text-gray-600' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userAuth');
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-30 transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-gray-800">মাদ্রাসা ড্যাশবোর্ড</h2>
              <p className="text-xs text-gray-500">শিক্ষক প্যানেল</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors ${
              currentView === item.id ? 'bg-emerald-50 border-r-4 border-emerald-500' : ''
            }`}
          >
            <item.icon className={`w-6 h-6 ${currentView === item.id ? 'text-emerald-600' : item.color}`} />
            {sidebarOpen && (
              <span className={`font-medium ${currentView === item.id ? 'text-emerald-600' : 'text-gray-700'}`}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="font-medium">লগ আউট</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;