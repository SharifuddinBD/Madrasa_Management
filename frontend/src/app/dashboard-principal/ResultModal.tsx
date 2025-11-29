'use client';
import React, { useState } from 'react';

type Props = {
  onClose: () => void;
  onSubmit: (student: string, className: string, exam: string, grade: string) => void;
};

const ResultModal = ({ onClose, onSubmit }: Props) => {
  const [student, setStudent] = useState('');
  const [className, setClassName] = useState('');
  const [exam, setExam] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = () => {
    if (!student || !className || !exam || !grade) {
      alert('সব ফিল্ড পূরণ করুন');
      return;
    }
    onSubmit(student, className, exam, grade);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">ফলাফল যুক্ত করুন</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="ছাত্র/ছাত্রীর নাম"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="ক্লাস"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="পরীক্ষার নাম"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="গ্রেড"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
