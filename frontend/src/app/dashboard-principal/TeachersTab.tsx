'use client';
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import TeacherModal from './TeacherModal';

const TeachersTab = ({ teachers, setTeachers }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id) => {
    if (confirm('আপনি কি শিক্ষক মুছে ফেলতে চান?')) {
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleAdd = (newTeacher) => {
    setTeachers((prev) => [newTeacher, ...prev]);
    setShowModal(false);
  };

  const getName = (teacher) => teacher.teacherName || teacher.name || 'N/A';
  const getDesignation = (teacher) => teacher.designation || teacher.position || 'N/A';
  const getContact = (teacher) => teacher.phoneNumber || teacher.contact || 'N/A';

  return (
  <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">শিক্ষক তালিকা</h3>
            <p className="text-blue-100 text-sm">সকল শিক্ষকদের তথ্য ব্যবস্থাপনা</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg flex items-center hover:bg-blue-50 transition-all duration-200 shadow-md font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            নতুন শিক্ষক
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {teachers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">কোনো শিক্ষক পাওয়া যায়নি</h4>
            <p className="text-gray-500 mb-6">নতুন শিক্ষক যোগ করতে উপরের বাটনে ক্লিক করুন</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              প্রথম শিক্ষক যোগ করুন
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    শিক্ষকের তথ্য
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    পদবী
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    যোগাযোগ
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    কার্যক্রম
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teachers.map((teacher, index) => (
                  <tr 
                    key={teacher.id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-semibold text-sm">
                            {getName(teacher)?.charAt(0) || 'শ'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getName(teacher)}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {teacher.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {getDesignation(teacher)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {getContact(teacher)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="বিস্তারিত দেখুন"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                          title="সম্পাদনা করুন"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                          onClick={() => handleDelete(teacher.id)}
                          title="মুছে ফেলুন"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Footer with teacher count */}
        {teachers.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
            <span>মোট {teachers.length} জন শিক্ষক</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                পূর্ববর্তী
              </button>
              <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                পরবর্তী
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

    {showModal && (
      <TeacherModal onClose={() => setShowModal(false)} onSubmit={handleAdd} />
    )}
  </div>
);
}

export default TeachersTab;
