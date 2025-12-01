// dashboard-teacher/NoticesTab.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Bell, AlertCircle, RefreshCw, Info, AlertTriangle, CheckCircle } from 'lucide-react';

type Notice = {
  _id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
};

const NoticesTab: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch notices from backend
  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/notices`);
      
      if (!response.ok) {
        throw new Error('নোটিশ লোড করতে ব্যর্থ হয়েছে');
      }

      const data = await response.json();
      
      if (data.success) {
        // Only show active notices to teachers
        const activeNotices = data.data.filter((notice: Notice) => notice.isActive);
        setNotices(activeNotices);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get time difference
  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'এইমাত্র';
    if (diffInHours < 24) return `${diffInHours} ঘন্টা আগে`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} দিন আগে`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} মাস আগে`;
  };

  // Get icon based on notice type
  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-6 h-6" />;
      case 'success':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  // Get colors based on notice type
  const getNoticeColors = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          border: 'border-yellow-500',
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          icon: 'text-yellow-600'
        };
      case 'success':
        return {
          border: 'border-green-500',
          bg: 'bg-green-50',
          text: 'text-green-800',
          icon: 'text-green-600'
        };
      default:
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          icon: 'text-blue-600'
        };
    }
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNotices, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Bell className="w-7 h-7 text-blue-600 mr-3" />
            নোটিশ বোর্ড
          </h2>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Bell className="w-7 h-7 text-blue-600 mr-3" />
            নোটিশ বোর্ড
          </h2>
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={fetchNotices}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              <span>পুনরায় চেষ্টা করুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="w-7 h-7 text-blue-600 mr-3" />
            নোটিশ বোর্ড
          </h2>
          <button
            onClick={fetchNotices}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-medium">রিফ্রেশ</span>
          </button>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg font-medium">কোন নোটিশ নেই</p>
            <p className="text-gray-400 text-sm mt-2">এই মুহূর্তে কোন সক্রিয় নোটিশ নেই</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => {
              const colors = getNoticeColors(notice.type);
              return (
                <div
                  key={notice._id}
                  className={`border-l-4 ${colors.border} ${colors.bg} p-5 rounded-r-xl shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={colors.icon}>
                      {getNoticeIcon(notice.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className={`font-bold text-lg ${colors.text} mb-2`}>
                          {notice.title}
                        </h3>
                        {notice.priority > 0 && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            জরুরি
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap leading-relaxed">
                        {notice.content}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <p className="text-gray-500 flex items-center">
                          <span className="mr-1">📅</span>
                          প্রকাশিত: {getTimeDifference(notice.createdAt)}
                        </p>
                        {notice.type === 'warning' && (
                          <span className="text-yellow-600 font-medium">⚠️ সতর্কতা</span>
                        )}
                        {notice.type === 'success' && (
                          <span className="text-green-600 font-medium">✓ সফলতা</span>
                        )}
                        {notice.type === 'info' && (
                          <span className="text-blue-600 font-medium">ℹ️ তথ্য</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Notice Count */}
        {notices.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              মোট {notices.length}টি সক্রিয় নোটিশ প্রদর্শিত হচ্ছে
            </p>
          </div>
        )}
      </div>

      {/* Notice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <Info className="w-8 h-8" />
            <div>
              <p className="text-blue-100 text-sm">তথ্য নোটিশ</p>
              <p className="text-2xl font-bold">
                {notices.filter(n => n.type === 'info').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <p className="text-yellow-100 text-sm">সতর্কতা</p>
              <p className="text-2xl font-bold">
                {notices.filter(n => n.type === 'warning').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8" />
            <div>
              <p className="text-green-100 text-sm">সফলতা</p>
              <p className="text-2xl font-bold">
                {notices.filter(n => n.type === 'success').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesTab;