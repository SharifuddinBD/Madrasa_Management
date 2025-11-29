'use client';
import React from 'react';
import { Trash2, Bell } from 'lucide-react';

type Notice = {
  id: number;
  title: string;
  content: string;
  date: Date;
  type: 'info' | 'warning';
};

type Props = {
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoticesTab = ({ notices, setNotices, setShowModal }: Props) => {
  const handleDeleteNotice = (id: number) => {
    if (confirm('আপনি কি এই নোটিশটি মুছে ফেলতে চান?')) {
      setNotices(prev => prev.filter(n => n.id !== id));
    }
  };

  const getTimeDifference = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'এইমাত্র';
    if (diffInHours < 24) return `${diffInHours} ঘন্টা আগে`;
    return `${Math.floor(diffInHours / 24)} দিন আগে`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">নোটিশ বোর্ড</h3>

        {notices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>কোন নোটিশ নেই</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
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
                    <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                    <p className="text-xs text-gray-500 mt-2">প্রকাশিত: {getTimeDifference(notice.date)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
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
