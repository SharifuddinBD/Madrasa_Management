// dashboard-teacher/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
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
import { Student, Grade, ViewType, TeacherProfile } from './types';

function MadrasaTeacherDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [easterEggTriggered, setEasterEggTriggered] = useState(false);
  const [showAlert, setShowAlert] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Define available subjects for Islamic education
  const subjects = [
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

  // Teacher information (in production, this would come from auth/session)
  const teacherProfile: TeacherProfile = {
    id: '507f1f77bcf86cd799439011', // Example MongoDB ObjectId
    name: 'মাওলানা আবদুর রহমান',
    designation: 'প্রধান শিক্ষক',
    experience: '১৫ বছর',
    specialization: 'তাফসীর ও হাদীস',
    education: 'দাওরায়ে হাদীস, জামিয়া ইসলামিয়া',
    email: 'rahman@madrasa.edu',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    joinedDate: '২০১০',
    totalStudents: 0,
    achievements: ['শ্রেষ্ঠ শিক্ষক পুরস্কার ২০২৩', 'কুরআন তিলাওয়াত প্রতিযোগিতা বিচারক'],
  };

  // Fetch students from database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/api/students`);
        
        if (!response.ok) {
          throw new Error('শিক্ষার্থীদের তথ্য লোড করতে ব্যর্থ');
        }

        const data = await response.json();
        
        if (data.success) {
          // Transform database students to match Student interface
          const transformedStudents = data.data.map((student: any) => ({
            id: student._id,
            name: student.fullName,
            class: getClassNameInBengali(student.className),
            avatar: getAvatarForStudent(student.fullName),
            attendance: generateDemoAttendanceData(student._id)
          }));
          
          setStudents(transformedStudents);
          
          // Update teacher profile with total students
          teacherProfile.totalStudents = transformedStudents.length;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Helper function to convert class names to Bengali
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

  // Helper function to get avatar emoji based on name
  const getAvatarForStudent = (name: string): string => {
    const avatars = ['👨‍🎓', '👩‍🎓'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  };

  // Generate demo attendance data (in real app, this would come from DB)
  const generateDemoAttendanceData = (studentId: any) => {
    const attendance: { [date: string]: boolean } = {};
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const idHash = typeof studentId === 'string' 
      ? studentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : studentId;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPresent = Math.random() > (idHash % 2 === 0 ? 0.15 : 0.08);
      attendance[dateStr] = isPresent;
    }
    return attendance;
  };

  const [grades, setGrades] = useState<Grade[]>([]);

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

  const addGrade = (studentId: string, subject: string, score: number) => {
    const student = students.find(s => s.id.toString() === studentId);
    if (student && score >= 0 && score <= 100) {
      const newGrade: Grade = {
        id: Date.now(),
        student: student.name,
        subject: subject,
        score: score
      };
      setGrades(prev => [...prev, newGrade]);
      setShowAlert('নতুন নম্বর যোগ করা হয়েছে!');
      setTimeout(() => setShowAlert(''), 2000);
    }
  };

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">লোড হচ্ছে...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'attendance':
        return <AttendanceTab students={students} toggleAttendance={toggleAttendance} />;
      case 'grading':
        return <GradingView students={students} subjects={subjects} />;
      case 'homework':
        return (
          <HomeworkTab 
            teacherId={teacherProfile.id}
            teacherName={teacherProfile.name}
            className={undefined} // or pass specific class if filtering by class
          />
        );
      case 'notices':
        return <NoticesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return (
          <OverviewTab 
            students={students} 
            grades={grades} 
            homework={[]} // Homework is now managed separately in HomeworkTab
            setCurrentView={setCurrentView} 
          />
        );
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
          <p className="text-sm">চাঁদে আরো {5 - clickCount} বার ক্লিক করুন... 🌙</p>
        </div>
      )}
    </div>
  );
}

export default MadrasaTeacherDashboard;