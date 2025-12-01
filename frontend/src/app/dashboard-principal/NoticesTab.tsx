'use client';
import React, { useEffect, useState } from 'react';
import { Trash2, Bell, AlertCircle } from 'lucide-react';

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

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoticesTab = ({ setShowModal }: Props) => {
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
        setNotices(data.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete notice
  const handleDeleteNotice = async (id: string) => {
    if (!confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/notices/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('নোটিশ মুছতে ব্যর্থ হয়েছে');
      }

      const data = await response.json();
      
      if (data.success) {
        setNotices(prev => prev.filter(n => n._id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'নোটিশ মুছতে সমস্যা হয়েছে');
      console.error('Error deleting notice:', err);
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
    return `${diffInDays} দিন আগে`;
  };

  // Fetch notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Expose refresh function to parent (optional)
  useEffect(() => {
    (window as any).refreshNotices = fetchNotices;
    return () => {
      delete (window as any).refreshNotices;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">নোটিশ বোর্ড</h3>
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>লোড হচ্ছে...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">নোটিশ বোর্ড</h3>
          <div className="text-center py-8 text-red-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p>{error}</p>
            <button
              onClick={fetchNotices}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">নোটিশ বোর্ড</h3>
          <button
            onClick={fetchNotices}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            রিফ্রেশ করুন
          </button>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>কোন নোটিশ নেই</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className={`border-l-4 p-4 rounded-r-lg ${
                  notice.type === 'info'
                    ? 'border-blue-500 bg-blue-50'
                    : notice.type === 'warning'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className={`font-semibold ${
                      notice.type === 'info'
                        ? 'text-blue-800'
                        : notice.type === 'warning'
                        ? 'text-yellow-800'
                        : 'text-green-800'
                    }`}>
                      {notice.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{notice.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      প্রকাশিত: {getTimeDifference(notice.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(notice._id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                    title="নোটিশ মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesTab;