"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/dashboard-principal/Sidebar";
import OverviewTab from "@/app/dashboard-principal/OverviewTab";
import StudentsTab from "@/app/dashboard-principal/StudentsTab";
import TeachersTab from "@/app/dashboard-principal/TeachersTab";
import ResultsTab from "@/app/dashboard-principal/ResultsTab";
import NoticesTab from "@/app/dashboard-principal/NoticesTab";
import NoticeModal from "@/app/dashboard-principal/NoticeModal";
import { toast } from "react-hot-toast";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { StudentRecord } from "@/app/dashboard-principal/StudentModal";
import { TeacherRecord } from "@/app/dashboard-principal/TeacherModal";

export default function PrincipalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা',
      content: 'আগামী ২৫শে আগস্ট, ২০২৫ তারিখে প্রতিষ্ঠানের বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: 'info'
    },
    {
      id: 2,
      title: 'অভিভাবক সমাবেশ',
      content: 'সকল শিক্ষার্থীদের অভিভাবকদের নিয়ে একটি সমাবেশ অনুষ্ঠিত হবে আগামী শুক্রবার।',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      type: 'warning'
    },
    {
      id: 3,
      title: 'ছুটি ঘোষণা',
      content: 'ঈদ-উল-মিলাদুন্নবী (সা.) উপলক্ষে আগামী সোমবার প্রতিষ্ঠান বন্ধ থাকবে।',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: 'success'
    },
    {
      id: 4,
      title: 'পরীক্ষার সময়সূচি প্রকাশ',
      content: 'অর্ধবার্ষিক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। অনুগ্রহ করে নোটিশ বোর্ডে দেখে নিন।',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      type: 'info'
    },
    {
      id: 5,
      title: 'শ্রেণিকক্ষ রক্ষণাবেক্ষণ',
      content: 'আগামীকাল শ্রেণিকক্ষগুলোতে পরিষ্কার-পরিচ্ছন্নতা কার্যক্রম চলবে, সকল শিক্ষার্থীকে সচেতন থাকতে বলা হলো।',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: 'warning'
    }
  ]);

  const [results, setResults] = useState([
    {
      id: 1,
      student: 'আবু বকর সিদ্দিক',
      className: 'দ্বিতীয় জামাত',
      exam: 'মাসিক পরীক্ষা',
      grade: 'A+'
    },
    {
      id: 2,
      student: 'ফাতিমা বিন্তে মুহাম্মদ',
      className: 'তৃতীয় জামাত',
      exam: 'ত্রৈমাসিক পরীক্ষা',
      grade: 'A'
    },
    {
      id: 3,
      student: 'মুহাম্মদ আল আমিন',
      className: 'চতুর্থ জামাত',
      exam: 'অর্ধবার্ষিক পরীক্ষা',
      grade: 'B+'
    },
    {
      id: 4,
      student: 'রহিমা খাতুন',
      className: 'হিফজ বিভাগ',
      exam: 'অগ্রগতির পরীক্ষা',
      grade: 'A'
    },
    {
      id: 5,
      student: 'তানভীর হাসান',
      className: 'পঞ্চম জামাত',
      exam: 'মাসিক পরীক্ষা',
      grade: 'A+'
    },
    {
      id: 6,
      student: 'সুমাইয়া আক্তার',
      className: 'ছয় নম্বর জামাত',
      exam: 'ত্রৈমাসিক পরীক্ষা',
      grade: 'A'
    },
    {
      id: 7,
      student: 'আবদুল করিম',
      className: 'মুত্তাওয়াসসিতাহ',
      exam: 'বার্ষিক পরীক্ষা',
      grade: 'B'
    },
    {
      id: 8,
      student: 'জয়নাব বিন্তে আবু তালেব',
      className: 'সানাবিয়া উলা',
      exam: 'মধ্যবর্তী পরীক্ষা',
      grade: 'A+'
    }
  ]);

  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [teachersLoading, setTeachersLoading] = useState(true);
  const [teachersError, setTeachersError] = useState<string | null>(null);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    pendingResults: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchStudents = useCallback(async () => {
    try {
      setStudentsLoading(true);
      setStudentsError(null);
      const response = await api.get('/students', {
        params: { limit: 100, page: 1 }
      });
      setStudents(response.data.data);
      setStats(prev => ({
        ...prev,
        totalStudents: response.data.total || response.data.data?.length || 0
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || 'শিক্ষার্থীর ডেটা লোড করতে ব্যর্থ হয়েছে';
      setStudentsError(message);
      setError(message);
      toast.error(message);
    } finally {
      setStudentsLoading(false);
    }
  }, []);

  const fetchTeachers = useCallback(async () => {
    try {
      setTeachersLoading(true);
      setTeachersError(null);
      const response = await api.get('/teachers', {
        params: { limit: 100, page: 1 }
      });
      setTeachers(response.data.data);
      setStats(prev => ({
        ...prev,
        totalTeachers: response.data.total || response.data.data?.length || 0
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || 'শিক্ষকের ডেটা লোড করতে ব্যর্থ হয়েছে';
      setTeachersError(message);
      toast.error(message);
    } finally {
      setTeachersLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchStudents(), fetchTeachers()]).finally(() => {
      setStats(prev => ({
        ...prev,
        totalClasses: 10,
        pendingResults: 12
      }));
      setLoading(false);
    });
  }, [fetchStudents, fetchTeachers]);

  const handleStudentCreated = (student: StudentRecord) => {
    setStudents(prev => [student, ...prev]);
    setStats(prev => ({
      ...prev,
      totalStudents: (prev.totalStudents || 0) + 1
    }));
  };

  const handleStudentDeleted = async (id: string) => {
    await api.delete(`/students/${id}`);
    setStudents(prev => prev.filter(student => student._id !== id));
    setStats(prev => ({
      ...prev,
      totalStudents: Math.max((prev.totalStudents || 1) - 1, 0)
    }));
  };

  const handleTeacherCreated = (teacher: TeacherRecord) => {
    setTeachers(prev => [teacher, ...prev]);
    setStats(prev => ({
      ...prev,
      totalTeachers: (prev.totalTeachers || 0) + 1
    }));
  };

  const handleTeacherDeleted = async (id: string) => {
    await api.delete(`/teachers/${id}`);
    setTeachers(prev => prev.filter(teacher => teacher._id !== id));
    setStats(prev => ({
      ...prev,
      totalTeachers: Math.max((prev.totalTeachers || 1) - 1, 0)
    }));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userAuth');
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700"></div>
        </div>
      );
    }
    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
      case 'students':
        return (
          <StudentsTab
            students={students}
            loading={studentsLoading}
            error={studentsError}
            refresh={fetchStudents}
            onStudentCreated={handleStudentCreated}
            onDeleteStudent={handleStudentDeleted}
          />
        );
      case 'teachers':
        return (
          <TeachersTab
            teachers={teachers}
            loading={teachersLoading}
            error={teachersError}
            refresh={fetchTeachers}
            onTeacherCreated={handleTeacherCreated}
            onDeleteTeacher={handleTeacherDeleted}
          />
        );
      case 'results':
        return <ResultsTab results={results} setResults={setResults} />;
      case 'notices':
        return (
          <NoticesTab
            notices={notices}
            setNotices={setNotices}
            setShowModal={setShowNoticeModal}
          />
        );
      default:
        return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
    }
  };

  const getBengaliDate = () => {
    const months = [
      "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
      "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
    ];
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const toBengaliNumber = (num: number | string) =>
      String(num)
        .split('')
        .map(d => /\d/.test(d) ? bnDigits[Number(d)] : d)
        .join('');

    const now = new Date();
    return `${toBengaliNumber(now.getDate())} ${months[now.getMonth()]}, ${toBengaliNumber(now.getFullYear())}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <div className="ml-64 p-6">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">দারুল হিকমাহ ইনস্টিটিউট</h1>
              <p className="text-gray-600">প্রিন্সিপাল প্রশাসনিক প্যানেল</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">আজকের তারিখ</p>
                <p className="font-semibold text-gray-800">{getBengaliDate()}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">প্র</span>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'notices' && (
          <div className="pb-4 flex justify-end">
            <button
              onClick={() => setShowNoticeModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            >
              <span className="mr-2">➕</span>
              নতুন নোটিশ
            </button>
          </div>
        )}

        {renderContent()}
      </div>

      {showNoticeModal && (
        <NoticeModal
          onClose={() => setShowNoticeModal(false)}
          onSubmit={(title, content) => {
            const newNotice = {
              id: Date.now(),
              title,
              content,
              date: new Date(),
              type: 'info'
            };
            setNotices([newNotice, ...notices]);
            setShowNoticeModal(false);
          }}
        />
      )}
    </div>
  );
}