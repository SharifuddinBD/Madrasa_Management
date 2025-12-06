// dashboard-teacher/GradingView.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Users, BookOpen, Plus, Save, Loader2, BookMarked } from 'lucide-react';
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

interface Course {
  _id: string;
  courseName: string;
  courseCode: string;
  className: string;
}

interface EnrolledStudent {
  _id: string;
  fullName: string;
  className: string;
  rollNumber: string;
}

interface GradingViewProps {
  students: Student[];
  subjects: string[];
  teacherId: string;
}

const GradingView: React.FC<GradingViewProps> = ({ students, subjects, teacherId }) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGrade, setEditingGrade] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New states for course-based grading
  const [assignedCourses, setAssignedCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [courseStudents, setCourseStudents] = useState<EnrolledStudent[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch assigned courses on component mount
  useEffect(() => {
    fetchAssignedCourses();
  }, [teacherId]);

  // Fetch students when course is selected
  useEffect(() => {
    if (selectedCourse) {
      fetchCourseStudents(selectedCourse);
      fetchGrades();
      fetchStats();
    }
  }, [selectedCourse, filterClass]);

  const fetchAssignedCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await fetch(`${API_URL}/api/teachers/${teacherId}/courses`);
      
      if (!response.ok) {
        throw new Error('কোর্স লোড করতে ব্যর্থ');
      }

      const data = await response.json();
      
      if (data.success) {
        setAssignedCourses(data.data);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchCourseStudents = async (courseId: string) => {
    try {
      setLoadingStudents(true);
      const response = await fetch(`${API_URL}/api/courses/${courseId}/students`);
      
      if (!response.ok) {
        throw new Error('শিক্ষার্থী লোড করতে ব্যর্থ');
      }

      const data = await response.json();
      
      if (data.success) {
        setCourseStudents(data.data);
      }
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoadingStudents(false);
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    if (!selectedCourse) return;
    
    try {
      setLoading(true);
      const filters: any = { courseId: selectedCourse };
      if (filterClass !== 'all') filters.class = filterClass;

      const response = await getAllGrades(filters);
      setGrades(response.data);
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!selectedCourse) return;
    
    try {
      const filters: any = { courseId: selectedCourse };
      if (filterClass !== 'all') filters.class = filterClass;

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

  // Get unique classes from course students
  const getUniqueClasses = () => {
    const classes = new Set(courseStudents.map(s => s.className));
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

  // Convert class name to Bengali
  const getClassNameInBengali = (className: string): string => {
    const classMap: { [key: string]: string } = {
      'madani-first': 'মাদানী প্রথম',
      'madani-second': 'মাদানী দ্বিতীয়',
      'hifz-beginner': 'হিফজ বিভাগ - প্রাথমিক',
      'hifz-intermediate': 'হিফজ বিভাগ - মধ্য',
      'hifz-advanced': 'হিফজ বিভাগ - উচ্চ',
      'nazera': 'নাযেরা',
      'qaida': 'কায়দা'
    };
    return classMap[className] || className;
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
      if (!newGrade.studentId || !newGrade.score) {
        showToast('সকল তথ্য পূরণ করুন', 'error');
        return;
      }

      const score = parseInt(newGrade.score);
      if (isNaN(score) || score < 0 || score > 100) {
        showToast('নম্বর ০ থেকে ১০০ এর মধ্যে হতে হবে', 'error');
        return;
      }

      const selectedCourseObj = assignedCourses.find(c => c._id === selectedCourse);
      if (!selectedCourseObj) {
        showToast('কোর্স নির্বাচন করুন', 'error');
        return;
      }

      await createGrade({
        studentId: newGrade.studentId,
        courseId: selectedCourse,
        subject: selectedCourseObj.courseName,
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

  const handleCourseChange = (courseId: string) => {
    setSelectedCourse(courseId);
    setGrades([]);
    setCourseStudents([]);
    setShowAddForm(false);
  };

  // Show course selection screen if no course is selected
  if (!selectedCourse) {
    return (
      <div className="space-y-6">
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {toast.message}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <BookMarked className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">নম্বর প্রদান</h2>
            <p className="text-gray-600">আপনার নির্ধারিত কোর্স থেকে একটি নির্বাচন করুন</p>
          </div>

          {loadingCourses ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          ) : assignedCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-30 text-gray-400" />
              <p className="text-gray-500">আপনার কোন কোর্স নির্ধারিত নেই</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedCourses.map((course) => (
                <button
                  key={course._id}
                  onClick={() => handleCourseChange(course._id)}
                  className="p-6 border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left group"
                >
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{course.courseCode}</p>
                      <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {getClassNameInBengali(course.className)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const selectedCourseObj = assignedCourses.find(c => c._id === selectedCourse);

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

      {/* Main Grading Panel */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header with Course Info and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
              <Award className="w-7 h-7 text-purple-600 mr-3" />
              নম্বর প্রদান
            </h2>
            {selectedCourseObj && (
              <div className="flex items-center space-x-3 text-sm">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  {selectedCourseObj.courseName}
                </span>
                <span className="text-gray-500">{selectedCourseObj.courseCode}</span>
                <button
                  onClick={() => setSelectedCourse('')}
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  কোর্স পরিবর্তন করুন
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {getUniqueClasses().length > 1 && (
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">সকল ক্লাস</option>
                {getUniqueClasses().map(className => (
                  <option key={className} value={className}>
                    {getClassNameInBengali(className)}
                  </option>
                ))}
              </select>
            )}

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newGrade.studentId}
                onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">শিক্ষার্থী নির্বাচন করুন</option>
                {courseStudents
                  .filter(s => filterClass === 'all' || s.className === filterClass)
                  .map(student => (
                    <option key={student._id} value={student._id}>
                      {student.fullName} - {getClassNameInBengali(student.className)} (Roll: {student.rollNumber})
                    </option>
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
                disabled={!newGrade.studentId || !newGrade.score}
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
          {loading || loadingStudents ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-semibold text-gray-700">শিক্ষার্থী</th>
                  <th className="text-left p-4 font-semibold text-gray-700">রোল</th>
                  <th className="text-left p-4 font-semibold text-gray-700">ক্লাস</th>
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
                      <p className="text-sm mt-2">উপরে "নতুন নম্বর" বাটনে ক্লিক করে নম্বর যোগ করুন</p>
                    </td>
                  </tr>
                ) : (
                  grades.map((grade) => {
                    const isEditing = editingGrade === grade.id;
                    const student = courseStudents.find(s => s._id === grade.studentId);

                    return (
                      <tr key={grade.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">👨‍🎓</span>
                            <span className="font-medium text-gray-800">{grade.student}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{student?.rollNumber || '-'}</td>
                        <td className="p-4 text-gray-600">{getClassNameInBengali(grade.class)}</td>
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
              {filterClass !== 'all' && ` (${getClassNameInBengali(filterClass)})`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradingView;