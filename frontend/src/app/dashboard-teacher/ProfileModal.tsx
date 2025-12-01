// dashboard-teacher/ProfileModal.tsx
'use client';
import React from 'react';
import { X, User, Award, Star } from 'lucide-react';
import { TeacherProfile } from './types';

interface ProfileModalProps {
  teacherProfile: TeacherProfile;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ teacherProfile, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{teacherProfile.name}</h2>
                <p className="text-emerald-100">{teacherProfile.designation}</p>
                <p className="text-emerald-200 text-sm">{teacherProfile.specialization}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">যোগাযোগের তথ্য</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">📧 {teacherProfile.email}</p>
                  <p className="text-gray-600">📞 {teacherProfile.phone}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">অভিজ্ঞতা</h3>
                <p className="text-2xl font-bold text-emerald-600">{teacherProfile.experience}</p>
                <p className="text-sm text-gray-600">শিক্ষকতার অভিজ্ঞতা</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">শিক্ষাগত যোগ্যতা</h3>
                <p className="text-gray-700 text-sm">{teacherProfile.education}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">মোট ছাত্র-ছাত্রী</h3>
                <p className="text-2xl font-bold text-blue-600">{teacherProfile.totalStudents}</p>
                <p className="text-sm text-gray-600">বর্তমান সেশনে</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              পুরস্কার ও সম্মাননা
            </h3>
            <div className="space-y-2">
              {teacherProfile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;