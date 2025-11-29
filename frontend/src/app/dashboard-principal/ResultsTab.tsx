'use client';
import React, { useState } from 'react';
import { Eye, Trash2, Plus, FileText } from 'lucide-react';
import ResultModal from './ResultModal';

type Result = {
  id: number;
  student: string;
  className: string;
  exam: string;
  grade: string;
};

type Props = {
  results: Result[];
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
};

// Helper function to get grade colors
const getGradeColor = (grade: string): string => {
  const gradeColors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-800',
    'A': 'bg-green-100 text-green-700',
    'A-': 'bg-green-100 text-green-600',
    'B+': 'bg-blue-100 text-blue-700',
    'B': 'bg-blue-100 text-blue-600',
    'B-': 'bg-blue-100 text-blue-500',
    'C+': 'bg-yellow-100 text-yellow-700',
    'C': 'bg-yellow-100 text-yellow-600',
    'C-': 'bg-orange-100 text-orange-600',
    'D': 'bg-red-100 text-red-600',
    'F': 'bg-red-100 text-red-700'
  };
  return gradeColors[grade] || 'bg-gray-100 text-gray-600';
};

const ResultsTab = ({ results, setResults }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm('আপনি কি এই ফলাফলটি মুছে ফেলতে চান?')) {
      setResults(prev => prev.filter(res => res.id !== id));
    }
  };

  const handleAddResult = (student: string, className: string, exam: string, grade: string) => {
    const newResult: Result = {
      id: Date.now(),
      student,
      className,
      exam,
      grade
    };
    setResults(prev => [newResult, ...prev]);
    setShowModal(false);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">ফলাফল তালিকা</h3>
              <p className="text-green-100 text-sm">সকল ছাত্র-ছাত্রীদের পরীক্ষার ফলাফল</p>
            </div>
            <button
              className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-all duration-200 shadow-md font-medium flex items-center"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              ফলাফল যোগ করুন
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {results.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">কোনো ফলাফল পাওয়া যায়নি</h4>
              <p className="text-gray-500 mb-6">নতুন ফলাফল যোগ করতে উপরের বাটনে ক্লিক করুন</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                প্রথম ফলাফল যোগ করুন
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ছাত্র/ছাত্রী
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ক্লাস
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        পরীক্ষা
                      </th>
                      <th className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ফলাফল
                      </th>
                      <th className="px-8 py-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        কার্যক্রম
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                      <tr 
                        key={result.id} 
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                        }`}
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              <span className="text-blue-600 font-semibold text-sm">
                                {result.student?.charAt(0) || 'ছ'}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {result.student}
                              </div>
                              <div className="text-sm text-gray-500">
                                আইডি: {result.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {result.className}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{result.exam}</div>
                          <div className="text-sm text-gray-500">পরীক্ষা</div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                            getGradeColor(result.grade)
                          }`}>
                            {result.grade}
                          </span>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-3">
                            <button 
                              className="p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                              title="বিস্তারিত দেখুন"
                            >
                              <Eye size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                              className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                              title="মুছে ফেলুন"
                              onClick={() => handleDelete(result.id)}
                            >
                              <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Statistics and Footer */}
          {results.length > 0 && (
            <div className="mt-8 space-y-4">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{results.length}</div>
                  <div className="text-sm text-blue-600">মোট ফলাফল</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter(r => ['A+', 'A', 'A-'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-green-600">উত্তীর্ণ</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.filter(r => ['B+', 'B', 'B-'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-yellow-600">গড় ফলাফল</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {results.filter(r => ['C+', 'C', 'C-', 'D', 'F'].includes(r.grade)).length}
                  </div>
                  <div className="text-sm text-red-600">উন্নতি প্রয়োজন</div>
                </div>
              </div>
              
              {/* Pagination */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-600">মোট {results.length} টি ফলাফল</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    পূর্ববর্তী
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    পরবর্তী
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ResultModal onClose={() => setShowModal(false)} onSubmit={handleAddResult} />
      )}
    </div>
  );
};

export default ResultsTab;