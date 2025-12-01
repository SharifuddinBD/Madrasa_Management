// dashboard-teacher/HomeworkTab.tsx
'use client';
import React, { useState } from 'react';
import { BookMarked, Plus, Calendar, Trash2 } from 'lucide-react';
import { Homework } from './types';

interface HomeworkTabProps {
  homework: Homework[];
  addHomework: (hw: Omit<Homework, 'id'>) => void;
  deleteHomework: (id: number) => void;
}

const HomeworkTab: React.FC<HomeworkTabProps> = ({ homework, addHomework, deleteHomework }) => {
  const [newHomework, setNewHomework] = useState({ subject: '', assignment: '', dueDate: '' });

  const handleAddHomework = () => {
    if (newHomework.subject && newHomework.assignment && newHomework.dueDate) {
      addHomework(newHomework);
      setNewHomework({ subject: '', assignment: '', dueDate: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BookMarked className="w-7 h-7 text-orange-600 mr-3" />
          গৃহকর্ম ব্যবস্থাপনা
        </h2>
        
        {/* Add New Homework */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl mb-6 border border-orange-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Plus className="w-5 h-5 text-orange-600 mr-2" />
            নতুন গৃহকর্ম যোগ করুন
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="বিষয়"
              value={newHomework.subject}
              onChange={(e) => setNewHomework(prev => ({ ...prev, subject: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="কাজের বিবরণ"
              value={newHomework.assignment}
              onChange={(e) => setNewHomework(prev => ({ ...prev, assignment: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="date"
              value={newHomework.dueDate}
              onChange={(e) => setNewHomework(prev => ({ ...prev, dueDate: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddHomework}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>যোগ করুন</span>
          </button>
        </div>

        {/* Homework List */}
        <div className="grid gap-4">
          {homework.map(hw => (
            <div key={hw.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-800">{hw.subject}</h3>
                </div>
                <p className="text-gray-700 mb-2">{hw.assignment}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>শেষ তারিখ: {hw.dueDate}</span>
                </div>
              </div>
              <button
                onClick={() => deleteHomework(hw.id)}
                className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkTab;