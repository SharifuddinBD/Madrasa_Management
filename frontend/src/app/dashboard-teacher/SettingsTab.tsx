// dashboard-teacher/SettingsTab.tsx
'use client';
import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('বাংলা');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-7 h-7 text-gray-600 mr-3" />
          সেটিংস
        </h2>
        
        <div className="grid gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">সাধারণ সেটিংস</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">নোটিফিকেশন</span>
                <button
                  onClick={() => setNotificationEnabled(!notificationEnabled)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notificationEnabled ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationEnabled ? 'ml-auto' : ''
                    }`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">ডার্ক মোড</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    darkMode ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      darkMode ? 'ml-auto' : ''
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">ভাষা ও অঞ্চল</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ভাষা</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option>বাংলা</option>
                  <option>English</option>
                  <option>العربية</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;