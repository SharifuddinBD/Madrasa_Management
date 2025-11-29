'use client'
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  MapPin, 
  BookOpen, 
  UserCheck,
  Upload,
  FileText,
  Calendar,
  GraduationCap,
  Award,
  Briefcase
} from 'lucide-react';

const TeacherRegistrationForm = () => {
  const [formData, setFormData] = useState({
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
    specialSkills: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSameAddressToggle = () => {
    setSameAddress(!sameAddress);
    if (!sameAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = [
      'teacherName', 'fatherName', 'motherName', 'currentAddress', 
      'permanentAddress', 'phoneNumber', 'birthDate', 'education', 
      'subject', 'joiningDate', 'designation'
    ];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }
    
    // Handle form submission logic here
    console.log('Teacher form submitted:', formData);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Navigate back');
  };

  const educationLevels = [
    { value: 'doctorate', label: 'পিএইচডি' },
    { value: 'masters', label: 'মাস্টার্স' },
    { value: 'bachelors', label: 'স্নাতক' },
    { value: 'hsc', label: 'এইচএসসি' },
    { value: 'ssc', label: 'এসএসসি' },
    { value: 'madrasah', label: 'মাদ্রাসা শিক্ষা' },
    { value: 'others', label: 'অন্যান্য' }
  ];

  const designations = [
    { value: 'senior-teacher', label: 'সিনিয়র শিক্ষক' },
    { value: 'teacher', label: 'শিক্ষক' },
    { value: 'assistant-teacher', label: 'সহকারী শিক্ষক' },
    { value: 'hifz-teacher', label: 'হিফজ শিক্ষক' },
    { value: 'nazera-teacher', label: 'নাজেরা শিক্ষক' },
    { value: 'quran-teacher', label: 'কুরআন শিক্ষক' },
    { value: 'hadith-teacher', label: 'হাদিস শিক্ষক' },
    { value: 'fiqh-teacher', label: 'ফিকহ শিক্ষক' }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">সফলভাবে নিবন্ধিত!</h3>
            <p className="text-gray-600 mb-4">নতুন শিক্ষক সফলভাবে নিবন্ধিত হয়েছে।</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setFormData({
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
                    specialSkills: ''
                  });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                নতুন শিক্ষক যোগ করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                ফিরে যান
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">নতুন শিক্ষক নিবন্ধন</h1>
                <p className="text-gray-600">দারুল হিকমাহ ইনস্টিটিউট</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">আজকের তারিখ</p>
              <p className="font-semibold text-gray-800">১৪ জুলাই, ২০২৫</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">ব্যক্তিগত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    শিক্ষকের নাম *
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="শিক্ষকের পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জন্ম তারিখ *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="পিতার পূর্ণ নাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="মাতার পূর্ণ নাম লিখুন"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জাতীয় পরিচয়পত্র নং
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="জাতীয় পরিচয়পত্র নম্বর"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">যোগাযোগের তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জরুরি যোগাযোগ
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="জরুরি অবস্থায় যোগাযোগের নম্বর"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">ঠিকানা</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বর্তমান ঠিকানা *
                  </label>
                  <textarea
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="বর্তমান ঠিকানা বিস্তারিত লিখুন"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAddress}
                    onChange={handleSameAddressToggle}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sameAddress" className="text-sm text-gray-700">
                    স্থায়ী ঠিকানা বর্তমান ঠিকানার মতোই
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    স্থায়ী ঠিকানা *
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="স্থায়ী ঠিকানা বিস্তারিত লিখুন"
                  />
                </div>
              </div>
            </div>

            {/* Educational Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">শিক্ষাগত যোগ্যতা</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    সর্বোচ্চ শিক্ষাগত যোগ্যতা *
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">শিক্ষাগত যোগ্যতা নির্বাচন করুন</option>
                    {educationLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিশেষজ্ঞতার বিষয় *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="যেমন: কুরআন, হাদিস, ফিকহ, আরবি"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    শিক্ষা প্রতিষ্ঠান/বিশ্ববিদ্যালয়
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="শিক্ষা প্রতিষ্ঠানের নাম"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পাশের বছর
                  </label>
                  <input
                    type="number"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="উত্তীর্ণ হওয়ার বছর"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    বিশেষ দক্ষতা
                  </label>
                  <textarea
                    name="specialSkills"
                    value={formData.specialSkills}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="বিশেষ দক্ষতা বা অভিজ্ঞতা লিখুন"
                  />
                </div>
              </div>
            </div>

            {/* Employment Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">চাকরি সংক্রান্ত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পদবী *
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">পদবী নির্বাচন করুন</option>
                    {designations.map(designation => (
                      <option key={designation.value} value={designation.value}>
                        {designation.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    যোগদানের তারিখ *
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মাসিক বেতন
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="মাসিক বেতনের পরিমাণ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    অভিজ্ঞতা (বছর)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="শিক্ষকতার অভিজ্ঞতা"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পূর্ববর্তী চাকরি
                  </label>
                  <input
                    type="text"
                    name="previousInstitution"
                    value={formData.previousInstitution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="পূর্ববর্তী চাকরির প্রতিষ্ঠানের নাম (যদি থাকে)"
                  />
                </div>
              </div>
            </div>

            {/* References Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">রেফারেন্স</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  রেফারেন্স (নাম, পদবী, যোগাযোগ)
                </label>
                <textarea
                  name="references"
                  value={formData.references}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="রেফারেন্স ব্যক্তির নাম, পদবী এবং যোগাযোগের তথ্য"
                />
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">স্বাস্থ্য সংক্রান্ত তথ্য</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  বিশেষ স্বাস্থ্য সমস্যা (যদি থাকে)
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="কোন বিশেষ স্বাস্থ্য সমস্যা বা অ্যালার্জি থাকলে লিখুন"
                />
              </div>
            </div>

            {/* Documents Upload Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Upload className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">প্রয়োজনীয় কাগজপত্র</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">শিক্ষাগত সনদপত্র</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">সনদপত্র আপলোড করুন</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">জাতীয় পরিচয়পত্র</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">এনআইডি কার্ড আপলোড করুন</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">ছবি (পাসপোর্ট সাইজ)</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">পাসপোর্ট সাইজ ছবি</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">অন্যান্য কাগজপত্র</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">অন্যান্য প্রয়োজনীয় কাগজ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Administration Approval Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">প্রশাসনিক অনুমোদন</h2>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  প্রতিষ্ঠান প্রধান বা নির্দেশক কর্তৃক অনুমোদন প্রয়োজন
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      অনুমোদনকারীর নাম
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="অনুমোদনকারীর নাম"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      অনুমোদনের তারিখ
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">অনুমোদনকারীর সাক্ষর</p>
                    <p className="text-xs text-gray-500 mt-1">সাক্ষরের ছবি আপলোড করুন</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                শিক্ষক নিবন্ধন সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal />
    </div>
  );
};

export default TeacherRegistrationForm;