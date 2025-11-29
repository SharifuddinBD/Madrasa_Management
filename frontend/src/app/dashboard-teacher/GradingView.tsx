'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Check } from 'lucide-react';

interface Grade {
  id: number;
  student: string;
}

interface SavedGrade {
  student: string;
  exam: string;
  subject: string;
  score: number;
}

interface GradingViewProps {
  grades: Grade[];
}

const examOrder = ['মাসিক পরীক্ষা', 'অর্ধবার্ষিক', 'বার্ষিক'];
const subjectOrder = ['আকাইদ', 'তাজভীদ', 'ফিকহ', 'হাদীস', 'তাফসীর'];

const examOptions = examOrder;
const subjectOptions = subjectOrder;

const GradingView: React.FC<GradingViewProps> = ({ grades }) => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [marks, setMarks] = useState<{ [id: number]: number }>({});
  const [savedData, setSavedData] = useState<SavedGrade[]>([]);

  // Load from localStorage with demo data
  useEffect(() => {
    const stored = localStorage.getItem('markData');
    if (stored) {
      setSavedData(JSON.parse(stored));
    } else {
      const demoData: SavedGrade[] = [
        { student: 'আবু হুরায়রা', exam: 'মাসিক পরীক্ষা', subject: 'আকাইদ', score: 80 },
        { student: 'আবু হুরায়রা', exam: 'মাসিক পরীক্ষা', subject: 'তাজভীদ', score: 75 },
        { student: 'ইবনু কাসীর', exam: 'অর্ধবার্ষিক', subject: 'ফিকহ', score: 85 },
        { student: 'ইবনু কাসীর', exam: 'বার্ষিক', subject: 'হাদীস', score: 90 },
      ];
      setSavedData(demoData);
      localStorage.setItem('markData', JSON.stringify(demoData));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('markData', JSON.stringify(savedData));
  }, [savedData]);

  const handleSaveMarks = () => {
    if (!selectedExam || !selectedSubject) {
      alert('পরীক্ষার ধরন ও বিষয় নির্বাচন করুন।');
      return;
    }

    const newData: SavedGrade[] = grades.map((g) => ({
      student: g.student,
      exam: selectedExam,
      subject: selectedSubject,
      score: marks[g.id] ?? 0,
    }));

    setSavedData((prev) => {
      // Remove duplicates for same exam+subject
      const filtered = prev.filter(
        (entry) =>
          !(
            entry.exam === selectedExam &&
            entry.subject === selectedSubject &&
            newData.some((n) => n.student === entry.student)
          )
      );
      return [...filtered, ...newData];
    });

    setMarks({});
  };

  // Create column order: Exam > Subject
  const allColumns = examOrder.flatMap((exam) =>
    subjectOrder
      .map((subject) => `${exam} - ${subject}`)
      .filter((col) =>
        savedData.some(
          (d) => `${d.exam} - ${d.subject}` === col
        )
      )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <GraduationCap className="w-7 h-7 text-purple-600 mr-3" />
          পরীক্ষার নম্বর প্রদান
        </h2>

        {/* Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="">পরীক্ষা নির্বাচন করুন</option>
            {examOptions.map((exam) => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="">বিষয় নির্বাচন করুন</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <button
            onClick={handleSaveMarks}
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>সংরক্ষণ করুন</span>
          </button>
        </div>

        {/* Marks Entry */}
        {selectedExam && selectedSubject && (
          <div className="grid gap-4">
            {grades.map((grade) => (
              <div
                key={grade.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md"
              >
                <div className="font-semibold text-gray-800">{grade.student}</div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={marks[grade.id] ?? ''}
                  onChange={(e) =>
                    setMarks((prev) => ({
                      ...prev,
                      [grade.id]: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Marks Table */}
      {savedData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">মার্কশিট</h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">শিক্ষার্থী</th>
                {allColumns.map((col, idx) => (
                  <th key={idx} className="border px-4 py-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2 font-semibold">{student.student}</td>
                  {allColumns.map((col, idx) => {
                    const [exam, subject] = col.split(' - ');
                    const entry = savedData.find(
                      (d) =>
                        d.student === student.student &&
                        d.exam === exam &&
                        d.subject === subject
                    );
                    return (
                      <td key={idx} className="border px-4 py-2 text-center">
                        {entry ? entry.score : '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GradingView;
