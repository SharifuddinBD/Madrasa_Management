import React from 'react';
import { Users, GraduationCap, BookOpen, FileText, Plus, Bell, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OverviewTabProps {
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    pendingResults: number;
  };
}

const recentResults = [
  { id: 1, student: 'মোহাম্মদ আহমেদ', class: 'দশম', exam: 'মাসিক পরীক্ষা', result: 'A+', date: '২০২৫-০৭-০৮' },
  { id: 2, student: 'ফাতিমা খাতুন', class: 'নবম', exam: 'সাপ্তাহিক পরীক্ষা', result: 'A', date: '২০২৫-০৭-০৭' },
  { id: 3, student: 'আবু বকর সিদ্দিক', class: 'অষ্টম', exam: 'মাসিক পরীক্ষা', result: 'A+', date: '২০২৫-০৭-০৬' }
];

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number | string; icon: any; color: string }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 border-l-4 ${color}`}>
    <div className="text-3xl"><Icon /></div>
    <div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const OverviewTab: React.FC<OverviewTabProps> = ({ stats }) => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="মোট শিক্ষার্থী" value={stats.totalStudents} icon={Users} color="border-blue-500" />
        <StatCard title="মোট শিক্ষক" value={stats.totalTeachers} icon={GraduationCap} color="border-purple-500" />
        <StatCard title="মোট ক্লাস" value={stats.totalClasses} icon={BookOpen} color="border-yellow-500" />
        <StatCard title="অপ্রকাশিত ফলাফল" value={stats.pendingResults} icon={FileText} color="border-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">সাম্প্রতিক ফলাফল</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ছাত্র/ছাত্রী</th>
                  <th className="px-6 py-3">ক্লাস</th>
                  <th className="px-6 py-3">পরীক্ষা</th>
                  <th className="px-6 py-3">ফলাফল</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map(r => (
                  <tr key={r.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{r.student}</td>
                    <td className="px-6 py-4">{r.class}</td>
                    <td className="px-6 py-4">{r.exam}</td>
                    <td className="px-6 py-4 font-semibold">{r.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">দ্রুত কার্যক্রম</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => router.push('/new-student-add')} className="flex flex-col items-center justify-center p-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">নতুন শিক্ষার্থী</span>
            </button>
            <button onClick={() => router.push('/new-teacher-add')} className="flex flex-col items-center justify-center p-4 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">নতুন শিক্ষক</span>
            </button>
            <button onClick={() => router.push('#notices')} className="flex flex-col items-center justify-center p-4 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors">
              <Bell className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">নোটিশ পাঠান</span>
            </button>
            <button onClick={() => alert('ফলাফল আপলোড')} className="flex flex-col items-center justify-center p-4 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm font-semibold">ফলাফল আপলোড</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
