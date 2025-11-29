"use client";
import React, { useState } from "react";
import { Eye, Trash2, Plus, RefreshCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import StudentModal, { StudentRecord } from "./StudentModal";

interface StudentsTabProps {
  students: StudentRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  onStudentCreated: (student: StudentRecord) => void;
  onDeleteStudent: (id: string) => Promise<void>;
}

const StudentsTab = ({
  students,
  loading,
  error,
  refresh,
  onStudentCreated,
  onDeleteStudent,
}: StudentsTabProps) => {
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refresh();
      toast.success("ডেটা রিফ্রেশ হয়েছে");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ডেটা রিফ্রেশ করতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি এই ছাত্র/ছাত্রীটি মুছে ফেলতে চান?")) {
      return;
    }
    try {
      setDeletingId(id);
      await onDeleteStudent(id);
      toast.success("শিক্ষার্থী সফলভাবে মুছে ফেলা হয়েছে");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "মুছে ফেলতে ব্যর্থ হয়েছে";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">ছাত্র-ছাত্রী তালিকা</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className={`px-4 py-2 rounded-lg flex items-center border border-green-600 text-green-700 hover:bg-green-50 transition-colors ${
                refreshing || loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              রিফ্রেশ
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              নতুন ছাত্র/ছাত্রী
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500 py-8">কোনো ছাত্র/ছাত্রী পাওয়া যায়নি</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">নাম</th>
                  <th className="px-6 py-3">পিতার নাম</th>
                  <th className="px-6 py-3">ক্লাস</th>
                  <th className="px-6 py-3">মোবাইল</th>
                  <th className="px-6 py-3">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st._id} className="bg-white border-b">
                    <td className="px-6 py-4">{st.fullName}</td>
                    <td className="px-6 py-4">{st.fatherName}</td>
                    <td className="px-6 py-4">{st.className}</td>
                    <td className="px-6 py-4">{st.phone}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        onClick={() => handleDelete(st._id)}
                        disabled={deletingId === st._id}
                      >
                        {deletingId === st._id ? (
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
        <StudentModal
          onClose={() => setShowModal(false)}
          onSuccess={(student) => {
            onStudentCreated(student);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default StudentsTab;
