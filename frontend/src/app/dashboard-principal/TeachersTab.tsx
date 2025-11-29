"use client";
import React, { useState } from "react";
import { Eye, Trash2, Plus, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import TeacherModal, { TeacherRecord } from "./TeacherModal";

interface TeachersTabProps {
  teachers: TeacherRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  onTeacherCreated: (teacher: TeacherRecord) => void;
  onDeleteTeacher: (id: string) => Promise<void>;
}

const TeachersTab: React.FC<TeachersTabProps> = ({
  teachers,
  loading,
  error,
  refresh,
  onTeacherCreated,
  onDeleteTeacher,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refresh();
      toast.success("ডেটা রিফ্রেশ হয়েছে");
    } catch (error) {
      const message = error instanceof Error ? error.message : "ডেটা রিফ্রেশ করতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি এই শিক্ষক মুছে ফেলতে চান?")) {
      return;
    }
    try {
      setDeletingId(id);
      await onDeleteTeacher(id);
      toast.success("শিক্ষক সফলভাবে মুছে ফেলা হয়েছে");
    } catch (error) {
      const message = error instanceof Error ? error.message : "মুছে ফেলতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">শিক্ষক তালিকা</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className={`px-4 py-2 rounded-lg flex items-center border border-blue-600 text-blue-700 hover:bg-blue-50 transition-colors ${
                refreshing || loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              রিফ্রেশ
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন শিক্ষক
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : teachers.length === 0 ? (
          <p className="text-center text-gray-500 py-8">কোনো শিক্ষক পাওয়া যায়নি</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">নাম</th>
                  <th className="px-6 py-3">পদবী</th>
                  <th className="px-6 py-3">মোবাইল</th>
                  <th className="px-6 py-3">ইমেইল</th>
                  <th className="px-6 py-3">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="bg-white border-b">
                    <td className="px-6 py-4">{teacher.teacherName}</td>
                    <td className="px-6 py-4">{teacher.designation}</td>
                    <td className="px-6 py-4">{teacher.phoneNumber}</td>
                    <td className="px-6 py-4">{teacher.email || 'N/A'}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        onClick={() => handleDelete(teacher._id)}
                        disabled={deletingId === teacher._id}
                      >
                        {deletingId === teacher._id ? (
                          <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <TeacherModal
          onClose={() => setShowModal(false)}
          onSuccess={(teacher) => {
            onTeacherCreated(teacher);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TeachersTab;