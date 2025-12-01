// dashboard-teacher/page.tsx
'use client';
import React, { useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import AttendanceTab from './AttendanceTab';
import GradingView from './GradingView';
import HomeworkTab from './HomeworkTab';
import SettingsTab from './SettingsTab';
import OverviewTab from './OverviewTab';
import ProfileModal from './ProfileModal';
import NoticesTab from './NoticesTab';
import { Student, Grade, Homework, ViewType, TeacherProfile } from './types';

function MadrasaTeacherDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [showAlert, setShowAlert] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  // Generate demo attendance data
  const generateDemoAttendanceData = (studentId: number) => {
    const attendance: { [date: string]: boolean } = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPresent = Math.random() > (studentId % 2 === 0 ? 0.15 : 0.08);
      attendance[dateStr] = isPresent;
    }
    return attendance;
  };

  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'আবদুল্লাহ হাসান', class: 'হিফয বিভাগ', avatar: '👨‍🎓', attendance: generateDemoAttendanceData(1) },
    { id: 2, name: 'ফাতিমা খাতুন', class: 'নাহু-সরফ', avatar: '👩‍🎓', attendance: generateDemoAttendanceData(2) },
    { id: 3, name: 'মুহাম্মদ আলী', class: 'ফিকাহ', avatar: '👨‍🎓', attendance: generateDemoAttendanceData(3) },
    { id: 4, name: 'আয়েশা বেগম', class: 'কুরআন তিলাওয়াত', avatar: '👩‍🎓', attendance: generateDemoAttendanceData(4) },
    { id: 5, name: 'ইউসুফ আহমেদ', class: 'হাদিস', avatar: '👨‍🎓', attendance: generateDemoAttendanceData(5) },
    { id: 6, name: 'খাদিজা রহমান', class: 'তাজবীদ', avatar: '👩‍🎓', attendance: generateDemoAttendanceData(6) },
    { id: 7, name: 'উমর ফারুক', class: 'আকাইদ', avatar: '👨‍🎓', attendance: generateDemoAttendanceData(7) },
    { id: 8, name: 'জয়নাব আক্তার', class: 'সীরাত', avatar: '👩‍🎓', attendance: generateDemoAttendanceData(8) },
  ]);

  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, student: 'আবদুল্লাহ হাসান', subject: 'হিফয', score: 95 },
    { id: 2, student: 'ফাতিমা খাতুন', subject: 'নাহু-সরফ', score: 88 },
    { id: 3, student: 'মুহাম্মদ আলী', subject: 'ফিকাহ', score: 92 },
    { id: 4, student: 'আয়েশা বেগম', subject: 'কুরআন তিলাওয়াত', score: 97 },
    { id: 5, student: 'ইউসুফ আহমেদ', subject: 'হাদিস', score: 85 },
    { id: 6, student: 'খাদিজা রহমান', subject: 'তাজবীদ', score: 93 },
  ]);

  const [homework, setHomework] = useState<Homework[]>([
    { id: 1, subject: 'কুরআন তিলাওয়াত', assignment: 'সূরা বাকারা ১-১০ আয়াত মুখস্থ', dueDate: '২০২৫-০৮-০৫' },
    { id: 2, subject: 'ফিকাহ', assignment: 'ওযুর মাসায়েল অধ্যয়ন', dueDate: '২০২৫-০৮-০৬' },
    { id: 3, subject: 'হাদিস', assignment: 'সহীহ বুখারীর প্রথম ১০টি হাদিস', dueDate: '২০২৫-০৮-০৭' },
  ]);

  const teacherProfile: TeacherProfile = {
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

  const handleMoonClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setEasterEggTriggered(true);
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 6000);
    }
  };

  const toggleAttendance = (studentId: number, date: string | null = null) => {
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

  const updateGrade = (gradeId: number, newScore: number) => {
    if (newScore >= 0 && newScore <= 100) {
      setGrades(prev => prev.map(grade => 
        grade.id === gradeId ? { ...grade, score: newScore } : grade
      ));
      setShowAlert('নম্বর আপডেট হয়েছে!');
      setTimeout(() => setShowAlert(''), 2000);
    }
  };

  const addHomework = (hw: Omit<Homework, 'id'>) => {
    setHomework(prev => [...prev, { id: Date.now(), ...hw }]);
    setShowAlert('নতুন গৃহকর্ম যোগ করা হয়েছে!');
    setTimeout(() => setShowAlert(''), 2000);
  };

  const deleteHomework = (homeworkId: number) => {
    setHomework(prev => prev.filter(hw => hw.id !== homeworkId));
    setShowAlert('গৃহকর্ম মুছে ফেলা হয়েছে!');
    setTimeout(() => setShowAlert(''), 2000);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'attendance':
        return <AttendanceTab students={students} toggleAttendance={toggleAttendance} />;
      case 'grading':
        return <GradingView grades={grades} updateGrade={updateGrade} />;
      case 'homework':
        return <HomeworkTab homework={homework} addHomework={addHomework} deleteHomework={deleteHomework} />;
      case 'notices':
        return <NoticesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab students={students} grades={grades} homework={homework} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} sidebarOpen={sidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header
          currentView={currentView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowProfile={setShowProfile}
          handleMoonClick={handleMoonClick}
          teacherProfile={teacherProfile}
        />

        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>

      {showProfile && <ProfileModal teacherProfile={teacherProfile} onClose={() => setShowProfile(false)} />}

      {showAlert && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-40 animate-pulse">
          <p className="text-sm font-medium">{showAlert}</p>
        </div>
      )}

      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-bounce">
            <div className="mb-6">
              <div className="text-6xl mb-4">🌙</div>
              <Sparkles className="w-16 h-16 text-emerald-500 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">🎉 বারাকাল্লাহু ফীক! 🎉</h3>
            <p className="text-gray-600 mb-6">আল্লাহর রহমতে আপনি আমাদের গোপন বার্তা আবিষ্কার করেছেন!</p>
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-6 rounded-xl">
              <Heart className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-sm text-gray-700 mb-3">
                "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি যে নিজে কুরআন শিক্ষা করে এবং অন্যকে শিক্ষা দেয়।"
              </p>
              <p className="text-xs text-gray-500 italic">- বুখারী শরীফ</p>
            </div>
            <p className="text-sm text-emerald-700 font-semibold mt-6">জাযাকাল্লাহু খাইরান উস্তাদ! 💚</p>
            <div className="mt-4 flex justify-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      )}

      {clickCount > 0 && clickCount < 5 && !easterEggTriggered && (
        <div className="fixed bottom-4 right-4 bg-emerald-100 text-emerald-800 px-4 py-3 rounded-xl shadow-lg z-30">
          <p className="text-sm">চাঁদে আরও {5 - clickCount} বার ক্লিক করুন... 🌙</p>
        </div>
      )}
    </div>
  );
}

export default MadrasaTeacherDashboard;