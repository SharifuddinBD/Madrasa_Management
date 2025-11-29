'use client';
import React, { useState } from 'react';
import { BookOpen, Users, FileText, Calendar, Star, Heart, Sparkles, Moon, LogOut, ArrowLeft, Plus, Edit, Trash2, X, Menu, Home, ClipboardList, GraduationCap, BookMarked, Settings, Bell, Search, User, Award, TrendingUp, Clock } from 'lucide-react';
import GradingView from './GradingView';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function MadrasaTeacherDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [showAlert, setShowAlert] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  
  // Generate demo attendance data for the current month
  const generateDemoAttendanceData = (studentId) => {
    const attendance = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      // Generate realistic attendance pattern (80-95% attendance rate)
      const isPresent = Math.random() > (studentId % 2 === 0 ? 0.15 : 0.08); // Vary by student
      attendance[dateStr] = isPresent;
    }
    return attendance;
  };

  // Sample data with functional attendance
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'আবদুল্লাহ হাসান', 
      class: 'হিফয বিভাগ', 
      avatar: '👨‍🎓',
      attendance: generateDemoAttendanceData(1)
    },
    { 
      id: 2, 
      name: 'ফাতিমা খাতুন', 
      class: 'নাহু-সরফ', 
      avatar: '👩‍🎓',
      attendance: generateDemoAttendanceData(2)
    },
    { 
      id: 3, 
      name: 'মুহাম্মদ আলী', 
      class: 'ফিকাহ', 
      avatar: '👨‍🎓',
      attendance: generateDemoAttendanceData(3)
    },
    { 
      id: 4, 
      name: 'আয়েশা বেগম', 
      class: 'কুরআন তিলাওয়াত', 
      avatar: '👩‍🎓',
      attendance: generateDemoAttendanceData(4)
    },
    { 
      id: 5, 
      name: 'ইউসুফ আহমেদ', 
      class: 'হাদিস', 
      avatar: '👨‍🎓',
      attendance: generateDemoAttendanceData(5)
    },
    { 
      id: 6, 
      name: 'খাদিজা রহমান', 
      class: 'তাজবীদ', 
      avatar: '👩‍🎓',
      attendance: generateDemoAttendanceData(6)
    },
    { 
      id: 7, 
      name: 'উমর ফারুক', 
      class: 'আকাইদ', 
      avatar: '👨‍🎓',
      attendance: generateDemoAttendanceData(7)
    },
    { 
      id: 8, 
      name: 'জয়নাব আক্তার', 
      class: 'সীরাত', 
      avatar: '👩‍🎓',
      attendance: generateDemoAttendanceData(8)
    },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, student: 'আবদুল্লাহ হাসান', subject: 'হিফয', score: 95 },
    { id: 2, student: 'ফাতিমা খাতুন', subject: 'নাহু-সরফ', score: 88 },
    { id: 3, student: 'মুহাম্মদ আলী', subject: 'ফিকাহ', score: 92 },
    { id: 4, student: 'আয়েশা বেগম', subject: 'কুরআন তিলাওয়াত', score: 97 },
    { id: 5, student: 'ইউসুফ আহমেদ', subject: 'হাদিস', score: 85 },
    { id: 6, student: 'খাদিজা রহমান', subject: 'তাজবীদ', score: 93 },
  ]);

  const [homework, setHomework] = useState([
    { id: 1, subject: 'কুরআন তিলাওয়াত', assignment: 'সূরা বাকারা ১-১০ আয়াত মুখস্থ', dueDate: '২০২৫-০৮-০৫' },
    { id: 2, subject: 'ফিকাহ', assignment: 'ওযুর মাসায়েল অধ্যয়ন', dueDate: '২০২৫-০৮-০৬' },
    { id: 3, subject: 'হাদিস', assignment: 'সহীহ বুখারীর প্রথম ১০টি হাদিস', dueDate: '২০২৫-০৮-০৭' },
  ]);

  const [newHomework, setNewHomework] = useState({ subject: '', assignment: '', dueDate: '' });
  const [editingGrade, setEditingGrade] = useState(null);

  // Profile data
  const teacherProfile = {
    name: 'মাওলানা আবদুর রহমান',
    designation: 'প্রধান শিক্ষক',
    experience: '১৫ বছর',
    specialization: 'তাফসীর ও হাদিস',
    education: 'দাওরায়ে হাদিস, জামিয়া ইসলামিয়া',
    email: 'rahman@madrasa.edu',
    phone: '+৮৮০১৭১২৩৪৫৬১৮',
    joinedDate: '২০১০',
    totalStudents: students.length,
    achievements: ['শ্রেষ্ঠ শিক্ষক পুরস্কার ২০২৩', 'কুরআন তিলাওয়াত প্রতিযোগিতা বিচারক'],
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Home, color: 'text-emerald-600' },
    { id: 'attendance', label: 'হাজিরা', icon: ClipboardList, color: 'text-blue-600' },
    { id: 'grading', label: 'পরীক্ষার নম্বর', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'homework', label: 'গৃহকর্ম', icon: BookMarked, color: 'text-orange-600' },
    { id: 'settings', label: 'সেটিংস', icon: Settings, color: 'text-gray-600' },
  ];
   const router = useRouter();
   const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userAuth');
      toast.success('Logged out successfully');
      router.push('/');
    }
  };
  const handleMoonClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setEasterEggTriggered(true);
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 6000);
    }
  };

  const toggleAttendance = (studentId, date = null) => {
    const targetDate = date || new Date().toISOString().slice(0, 10);
    
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            attendance: {
              ...student.attendance,
              [targetDate]: !student.attendance[targetDate]
            }
          }
        : student
    ));
    setShowAlert('হাজিরা আপডেট হয়েছে!');
    setTimeout(() => setShowAlert(''), 2000);
  };

  const updateGrade = (gradeId, newScore) => {
    if (newScore >= 0 && newScore <= 100) {
      setGrades(prev => prev.map(grade => 
        grade.id === gradeId 
          ? { ...grade, score: newScore }
          : grade
      ));
      setEditingGrade(null);
      setShowAlert('নম্বর আপডেট হয়েছে!');
      setTimeout(() => setShowAlert(''), 2000);
    }
  };

  const addHomework = () => {
    if (newHomework.subject && newHomework.assignment && newHomework.dueDate) {
      setHomework(prev => [...prev, {
        id: Date.now(),
        ...newHomework
      }]);
      setNewHomework({ subject: '', assignment: '', dueDate: '' });
      setShowAlert('নতুন গৃহকর্ম যোগ করা হয়েছে!');
      setTimeout(() => setShowAlert(''), 2000);
    }
  };

  const deleteHomework = (homeworkId) => {
    setHomework(prev => prev.filter(hw => hw.id !== homeworkId));
    setShowAlert('গৃহকর্ম মুছে ফেলা হয়েছে!');
    setTimeout(() => setShowAlert(''), 2000);
  };

  // Calculate attendance statistics
  const calculateAttendanceStats = () => {
    const today = new Date().toISOString().slice(0, 10);
    const presentToday = students.filter(student => student.attendance[today]).length;
    const totalStudents = students.length;
    const attendancePercentage = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;
    
    return {
      presentToday,
      totalStudents,
      attendancePercentage,
      absentToday: totalStudents - presentToday
    };
  };

  const stats = [
    { label: 'মোট ছাত্র-ছাত্রী', value: students.length, icon: Users, color: 'bg-gradient-to-r from-emerald-500 to-emerald-600', trend: '+৩' },
    { label: 'আজকের উপস্থিতি', value: `${calculateAttendanceStats().presentToday}/${calculateAttendanceStats().totalStudents}`, icon: ClipboardList, color: 'bg-gradient-to-r from-blue-500 to-blue-600', trend: `${calculateAttendanceStats().attendancePercentage}%` },
    { label: 'সম্পন্ন পরীক্ষা', value: grades.length, icon: GraduationCap, color: 'bg-gradient-to-r from-purple-500 to-purple-600', trend: '+২' },
    { label: 'গৃহকর্ম', value: homework.length, icon: BookMarked, color: 'bg-gradient-to-r from-orange-500 to-orange-600', trend: 'সক্রিয়' },
  ];

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">লগ আউট সম্পন্ন</h2>
            <p className="text-gray-600 mb-6">বারাকাল্লাহু ফীকুম! আল্লাহ হাফেজ!</p>
          </div>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-medium"
          >
            আবার লগ ইন করুন
          </button>
        </div>
      </div>
    );
  }

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{teacherProfile.name}</h2>
                <p className="text-emerald-100">{teacherProfile.designation}</p>
                <p className="text-emerald-200 text-sm">{teacherProfile.specialization}</p>
              </div>
            </div>
            <button
              onClick={() => setShowProfile(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">যোগাযোগের তথ্য</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">📧 {teacherProfile.email}</p>
                  <p className="text-gray-600">📞 {teacherProfile.phone}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">অভিজ্ঞতা</h3>
                <p className="text-2xl font-bold text-emerald-600">{teacherProfile.experience}</p>
                <p className="text-sm text-gray-600">শিক্ষকতার অভিজ্ঞতা</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">শিক্ষাগত যোগ্যতা</h3>
                <p className="text-gray-700 text-sm">{teacherProfile.education}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">মোট ছাত্র-ছাত্রী</h3>
                <p className="text-2xl font-bold text-blue-600">{teacherProfile.totalStudents}</p>
                <p className="text-sm text-gray-600">বর্তমান সেশনে</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              পুরস্কার ও সম্মাননা
            </h3>
            <div className="space-y-2">
              {teacherProfile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-2xl z-30 transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-gray-800">মাদ্রাসা ড্যাশবোর্ড</h2>
              <p className="text-xs text-gray-500">শিক্ষক প্যানেল</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-6 py-4 hover:bg-gray-50 transition-colors ${
              currentView === item.id ? 'bg-emerald-50 border-r-4 border-emerald-500' : ''
            }`}
          >
            <item.icon className={`w-6 h-6 ${currentView === item.id ? 'text-emerald-600' : item.color}`} />
            {sidebarOpen && (
              <span className={`font-medium ${currentView === item.id ? 'text-emerald-600' : 'text-gray-700'}`}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="font-medium">লগ আউট</span>}
        </button>
      </div>
    </div>
  );

  // Main Content based on current view
  const renderMainContent = () => {
    if (currentView === 'attendance') {
      const today = new Date().toISOString().slice(0, 10);
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      const attendanceStats = calculateAttendanceStats();

      return (
        <div className="space-y-6">
          {/* Attendance Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-green-100 text-sm">আজ উপস্থিত</p>
                  <p className="text-2xl font-bold">{attendanceStats.presentToday}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-2xl text-white">
              <div className="flex items-center space-x-3">
                <X className="w-8 h-8" />
                <div>
                  <p className="text-red-100 text-sm">আজ অনুপস্থিত</p>
                  <p className="text-2xl font-bold">{attendanceStats.absentToday}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8" />
                <div>
                  <p className="text-blue-100 text-sm">উপস্থিতির হার</p>
                  <p className="text-2xl font-bold">{attendanceStats.attendancePercentage}%</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8" />
                <div>
                  <p className="text-purple-100 text-sm">মোট ছাত্র-ছাত্রী</p>
                  <p className="text-2xl font-bold">{attendanceStats.totalStudents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Attendance Taking */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ClipboardList className="w-7 h-7 text-blue-600 mr-3" />
              আজকের হাজিরা নিন ({new Date().toLocaleDateString('bn-BD')})
            </h2>

            <div className="grid gap-4">
              {students.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                      {student.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.class}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAttendance(student.id, today)}
                    className={`px-6 py-2 rounded-xl font-medium transition-all ${
                      student.attendance[today]
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {student.attendance[today] ? 'উপস্থিত ✓' : 'অনুপস্থিত ✗'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Attendance Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📅 মাসিক হাজিরার তালিকা - {new Date().toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' })}
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left font-semibold">নাম</th>
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = (i + 1).toString().padStart(2, '0');
                      const isToday = parseInt(day) === new Date().getDate();
                      return (
                        <th 
                          key={day} 
                          className={`border p-2 text-center font-semibold ${
                            isToday ? 'bg-blue-100 text-blue-800' : ''
                          }`}
                        >
                          {day}
                        </th>
                      );
                    })}
                    <th className="border p-3 text-center font-semibold bg-green-50">মোট উপস্থিত</th>
                    <th className="border p-3 text-center font-semibold bg-blue-50">উপস্থিতির %</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    let totalPresent = 0;
                    let totalDays = 0;
                    
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="border p-3 whitespace-nowrap font-medium">
                          <div className="flex items-center space-x-2">
                            <span>{student.avatar}</span>
                            <span>{student.name}</span>
                          </div>
                        </td>
                        {[...Array(daysInMonth)].map((_, i) => {
                          const day = (i + 1).toString().padStart(2, '0');
                          const month = String(currentMonth).padStart(2, '0');
                          const dateKey = `${currentYear}-${month}-${day}`;
                          const isPresent = student.attendance[dateKey];
                          const isToday = parseInt(day) === new Date().getDate();
                          const isFutureDate = new Date(dateKey) > new Date();
                          
                          if (!isFutureDate) {
                            totalDays++;
                            if (isPresent) totalPresent++;
                          }

                          return (
                            <td
                              key={dateKey}
                              className={`border text-center p-2 cursor-pointer transition-colors ${
                                isFutureDate 
                                  ? 'bg-gray-100 text-gray-400' 
                                  : isPresent 
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                              } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
                              onClick={() => !isFutureDate && toggleAttendance(student.id, dateKey)}
                              title={isFutureDate ? 'ভবিষ্যতের তারিখ' : `${isPresent ? 'উপস্থিত' : 'অনুপস্থিত'} - ক্লিক করে পরিবর্তন করুন`}
                            >
                              {isFutureDate ? '-' : (isPresent ? '✓' : '✗')}
                            </td>
                          );
                        })}
                        <td className="border p-3 text-center font-bold text-green-700 bg-green-50">
                          {totalPresent}
                        </td>
                        <td className="border p-3 text-center font-bold text-blue-700 bg-blue-50">
                          {totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

if (currentView === 'grading') {
  return (
    <GradingView
      grades={grades}           // your grades state or prop
      updateGrade={updateGrade} // your updateGrade handler
    />
  );
}



    if (currentView === 'homework') {
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
                onClick={addHomework}
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
    }

    if (currentView === 'settings') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Settings className="w-7 h-7 text-gray-600 mr-3" />
              সেটিংস
            </h2>
            
            <div className="grid gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">সাধারণ সেটিংস</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">নোটিফিকেশন</span>
                    <button className="w-12 h-6 bg-emerald-500 rounded-full p-1 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">ডার্ক মোড</span>
                    <button className="w-12 h-6 bg-gray-300 rounded-full p-1 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">ভাষা ও অঞ্চল</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ভাষা</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                      <option>বাংলা</option>
                      <option>English</option>
                      <option>العربية</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Dashboard View
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentView === 'dashboard' && 'ড্যাশবোর্ড'}
                  {currentView === 'attendance' && 'হাজিরা'}
                  {currentView === 'grading' && 'পরীক্ষার নম্বর'}
                  {currentView === 'homework' && 'গৃহকর্ম'}
                  {currentView === 'settings' && 'সেটিংস'}
                </h1>
                <p className="text-gray-600 text-sm">بسم الله الرحمن الرحيم</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="খোঁজ করুন..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">3</span>
                </div>
              </button>
              
              <button
                onClick={handleMoonClick}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="বিশেষ কিছু আছে এখানে... 🌙"
              >
                <Moon className="w-6 h-6 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{teacherProfile.name}</p>
                  <p className="text-xs text-gray-600">{teacherProfile.designation}</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && <ProfileModal />}

      {/* Alert Message */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-40 animate-pulse">
          <p className="text-sm font-medium">{showAlert}</p>
        </div>
      )}

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
            <div className="mb-6">
              <div className="text-6xl mb-4">🌙</div>
              <Sparkles className="w-16 h-16 text-emerald-500 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 বারাকাল্লাহু ফীক! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              আল্লাহর রহমতে আপনি আমাদের গোপন বার্তা আবিষ্কার করেছেন! 
            </p>
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-xl">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-sm text-gray-700 mb-3">
                "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি যে নিজে কুরআন শিক্ষা করে এবং অন্যকে শিক্ষা দেয়।" 
              </p>
              <p className="text-xs text-gray-500 italic">- বুখারী শরীফ</p>
            </div>
            <div className="mt-6">
              <p className="text-sm text-emerald-700 font-semibold">
                জাযাকাল্লাহু খাইরান উস্তাদ! 💚
              </p>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      )}

      {/* Hint for Easter Egg */}
      {clickCount > 0 && clickCount < 5 && !easterEggTriggered && (
        <div className="fixed bottom-4 right-4 bg-emerald-100 text-emerald-800 px-4 py-3 rounded-xl shadow-lg z-30">
          <p className="text-sm">চাঁদে আরও {5 - clickCount} বার ক্লিক করুন... 🌙</p>
        </div>
      )}
    </div>
  );
}
 
export default MadrasaTeacherDashboard;