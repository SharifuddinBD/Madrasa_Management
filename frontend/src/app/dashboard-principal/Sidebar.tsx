'use client';
import React from 'react';
import {
  Users,
  FileText,
  Bell,
  Home,
  GraduationCap,
  Settings,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    localStorage.removeItem('userAuth');
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-green-700 to-green-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-green-600">
        <h2 className="text-xl font-bold text-center">দারুল হিকমাহ ইনস্টিটিউট</h2>
        <p className="text-green-200 text-center text-sm mt-1">প্রিন্সিপাল প্যানেল</p>
      </div>
      <nav className="mt-6">
        <div className="px-4 py-2">
          <p className="text-green-200 text-xs uppercase font-semibold">মূল মেনু</p>
        </div>
        {[
          { id: 'overview', label: 'ওভারভিউ', icon: Home },
          { id: 'students', label: 'শিক্ষার্থী তথ্য', icon: Users },
          { id: 'teachers', label: 'শিক্ষক তথ্য', icon: GraduationCap },
          { id: 'results', label: 'ফলাফল', icon: FileText },
          { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell }
        ].map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(id);
            }}
            className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-colors duration-200 ${
              activeTab === id ? 'bg-green-600' : 'hover:bg-green-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="ml-3">{label}</span>
          </a>
        ))}

        <div className="px-4 py-2 mt-4">
          <p className="text-green-200 text-xs uppercase font-semibold">অন্যান্য</p>
        </div>
        {[
          { id: 'settings', label: 'সেটিংস', icon: Settings },
          { id: 'logout', label: 'লগ আউট', icon: LogOut, action: handleLogout }
        ].map(({ id, label, icon: Icon, action }) => (
          <a
            key={id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              action?.();
            }}
            className="flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-colors duration-200 hover:bg-green-600"
          >
            <Icon className="w-5 h-5" />
            <span className="ml-3">{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;