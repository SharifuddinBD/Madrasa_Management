// dashboard-teacher/GradingView.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, BookOpen, Plus, Save, Loader2 } from 'lucide-react';
import { 
  createGrade, 
  getAllGrades, 
  updateGrade, 
  getGradeStats,
  Grade 
} from '@/services/gradeService';

interface Student {
  id: string;
  name: string;
  class: string;
  avatar?: string;
}

interface GradingViewProps {
  students: Student[];
  subjects: string[];
}

const GradingView: React.FC<GradingViewProps> = ({ students, subjects }) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGrade, setEditingGrade] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    subject: '',
    score: ''
  });
  const [stats, setStats] = useState({
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    totalGrades: 0
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch grades on component mount and when filters change
  useEffect(() => {
    fetchGrades();
    fetchStats();
  }, [filterClass, filterSubject]);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (filterClass !== 'all') filters.class = filterClass;
      if (filterSubject !== 'all') filters.subject = filterSubject;

      const response = await getAllGrades(filters);
      setGrades(response.data);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const filters: any = {};
      if (filterClass !== 'all') filters.class = filterClass;
      if (filterSubject !== 'all') filters.subject = filterSubject;

      const response = await getGradeStats(filters);
      setStats(response.data);
    } catch (error: any) {
      console.error('Stats fetch error:', error);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Get unique classes
  const getUniqueClasses = () => {
    const classes = new Set(students.map(s => s.class));
    return Array.from(classes).sort();
  };

  // Get grade color based on score
  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-100';
    if (score >= 80) return 'text-blue-700 bg-blue-100';
    if (score >= 70) return 'text-yellow-700 bg-yellow-100';
    if (score >= 60) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const handleEdit = (gradeId: string, currentScore: number) => {
    setEditingGrade(gradeId);
    setEditValue(currentScore.toString());
  };

  const handleSave = async (gradeId: string) => {
    try {
      const newScore = parseInt(editValue);
      if (isNaN(newScore) || newScore < 0 || newScore > 100) {
        showToast('নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে', 'error');
        return;
      }

      await updateGrade(gradeId, { score: newScore });
      showToast('নম্বর সফলভাবে আপডেট করা হয়েছে', 'success');
      setEditingGrade(null);
      setEditValue('');
      fetchGrades();
      fetchStats();
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  const handleCancel = () => {
    setEditingGrade(null);
    setEditValue('');
  };

  const handleAddGrade = async () => {
    try {
      if (!newGrade.studentId || !newGrade.subject || !newGrade.score) {
        showToast('সকল তথ্য পূরণ করুন', 'error');
        return;
      }

      const score = parseInt(newGrade.score);
      if (isNaN(score) || score < 0 || score > 100) {
        showToast('নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে', 'error');
        return;
      }

      await createGrade({
        studentId: newGrade.studentId,
        subject: newGrade.subject,
        score: score
      });

      showToast('নম্বর সফলভাবে যোগ করা হয়েছে', 'success');
      setNewGrade({ studentId: '', subject: '', score: '' });
      setShowAddForm(false);
      fetchGrades();
      fetchStats();
    } catch (error: any) {
      showToast(error.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {toast.message}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8" />
            <div>
              <p className="text-purple-100 text-sm">গড় নম্বর</p>
              <p className="text-2xl font-bold">{stats.averageScore}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <p className="text-green-100 text-sm">সর্বোচ্চ</p>
              <p className="text-2xl font-bold">{stats.highestScore}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8" />
            <div>
              <p className="text-orange-100 text-sm">সর্বনিম্ন</p>
              <p className="text-2xl font-bold">{stats.lowestScore}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <p className="text-blue-100 text-sm">মোট নম্বর</p>
              <p className="text-2xl font-bold">{stats.totalGrades}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Award className="w-7 h-7 text-purple-600 mr-3" />
            নম্বর প্রদান
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">সকল ক্লাস</option>
              {getUniqueClasses().map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">সকল বিষয়</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              নতুন নম্বর
            </button>
          </div>
        </div>

        {/* Add Grade Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-4">নতুন নম্বর যোগ করুন</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={newGrade.studentId}
                onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">শিক্ষার্থী নির্বাচন করুন</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.class}
                  </option>
                ))}
              </select>

              <select
                value={newGrade.subject}
                onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">বিষয় নির্বাচন করুন</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                max="100"
                value={newGrade.score}
                onChange={(e) => setNewGrade({ ...newGrade, score: e.target.value })}
                placeholder="নম্বর (0-100)"
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />

              <button
                onClick={handleAddGrade}
                disabled={!newGrade.studentId || !newGrade.subject || !newGrade.score}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                সংরক্ষণ
              </button>
            </div>
          </div>
        )}

        {/* Grades Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-semibold text-gray-700">শিক্ষার্থী</th>
                  <th className="text-left p-4 font-semibold text-gray-700">ক্লাস</th>
                  <th className="text-left p-4 font-semibold text-gray-700">বিষয়</th>
                  <th className="text-center p-4 font-semibold text-gray-700">নম্বর</th>
                  <th className="text-center p-4 font-semibold text-gray-700">গ্রেড</th>
                  <th className="text-center p-4 font-semibold text-gray-700">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      <Award className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p>কোন নম্বর পাওয়া যায়নি</p>
                    </td>
                  </tr>
                ) : (
                  grades.map((grade) => {
                    const isEditing = editingGrade === grade.id;
                    const student = students.find(s => s.name === grade.student);

                    return (
                      <tr key={grade.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{student?.avatar || '👨‍🎓'}</span>
                            <span className="font-medium text-gray-800">{grade.student}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{grade.class}</td>
                        <td className="p-4 text-gray-800 font-medium">{grade.subject}</td>
                        <td className="p-4 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-20 px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-center"
                              autoFocus
                            />
                          ) : (
                            <span className={`px-4 py-2 rounded-lg font-bold ${getGradeColor(grade.score)}`}>
                              {grade.score}%
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(grade.score)}`}>
                            {grade.gradeLetter}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {isEditing ? (
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleSave(grade.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                              >
                                সংরক্ষণ
                              </button>
                              <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                              >
                                বাতিল
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEdit(grade.id, grade.score)}
                              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                            >
                              সম্পাদনা
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        {grades.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              মোট <span className="font-bold text-purple-600">{grades.length}</span> টি নম্বর প্রদর্শিত হচ্ছে
              {filterClass !== 'all' && ` (${filterClass})`}
              {filterSubject !== 'all' && ` - ${filterSubject}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradingView;