// dashboard-teacher/AttendanceTab.tsx
'use client';
import React from 'react';
import { ClipboardList, Users, X, TrendingUp, Calendar } from 'lucide-react';
import { Student } from './types';

interface AttendanceTabProps {
  students: Student[];
  toggleAttendance: (studentId: number, date?: string | null) => void;
}

const AttendanceTab: React.FC<AttendanceTabProps> = ({ students, toggleAttendance }) => {
  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calculateAttendanceStats = () => {
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
                <th className="border p-3 text-left font-semibold sticky left-0 bg-gray-100 z-10">নাম</th>
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
                <th className="border p-3 text-center font-semibold bg-green-50 sticky right-20">মোট উপস্থিত</th>
                <th className="border p-3 text-center font-semibold bg-blue-50 sticky right-0">উপস্থিতির %</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                let totalPresent = 0;
                let totalDays = 0;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border p-3 whitespace-nowrap font-medium sticky left-0 bg-white z-10">
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
                    <td className="border p-3 text-center font-bold text-green-700 bg-green-50 sticky right-20">
                      {totalPresent}
                    </td>
                    <td className="border p-3 text-center font-bold text-blue-700 bg-blue-50 sticky right-0">
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
};

export default AttendanceTab;