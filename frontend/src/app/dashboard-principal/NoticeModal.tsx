'use client';
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

type Props = {
  onClose: () => void;
};

const NoticeModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success'>('info');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('দয়া করে শিরোনাম এবং বিষয়বস্তু লিখুন।');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/notices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          type: type,
        }),
      });

      if (!response.ok) {
        throw new Error('নোটিশ পাঠাতে ব্যর্থ হয়েছে');
      }

      const data = await response.json();

      if (data.success) {
        // Reset form
        setTitle('');
        setContent('');
        setType('info');
        
        // Refresh notices list if the function exists
        if (typeof (window as any).refreshNotices === 'function') {
          (window as any).refreshNotices();
        }
        
        // Close modal
        onClose();
        
        // Show success message
        alert('নোটিশ সফলভাবে পাঠানো হয়েছে!');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'নোটিশ পাঠাতে সমস্যা হয়েছে');
      console.error('Error creating notice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">নতুন নোটিশ পাঠান</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নোটিশের শিরোনাম
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="নোটিশের শিরোনাম লিখুন..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নোটিশের ধরন
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'info' | 'warning' | 'success')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="info">তথ্য</option>
              <option value="warning">সতর্কতা</option>
              <option value="success">সফলতা</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নোটিশের বিষয়বস্তু
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="নোটিশের বিষয়বস্তু লিখুন..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            বাতিল
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                পাঠানো হচ্ছে...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                পাঠান
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
