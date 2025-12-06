// dashboard-principal/CourseAssignmentTab.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, UserPlus, Trash2, Plus, Save, X, AlertCircle, CheckCircle, Loader2, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';
import { AxiosError } from 'axios';

interface Teacher {
  _id: string;
  teacherName: string;
  designation: string;
  subject?: string;
  phoneNumber: string;
  email?: string;
}

interface Course {
  _id: string;
  courseName: string;
  courseCode: string;
  className: string;
  teacherId?: string;
  teacherName?: string;
  description?: string;
  createdAt?: string;
}

interface CourseAssignment {
  _id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  className: string;
  teacherId: string;
  teacherName: string;
  assignedDate: string;
}

const CourseAssignmentTab = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<CourseAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // New Course Form
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    courseCode: '',
    className: '',
    description: ''
  });

  const classOptions = [
    { value: 'madani-first', label: 'মাদানী প্রথম' },
    { value: 'madani-second', label: 'মাদানী দ্বিতীয়' },
    { value: 'hifz-beginner', label: 'হিফজ - প্রাথমিক' },
    { value: 'hifz-intermediate', label: 'হিফজ - মধ্য' },
    { value: 'hifz-advanced', label: 'হিফজ - উচ্চ' },
    { value: 'nazera', label: 'নাযেরা' },
    { value: 'qaida', label: 'কায়দা' }
  ];

  const subjectOptions = [
    'কুরআন তিলাওয়াত',
    'তাজভীদ',
    'হিফজ',
    'নাযেরা',
    'কায়দা',
    'ফিকাহ',
    'হাদীস',
    'আকাইদ',
    'তাফসীর',
    'সীরাত',
    'আরবি ব্যাকরণ'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchTeachers(),
        fetchCourses(),
        fetchAssignments()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      // Calls /api/teachers
      const response = await api.get('/teachers');
      setTeachers(response.data.data || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'শিক্ষকদের তথ্য লোড করতে ব্যর্থ');
      console.error('Error fetching teachers:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Calls /api/courses
      const response = await api.get('/courses');
      console.log('Courses response:', response.data);
      setCourses(response.data.data || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'কোর্স লোড করতে ব্যর্থ');
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAssignments = async () => {
    try {
      // Calls /api/courses/assignments
      const response = await api.get('/courses/assignments');
      console.log('Assignments response:', response.data);
      setAssignments(response.data.data || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error('Error fetching assignments:', error);
      // Don't show error toast for assignments as they might not exist yet
    }
  };

  const handleCreateCourse = async () => {
    if (!newCourse.courseName.trim() || !newCourse.courseCode.trim() || !newCourse.className) {
      toast.error('সকল প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    try {
      setSubmitting(true);
      // Calls /api/courses
      const response = await api.post('/courses', newCourse);
      console.log('Create course response:', response.data);
      
      if (response.data.success) {
        toast.success('কোর্স সফলভাবে তৈরি হয়েছে');
        setCourses([...courses, response.data.data]);
        setNewCourse({ courseName: '', courseCode: '', className: '', description: '' });
        setShowCreateCourseModal(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'কোর্স তৈরি করতে ব্যর্থ');
      console.error('Error creating course:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignCourse = async () => {
    if (!selectedTeacher || !selectedCourse) {
      toast.error('শিক্ষক এবং কোর্স নির্বাচন করুন');
      return;
    }

    try {
      setSubmitting(true);
      // Calls /api/courses/assignments
      const response = await api.post('/courses/assignments', {
        teacherId: selectedTeacher,
        courseId: selectedCourse
      });
      console.log('Assign course response:', response.data);

      if (response.data.success) {
        toast.success('কোর্স সফলভাবে নির্ধারিত হয়েছে');
        setAssignments([...assignments, response.data.data]);
        
        // Update course with teacher info
        const teacher = teachers.find(t => t._id === selectedTeacher);
        setCourses(courses.map(course => 
          course._id === selectedCourse 
            ? { ...course, teacherId: selectedTeacher, teacherName: teacher?.teacherName }
            : course
        ));
        
        setSelectedTeacher('');
        setSelectedCourse('');
        setShowModal(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'কোর্স নির্ধারণ করতে ব্যর্থ');
      console.error('Error assigning course:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveAssignment = async (assignmentId: string, courseId: string) => {
    if (!confirm('আপনি কি এই নির্ধারণ মুছে ফেলতে চান?')) {
      return;
    }

    try {
      // Calls /api/courses/assignments/:id
      const response = await api.delete(`/courses/assignments/${assignmentId}`);
      console.log('Remove assignment response:', response.data);
      
      if (response.data.success) {
        toast.success('নির্ধারণ সফলভাবে মুছে ফেলা হয়েছে');
        setAssignments(assignments.filter(a => a._id !== assignmentId));
        
        // Update course to remove teacher info
        setCourses(courses.map(course => 
          course._id === courseId 
            ? { ...course, teacherId: undefined, teacherName: undefined }
            : course
        ));
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError.response?.data?.message || 'মুছে ফেলতে ব্যর্থ');
      console.error('Error removing assignment:', error);
    }
  };

  const getClassNameInBengali = (className: string): string => {
    const classMap: { [key: string]: string } = {
      'madani-first': 'মাদানী প্রথম',
      'madani-second': 'মাদানী দ্বিতীয়',
      'hifz-beginner': 'হিফজ - প্রাথমিক',
      'hifz-intermediate': 'হিফজ - মধ্য',
      'hifz-advanced': 'হিফজ - উচ্চ',
      'nazera': 'নাযেরা',
      'qaida': 'কায়দা'
    };
    return classMap[className] || className;
  };

  const getAvailableCourses = () => {
    return courses.filter(course => !course.teacherId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">কোর্স ব্যবস্থাপনা</h2>
            <p className="text-blue-100">শিক্ষকদের কোর্স নির্ধারণ এবং পরিচালনা করুন</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateCourseModal(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              নতুন কোর্স
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center font-medium"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              কোর্স নির্ধারণ
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">মোট কোর্স</p>
              <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">নির্ধারিত কোর্স</p>
              <p className="text-2xl font-bold text-gray-800">{assignments.length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">অনির্ধারিত কোর্স</p>
              <p className="text-2xl font-bold text-gray-800">{getAvailableCourses().length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">মোট শিক্ষক</p>
              <p className="text-2xl font-bold text-gray-800">{teachers.length}</p>
            </div>
            <UserPlus className="w-10 h-10 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Course Assignments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">কোর্স নির্ধারণ তালিকা</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  কোর্সের নাম
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  কোর্স কোড
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ক্লাস
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  শিক্ষক
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  স্ট্যাটাস
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  কার্যক্রম
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>কোন কোর্স পাওয়া যায়নি</p>
                  </td>
                </tr>
              ) : (
                courses.map((course) => {
                  const assignment = assignments.find(a => a.courseId === course._id);
                  return (
                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {course.courseName}
                            </div>
                            {course.description && (
                              <div className="text-xs text-gray-500">{course.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {course.courseCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getClassNameInBengali(course.className)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.teacherName ? (
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-green-600 text-xs font-semibold">
                                {course.teacherName.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {course.teacherName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">অনির্ধারিত</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.teacherId ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            নির্ধারিত
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            অপেক্ষমাণ
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          {assignment && (
                            <button
                              onClick={() => handleRemoveAssignment(assignment._id, course._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="নির্ধারণ মুছুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">কোর্স নির্ধারণ করুন</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  শিক্ষক নির্বাচন করুন *
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">শিক্ষক নির্বাচন করুন</option>
                  {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.teacherName} - {teacher.designation}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  কোর্স নির্বাচন করুন *
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">কোর্স নির্বাচন করুন</option>
                  {getAvailableCourses().map(course => (
                    <option key={course._id} value={course._id}>
                      {course.courseName} ({course.courseCode}) - {getClassNameInBengali(course.className)}
                    </option>
                  ))}
                </select>
                {getAvailableCourses().length === 0 && (
                  <p className="mt-2 text-sm text-yellow-600">
                    সকল কোর্স ইতিমধ্যে নির্ধারিত হয়ে গেছে
                  </p>
                )}
              </div>

              {selectedTeacher && selectedCourse && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>{teachers.find(t => t._id === selectedTeacher)?.teacherName}</strong> কে{' '}
                    <strong>{courses.find(c => c._id === selectedCourse)?.courseName}</strong> কোর্সে নির্ধারণ করা হবে
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={handleAssignCourse}
                disabled={!selectedTeacher || !selectedCourse || submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    নির্ধারণ করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    নির্ধারণ করুন
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">নতুন কোর্স তৈরি করুন</h3>
              <button
                onClick={() => setShowCreateCourseModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  কোর্সের নাম *
                </label>
                <select
                  value={newCourse.courseName}
                  onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">কোর্স নির্বাচন করুন</option>
                  {subjectOptions.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  কোর্স কোড *
                </label>
                <input
                  type="text"
                  value={newCourse.courseCode}
                  onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                  placeholder="যেমন: QRN-101, HDT-201"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ক্লাস *
                </label>
                <select
                  value={newCourse.className}
                  onChange={(e) => setNewCourse({ ...newCourse, className: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">ক্লাস নির্বাচন করুন</option>
                  {classOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বিবরণ
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="কোর্স সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowCreateCourseModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                onClick={handleCreateCourse}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    তৈরি করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    তৈরি করুন
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAssignmentTab;