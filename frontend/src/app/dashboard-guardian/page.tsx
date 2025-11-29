'use client';
import React, { useState, useEffect } from 'react';
import { 
  User, Bell, BookOpen, Calendar, TrendingUp, Shield, LogOut, Menu, X, 
  Home, Star, Award, Clock, Heart, Users, FileText, Phone
} from 'lucide-react';

function MadrasaGuardianDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userAuth');
      localStorage.removeItem('authToken');
      sessionStorage.clear();
    }
    
    // Navigate to home page
    window.location.href = '/';
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Mock data for madrasa student
  const studentData = {
    name: "মুহাম্মদ আবদুল্লাহ আল আমিন",
    class: "হিফজুল কুরআন - ৩য় বর্ষ",
    section: "আলিফ",
    roll: "১৫",
    hifzProgress: "১৫ পারা সম্পন্ন",
    arabicLevel: "মধ্যম",
    photo: "/api/placeholder/100/100"
  };

  const notifications = [
    { id: 1, message: "আগামীকাল থেকে পরীক্ষা শুরু", time: "৫ মিনিট আগে আগে", type: "exam", priority: "high" },
    { id: 2, message: "আগামীকাল সূরা আল-বাকারাহ তিলাওত পরীক্ষা", time: "২ ঘন্টা আগে", type: "exam", priority: "high" },
    { id: 3, message: "জুমার নামাজের পর অভিভাবক সভা", time: "১ দিন আগে", type: "meeting", priority: "medium" },
    { id: 4, message: "রমজান মাসের বিশেষ ক্লাস রুটিন প্রকাশিত", time: "২ দিন আগে", type: "announcement", priority: "low" },
    { id: 5, message: "আপনার সন্তানের তাজবীদ উন্নতি অসাধারণ", time: "৩ দিন আগে", type: "achievement", priority: "medium" }
  ];

  const islamicSubjects = [
    { subject: "কুরআন তিলাওত", marks: 95, total: 100, grade: "ممتاز", arabicGrade: "Mumtaz" },
    { subject: "তাজবীদ", marks: 88, total: 100, grade: "جيد جداً", arabicGrade: "Jayyid Jiddan" },
    { subject: "আরবি ব্যাকরণ", marks: 82, total: 100, grade: "جيد", arabicGrade: "Jayyid" },
    { subject: "হাদিস শরীফ", marks: 90, total: 100, grade: "ممتاز", arabicGrade: "Mumtaz" },
    { subject: "ফিকহ", marks: 85, total: 100, grade: "جيد جداً", arabicGrade: "Jayyid Jiddan" },
    { subject: "আকীদা", marks: 92, total: 100, grade: "ممتاز", arabicGrade: "Mumtaz" }
  ];

  const prayerTimes = {
    fajr: "৫:০৫",
    dhuhr: "১২:১৫",
    asr: "৪:৩০",
    maghrib: "৬:১৫",
    isha: "৭:৪৫"
  };

  const attendanceData = {
    totalDays: 180,
    presentDays: 175,
    absentDays: 5,
    percentage: 97.2,
    prayerAttendance: 94
  };

  const hifzProgress = {
    totalParas: 30,
    completedParas: 15,
    currentSurah: "সূরা আল-কাহফ",
    nextTest: "সূরা মারইয়াম",
    percentage: 50
  };

  const sidebarItems = [
    { id: 'overview', label: 'সারসংক্ষেপ', icon: BookOpen },
    { id: 'hifz', label: 'হিফজ অগ্রগতি', icon: Star },
    { id: 'progress', label: 'একাডেমিক রিপোর্ট', icon: TrendingUp },
    { id: 'attendance', label: 'উপস্থিতি', icon: Calendar },
    { id: 'prayer', label: 'নামাজের সময়সূচী', icon: Home },
    { id: 'notifications', label: 'বিজ্ঞপ্তি', icon: Bell },
    { id: 'contact', label: 'যোগাযোগ', icon: Phone }
  ];

  const IslamicHeader = () => (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Home className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
            <p className="text-green-100 text-sm">আল্লাহর নামে শুরু করছি যিনি পরম করুণাময়, অসীম দয়ালু</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{currentTime.toLocaleTimeString('bn-BD')}</div>
          <div className="text-sm text-green-100">
            {new Date().toLocaleDateString('bn-BD', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <IslamicHeader />
      
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{studentData.name}</h2>
            <p className="text-gray-600 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-green-600" />
              {studentData.class} - শাখা: {studentData.section}
            </p>
            <p className="text-gray-600">রোল নং: {studentData.roll}</p>
            <p className="text-green-600 font-medium">হিফজ অগ্রগতি: {studentData.hifzProgress}</p>
          </div>
          <div className="text-right">
            <div className="bg-green-50 p-3 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-sm text-gray-600">আরবি দক্ষতা</p>
              <p className="font-bold text-green-700">{studentData.arabicLevel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">হিফজ অগ্রগতি</p>
              <p className="text-3xl font-bold">{hifzProgress.percentage}%</p>
              <p className="text-sm text-green-200">{hifzProgress.completedParas}/৩০ পারা</p>
            </div>
            <Star className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">সামগ্রিক গড়</p>
              <p className="text-3xl font-bold">৮৮.৭%</p>
              <p className="text-sm text-blue-200">ممتاز (চমৎকার)</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">উপস্থিতি</p>
              <p className="text-3xl font-bold">{attendanceData.percentage}%</p>
              <p className="text-sm text-purple-200">নামাজ: {attendanceData.prayerAttendance}%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">নতুন বিজ্ঞপ্তি</p>
              <p className="text-3xl font-bold">{notifications.length}</p>
              <p className="text-sm text-orange-200">গুরুত্বপূর্ণ: ২টি</p>
            </div>
            <Bell className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Current Surah Learning */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          বর্তমান অধ্যয়নরত সূরা
        </h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-green-800">{hifzProgress.currentSurah}</h4>
              <p className="text-green-600">পরবর্তী পরীক্ষা: {hifzProgress.nextTest}</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-700">{hifzProgress.completedParas}</span>
              </div>
              <p className="text-sm text-green-600 mt-1">পারা সম্পন্ন</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHifzProgress = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Star className="w-6 h-6 mr-2 text-yellow-500" />
          হিফজুল কুরআন অগ্রগতি
        </h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">সামগ্রিক অগ্রগতি</span>
            <span className="text-2xl font-bold text-green-600">{hifzProgress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${hifzProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {hifzProgress.completedParas} পারা সম্পন্ন, বাকি {hifzProgress.totalParas - hifzProgress.completedParas} পারা
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{hifzProgress.completedParas}</div>
            <div className="text-sm text-gray-600">সম্পন্ন পারা</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">৯৫%</div>
            <div className="text-sm text-gray-600">তিলাওতের মান</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">৮৮%</div>
            <div className="text-sm text-gray-600">তাজবীদ দক্ষতা</div>
          </div>
        </div>

        {/* Para-wise Progress */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">পারাভিত্তিক অগ্রগতি</h4>
          {Array.from({length: 15}, (_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <span className="font-medium">পারা {i + 1}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-medium">সম্পন্ন</span>
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
          ))}
          {Array.from({length: 15}, (_, i) => (
            <div key={i + 15} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 16}
                </div>
                <span className="font-medium text-gray-600">পারা {i + 16}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">অপেক্ষারত</span>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          ইসলামী শিক্ষা অগ্রগতি রিপোর্ট
        </h3>
        <div className="space-y-4">
          {islamicSubjects.map((subject, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{subject.subject}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold bg-green-100 text-green-800 px-2 py-1 rounded">
                    {subject.grade}
                  </span>
                  <span className="text-xs text-gray-600">
                    ({subject.arabicGrade})
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(subject.marks / subject.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {subject.marks}/{subject.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrayerTimes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Home className="w-6 h-6 mr-2 text-green-600" />
          নামাজের সময়সূচী
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <div key={prayer} className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-lg font-bold text-green-800 capitalize">
                {prayer === 'fajr' ? 'ফজর' :
                 prayer === 'dhuhr' ? 'জোহর' :
                 prayer === 'asr' ? 'আসর' :
                 prayer === 'maghrib' ? 'মাগরিব' : 'এশা'}
              </div>
              <div className="text-2xl font-bold text-green-600">{time}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">নামাজে উপস্থিতি</h4>
          <div className="flex items-center justify-between">
            <span>সাপ্তাহিক গড়</span>
            <span className="font-bold text-blue-600">{attendanceData.prayerAttendance}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${attendanceData.prayerAttendance}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">উপস্থিতি পর্যবেক্ষণ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{attendanceData.totalDays}</div>
            <div className="text-sm text-gray-600">মোট দিন</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{attendanceData.presentDays}</div>
            <div className="text-sm text-gray-600">উপস্থিত</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{attendanceData.absentDays}</div>
            <div className="text-sm text-gray-600">অনুপস্থিত</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{attendanceData.percentage}%</div>
            <div className="text-sm text-gray-600">শতাংশ</div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-2">সামগ্রিক উপস্থিতির চার্ট</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${attendanceData.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            মাশাআল্লাহ! আপনার সন্তানের উপস্থিতি অত্যন্ত ভালো।
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">মাদরাসা থেকে বিজ্ঞপ্তি</h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`border-l-4 pl-4 py-2 ${
              notification.priority === 'high' ? 'border-red-500 bg-red-50' :
              notification.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-green-500 bg-green-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                <div className="ml-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    notification.type === 'exam' ? 'bg-red-100 text-red-800' :
                    notification.type === 'meeting' ? 'bg-yellow-100 text-yellow-800' :
                    notification.type === 'achievement' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.type === 'exam' ? 'পরীক্ষা' :
                     notification.type === 'meeting' ? 'সভা' :
                     notification.type === 'achievement' ? 'অর্জন' : 'ঘোষণা'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Phone className="w-6 h-6 mr-2 text-blue-600" />
          যোগাযোগের তথ্য
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">প্রধান শিক্ষক</h4>
              <p className="text-gray-700">মাওলানা আবু বকর সিদ্দিক</p>
              <p className="text-sm text-gray-600">ফোন: ০১৭১২-৩৪৫৬৭৮</p>
              <p className="text-sm text-gray-600">ইমেইল: principal@madrasa.edu.bd</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">হিফজ বিভাগের প্রধান</h4>
              <p className="text-gray-700">মাওলানা উমর ফারুক</p>
              <p className="text-sm text-gray-600">ফোন: ০১৮১২-৭৮৯০১২</p>
              <p className="text-sm text-gray-600">ইমেইল: hifz@madrasa.edu.bd</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">শ্রেণি শিক্ষক</h4>
              <p className="text-gray-700">উস্তাদ আব্দুর রহমান</p>
              <p className="text-sm text-gray-600">ফোন: ০১৯১২-৩৪৫৬৭৮</p>
              <p className="text-sm text-gray-600">ইমেইল: teacher@madrasa.edu.bd</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">অফিস</h4>
              <p className="text-gray-700">আল-জামিয়া আল-ইসলামিয়া</p>
              <p className="text-sm text-gray-600">ফোন: ০২-৯৮৭৬৫৪৩</p>
              <p className="text-sm text-gray-600">ইমেইল: info@madrasa.edu.bd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'hifz': return renderHifzProgress();
      case 'progress': return renderProgress();
      case 'attendance': return renderAttendance();
      case 'prayer': return renderPrayerTimes();
      case 'notifications': return renderNotifications();
      case 'contact': return renderContact();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">লগআউট নিশ্চিতকরণ</h3>
                  <p className="text-sm text-gray-600">আপনি কি নিশ্চিত যে লগআউট করতে চান?</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  লগআউট করলে আপনাকে পুনরায় লগইন করতে হবে।
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  বাতিল
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  হ্যাঁ, লগআউট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b bg-gradient-to-r from-green-600 to-emerald-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white">
              <Home className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">অভিভাবক প্যানেল</h1>
                <p className="text-xs text-green-100">আল-জামিয়া আল-ইসলামিয়া</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-green-700 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-green-50 transition-colors ${
                  activeTab === item.id ? 'bg-green-50 border-r-2 border-green-500 text-green-700' : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">আসসালামু আলাইকুম,</p>
                  <p className="font-medium text-gray-800">মোঃ আব্দুল করিম</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600">
                আপনার সন্তানের ইসলামী শিক্ষা ও আধ্যাত্মিক অগ্রগতি এখানে দেখুন
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MadrasaGuardianDashboard;