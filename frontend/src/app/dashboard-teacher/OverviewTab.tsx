// dashboard-teacher/OverviewTab.tsx
'use client';
import React from 'react';
import { Sparkles, Clock, Star, BookOpen, ClipboardList, GraduationCap, BookMarked, TrendingUp, Users } from 'lucide-react';
import { Student, Grade, Homework, ViewType } from './types';

interface OverviewTabProps {
  students: Student[];
  grades: Grade[];
  homework: Homework[];
  setCurrentView: (view: ViewType) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ students, grades, homework, setCurrentView }) => {
  const calculateAttendanceStats = () => {
    const today = new Date().toISOString().slice(0, 10);
    const presentToday = students.filter(student => student.attendance[today]).length;
    const totalStudents = students.length;
    const attendancePercentage = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;
    
    return { presentToday, totalStudents, attendancePercentage };
  };

  const stats = [
    { label: 'মোট ছাত্র-ছাত্রী', value: students.length, icon: Users, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600', trend: '+৩' },
    { label: 'আজকের উপস্থিতি', value: `${calculateAttendanceStats().presentToday}/${calculateAttendanceStats().totalStudents}`, icon: ClipboardList, color: 'bg-gradient-to-r from-blue-500 to-blue-600', trend: `${calculateAttendanceStats().attendancePercentage}%` },
    { label: 'সম্পন্ন পরীক্ষা', value: grades.length, icon: GraduationCap, color: 'bg-gradient-to-r from-purple-500 to-purple-600', trend: '+২' },
    { label: 'গৃহকর্ম', value: homework.length, icon: BookMarked, color: 'bg-gradient-to-r from-orange-500 to-orange-600', trend: 'সক্রিয়' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 text-sm font-medium">{stat.trend}</span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 text-emerald-600 mr-2" />
            দ্রুত কাজ
          </h3>
          <div className="space-y-4">
            <button 
              onClick={() => setCurrentView('attendance')}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              <ClipboardList className="w-5 h-5" />
              <span>হাজিরা নিন</span>
            </button>
            <button 
              onClick={() => setCurrentView('grading')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              <GraduationCap className="w-5 h-5" />
              <span>পরীক্ষার নম্বর দিন</span>
            </button>
            <button 
              onClick={() => setCurrentView('homework')}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              <BookMarked className="w-5 h-5" />
              <span>গৃহকর্ম দিন</span>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            সাম্প্রতিক কার্যকলাপ
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl border-yellow-200 bg-yellow-50">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏆</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">হিফয বিভাগের কুরআন তিলাওয়াত প্রতিযোগিতা</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    ১ ঘণ্টা আগে
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl border-blue-200 bg-blue-50">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">নাহু-সরফ পরীক্ষার ফলাফল প্রকাশ</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    ৩ ঘণ্টা আগে
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4 py-3 rounded-r-xl border-green-200 bg-green-50">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📚</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 font-medium">ফিকাহ ক্লাসের আলোচনা সম্পন্ন</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    ৫ ঘণ্টা আগে
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-600 mr-2" />
            এই সপ্তাহের লক্ষ্য
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-gray-700 font-medium">সব দরস সম্পন্ন</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">হিফয পরীক্ষা নেওয়া</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">অভিভাবক সাক্ষাৎ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Learning Subjects */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 text-emerald-600 mr-2" />
          আজকের বিষয়সমূহ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl text-center hover:from-emerald-100 hover:to-emerald-200 cursor-pointer transition-all duration-300 border border-emerald-200">
            <div className="text-4xl mb-3">📖</div>
            <p className="text-sm font-semibold text-emerald-800">কুরআন তিলাওয়াত</p>
            <p className="text-xs text-emerald-600 mt-1">৩টি ক্লাস</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center hover:from-blue-100 hover:to-blue-200 cursor-pointer transition-all duration-300 border border-blue-200">
            <div className="text-4xl mb-3">🕌</div>
            <p className="text-sm font-semibold text-blue-800">ফিকাহ</p>
            <p className="text-xs text-blue-600 mt-1">২টি ক্লাস</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center hover:from-purple-100 hover:to-purple-200 cursor-pointer transition-all duration-300 border border-purple-200">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-sm font-semibold text-purple-800">আকাইদ</p>
            <p className="text-xs text-purple-600 mt-1">১টি ক্লাস</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center hover:from-orange-100 hover:to-orange-200 cursor-pointer transition-all duration-300 border border-orange-200">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-sm font-semibold text-orange-800">আরবি ব্যাকরণ</p>
            <p className="text-xs text-orange-600 mt-1">২টি ক্লাস</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;