'use client';
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

type Props = {
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
};

const NoticeModal = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">নতুন নোটিশ পাঠান</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
            />
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
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            বাতিল
          </button>
          <button
            onClick={() => {
              if (!title.trim() || !content.trim()) {
                alert('দয়া করে শিরোনাম এবং বিষয়বস্তু লিখুন।');
                return;
              }
              onSubmit(title, content);
              setTitle('');
              setContent('');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            পাঠান
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
