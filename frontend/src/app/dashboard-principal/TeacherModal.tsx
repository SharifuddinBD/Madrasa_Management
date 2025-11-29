'use client';
import React, { useState } from 'react';
import { X, UserCheck } from 'lucide-react';

interface TeacherData { /* same as yours */ }

const TeacherModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: TeacherData) => void;
}) => {
  const [formData, setFormData] = useState<TeacherData>({
    id: 0,
    teacherName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    currentAddress: '',
    permanentAddress: '',
    phoneNumber: '',
    emergencyContact: '',
    email: '',
    birthDate: '',
    bloodGroup: '',
    nid: '',
    education: '',
    university: '',
    passingYear: '',
    subject: '',
    experience: '',
    previousInstitution: '',
    joiningDate: '',
    designation: '',
    salary: '',
    medicalConditions: '',
    references: '',
    specialSkills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const required = ['teacherName', 'fatherName', 'motherName', 'currentAddress', 'phoneNumber', 'birthDate', 'designation'];
    const missing = required.filter(field => !formData[field as keyof TeacherData]);
    if (missing.length > 0) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    onSubmit({ ...formData, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-2xl font-semibold text-gray-800">শিক্ষক নিবন্ধন</h3>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-600 hover:text-black" /></button>
        </div>

        <form className="space-y-6 text-sm">
          {/* Reusable Section */}
          {[
            { title: 'ব্যক্তিগত তথ্য', fields: [
              ['teacherName', 'নাম *'],
              ['fatherName', 'পিতার নাম *'],
              ['motherName', 'মাতার নাম *'],
              ['spouseName', 'স্বামী/স্ত্রীর নাম'],
              ['birthDate', 'জন্ম তারিখ', 'date'],
              ['bloodGroup', 'রক্তের গ্রুপ'],
              ['nid', 'জাতীয় পরিচয়পত্র নম্বর']
            ]},
            { title: 'যোগাযোগের তথ্য', fields: [
              ['currentAddress', 'বর্তমান ঠিকানা *'],
              ['permanentAddress', 'স্থায়ী ঠিকানা'],
              ['phoneNumber', 'মোবাইল নম্বর *'],
              ['emergencyContact', 'জরুরি যোগাযোগ'],
              ['email', 'ইমেইল', 'email']
            ]},
            { title: 'শিক্ষাগত যোগ্যতা', fields: [
              ['education', 'ডিগ্রি *'],
              ['subject', 'বিষয় *'],
              ['university', 'বিশ্ববিদ্যালয়'],
              ['passingYear', 'পাসের বছর']
            ]},
            { title: 'অভিজ্ঞতা', fields: [
              ['experience', 'মোট অভিজ্ঞতা (বছর)'],
              ['previousInstitution', 'পূর্ববর্তী প্রতিষ্ঠান']
            ]},
            { title: 'চাকরির তথ্য', fields: [
              ['joiningDate', 'যোগদানের তারিখ *', 'date'],
              ['designation', 'পদবী *'],
              ['salary', 'বেতন']
            ]},
          ].map(section => (
            <div key={section.title} className="bg-gray-50 border p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">{section.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map(([name, placeholder, type]) => (
                  <input
                    key={name}
                    type={type || 'text'}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof TeacherData] as string}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Others */}
          <div className="bg-gray-50 border p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-blue-600 mb-4">অতিরিক্ত তথ্য</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['medicalConditions', 'references', 'specialSkills'].map(name => (
                <textarea
                  key={name}
                  name={name}
                  placeholder={{
                    medicalConditions: 'যদি কোনো শারীরিক সমস্যা থাকে',
                    references: 'রেফারেন্স',
                    specialSkills: 'বিশেষ দক্ষতা'
                  }[name as keyof typeof formData]}
                  value={formData[name as keyof TeacherData] as string}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              ))}
            </div>
          </div>
        </form>

        <div className="flex justify-end pt-4 border-t space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">বাতিল</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
            <UserCheck className="w-4 h-4 mr-2" /> সংরক্ষণ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
