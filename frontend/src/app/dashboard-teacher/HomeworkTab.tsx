// dashboard-teacher/HomeworkTab.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { BookMarked, Plus, Calendar, Trash2, AlertCircle, Loader2 } from 'lucide-react';

interface HomeworkItem {
  _id: string;
  subject: string;
  assignment: string;
  dueDate: string;
  className?: string;
  teacherId?: string;
  teacherName?: string;
  status: 'active' | 'expired' | 'completed';
  isCompleted: boolean;
  completedBy: Array<{
    studentId: string;
    completedDate: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface HomeworkTabProps {
  teacherId?: string;
  teacherName?: string;
  className?: string;
}

const HomeworkTab: React.FC<HomeworkTabProps> = ({ 
  teacherId, 
  teacherName,
  className 
}) => {
  const [homework, setHomework] = useState<HomeworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newHomework, setNewHomework] = useState({ 
    subject: '', 
    assignment: '', 
    dueDate: '',
    className: className || ''
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Fetch homework from backend
  useEffect(() => {
    fetchHomework();
  }, [teacherId, className]);

  const fetchHomework = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${API_URL}/api/homework`;
      const params = new URLSearchParams();
      
      if (teacherId) params.append('teacherId', teacherId);
      if (className) params.append('className', className);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('গৃহকর্ম লোড করতে ব্যর্থ');
      }

      const data = await response.json();
      
      if (data.success) {
        setHomework(data.data);
      } else {
        throw new Error(data.error || 'গৃহকর্ম লোড করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে');
      console.error('Error fetching homework:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHomework = async () => {
    if (!newHomework.subject || !newHomework.assignment || !newHomework.dueDate) {
      setError('সব তথ্য পূরণ করুন');
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const homeworkData = {
        subject: newHomework.subject,
        assignment: newHomework.assignment,
        dueDate: newHomework.dueDate,
        className: newHomework.className || className,
        teacherId: teacherId,
        teacherName: teacherName
      };

      const response = await fetch(`${API_URL}/api/homework`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeworkData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'গৃহকর্ম যোগ করতে ব্যর্থ');
      }

      // Reset form and refresh list
      setNewHomework({ subject: '', assignment: '', dueDate: '', className: className || '' });
      await fetchHomework();
      
      // Show success message
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'গৃহকর্ম যোগ করতে সমস্যা হয়েছে');
      console.error('Error adding homework:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteHomework = async (id: string) => {
    if (!confirm('আপনি কি এই গৃহকর্ম মুছে ফেলতে চান?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/homework/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'গৃহকর্ম মুছে ফেলতে ব্যর্থ');
      }

      // Refresh list
      await fetchHomework();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'গৃহকর্ম মুছে ফেলতে সমস্যা হয়েছে');
      console.error('Error deleting homework:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    const labels = {
      active: 'সক্রিয়',
      expired: 'মেয়াদ শেষ',
      completed: 'সম্পন্ন'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">গৃহকর্ম লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">ত্রুটি</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

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
              disabled={submitting}
            />
            <input
              type="text"
              placeholder="কাজের বিবরণ"
              value={newHomework.assignment}
              onChange={(e) => setNewHomework(prev => ({ ...prev, assignment: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={submitting}
            />
            <input
              type="date"
              value={newHomework.dueDate}
              onChange={(e) => setNewHomework(prev => ({ ...prev, dueDate: e.target.value }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              disabled={submitting}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button
            onClick={handleAddHomework}
            disabled={submitting}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>যোগ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                <span>যোগ করুন</span>
              </>
            )}
          </button>
        </div>

        {/* Homework List */}
        <div className="grid gap-4">
          {homework.length === 0 ? (
            <div className="text-center py-12">
              <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">কোনো গৃহকর্ম পাওয়া যায়নি</p>
              <p className="text-gray-400 text-sm mt-2">নতুন গৃহকর্ম যোগ করুন</p>
            </div>
          ) : (
            homework.map(hw => (
              <div key={hw._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-800">{hw.subject}</h3>
                    {getStatusBadge(hw.status)}
                  </div>
                  <p className="text-gray-700 mb-2">{hw.assignment}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>শেষ তারিখ: {formatDate(hw.dueDate)}</span>
                    </div>
                    {hw.completedBy.length > 0 && (
                      <span className="text-green-600">
                        {hw.completedBy.length} জন সম্পন্ন করেছে
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteHomework(hw._id)}
                  className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkTab;