'use client';
import React, { useState, useCallback } from 'react';
import { X, UserPlus, User, Phone, BookOpen, Briefcase, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import api from '@/lib/api';

// Match backend Teacher model exactly
export interface TeacherPayload {
  teacherName: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  birthDate: string;
  bloodGroup: string;
  nid: string;
  currentAddress: string;
  permanentAddress: string;
  phoneNumber: string;
  emergencyContact: string;
  email: string;
  education: string;
  university: string;
  passingYear: string;
  subject: string;
  experience: string;
  previousInstitution: string;
  joiningDate: string;
  designation: string;
  salary: string;
  medicalConditions: string;
  references: string;
  specialSkills: string;
}

export interface TeacherRecord extends TeacherPayload {
  _id: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ErrorsType {
  [key: string]: string | null;
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string | null;
  options?: { value: string; label: string }[];
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
  error,
  options,
  rows,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          rows={rows}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">{placeholder}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}
      {error && (
        <div className="flex items-center mt-1 text-red-600 text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

const TeacherModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (teacher: TeacherRecord) => void;
}) => {
  const [formData, setFormData] = useState<TeacherPayload>({
    teacherName: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    birthDate: '',
    bloodGroup: '',
    nid: '',
    currentAddress: '',
    permanentAddress: '',
    phoneNumber: '',
    emergencyContact: '',
    email: '',
    education: '',
    university: '',
    passingYear: '',
    subject: '',
    experience: '',
    previousInstitution: '',
    joiningDate: new Date().toISOString().split('T')[0],
    designation: '',
    salary: '',
    medicalConditions: '',
    references: '',
    specialSkills: '',
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSameAddressToggle = useCallback(() => {
    setSameAddress(prev => {
      const newValue = !prev;
      if (newValue) {
        setFormData(prevData => ({
          ...prevData,
          permanentAddress: prevData.currentAddress
        }));
      }
      return newValue;
    });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ErrorsType = {};
    
    if (!formData.teacherName.trim()) {
      newErrors['teacherName'] = 'শিক্ষকের নাম প্রয়োজন';
    }
    
    if (!formData.fatherName.trim()) {
      newErrors['fatherName'] = 'পিতার নাম প্রয়োজন';
    }
    
    if (!formData.motherName.trim()) {
      newErrors['motherName'] = 'মাতার নাম প্রয়োজন';
    }
    
    if (!formData.birthDate) {
      newErrors['birthDate'] = 'জন্ম তারিখ প্রয়োজন';
    }
    
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      if (birthDate > new Date()) {
        newErrors['birthDate'] = 'জন্ম তারিখ ভবিষ্যতের হতে পারে না';
      }
    }
    
    if (!formData.currentAddress.trim()) {
      newErrors['currentAddress'] = 'বর্তমান ঠিকানা প্রয়োজন';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors['phoneNumber'] = 'মোবাইল নম্বর প্রয়োজন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors['phoneNumber'] = 'সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors['email'] = 'সঠিক ইমেইল ঠিকানা দিন';
    }
    
    if (!formData.education.trim()) {
      newErrors['education'] = 'শিক্ষাগত যোগ্যতা প্রয়োজন';
    }
    
    if (!formData.designation.trim()) {
      newErrors['designation'] = 'পদবী প্রয়োজন';
    }
    
    if (!formData.joiningDate) {
      newErrors['joiningDate'] = 'যোগদানের তারিখ প্রয়োজন';
    }

    if (formData.nid && !/^\d{10}$|^\d{13}$|^\d{17}$/.test(formData.nid)) {
      newErrors['nid'] = 'জাতীয় পরিচয়পত্র নম্বর ১০, ১৩ বা ১৭ ডিজিটের হতে হবে';
    }

    if (formData.passingYear && !/^\d{4}$/.test(formData.passingYear)) {
      newErrors['passingYear'] = 'পাসের বছর ৪ ডিজিটের হতে হবে';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setSubmitting(true);
      setServerError(null);
      const response = await api.post('/teachers', formData);
      onSuccess(response.data.data as TeacherRecord);
      toast.success(response.data.message || 'শিক্ষক সফলভাবে যুক্ত হয়েছে');
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        errors?: Record<string, string>;
      }>;

      if (axiosError.response?.status === 400 && axiosError.response.data?.errors) {
        const fieldErrors = axiosError.response.data.errors;
        setErrors(prev => ({ ...prev, ...fieldErrors }));
        setServerError(axiosError.response.data.message || 'তথ্য যাচাই করতে সমস্যা হয়েছে');
        return;
      }

      const message = axiosError.response?.data?.message || 'সার্ভার ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।';
      setServerError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">নতুন শিক্ষক নিবন্ধন</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {serverError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {serverError}
            </div>
          )}

          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">ব্যক্তিগত তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="শিক্ষকের নাম"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="শিক্ষকের পূর্ণ নাম লিখুন"
                required
                error={errors['teacherName']}
              />

              <InputField
                label="পিতার নাম"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="পিতার পূর্ণ নাম লিখুন"
                required
                error={errors['fatherName']}
              />

              <InputField
                label="মাতার নাম"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="মাতার পূর্ণ নাম লিখুন"
                required
                error={errors['motherName']}
              />

              <InputField
                label="স্বামী/স্ত্রীর নাম"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                placeholder="স্বামী/স্ত্রীর নাম (যদি থাকে)"
                error={errors['spouseName']}
              />

              <InputField
                label="জন্ম তারিখ"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
                error={errors['birthDate']}
              />

              <InputField
                label="রক্তের গ্রুপ"
                name="bloodGroup"
                type="select"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="রক্তের গ্রুপ নির্বাচন করুন"
                options={bloodGroups.map(group => ({ value: group, label: group }))}
                error={errors['bloodGroup']}
              />

              <InputField
                label="জাতীয় পরিচয়পত্র নম্বর"
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                placeholder="১০/১৩/১৭ ডিজিটের NID নম্বর"
                error={errors['nid']}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Phone className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">যোগাযোগের তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="মোবাইল নম্বর"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
                error={errors['phoneNumber']}
              />

              <InputField
                label="জরুরি যোগাযোগ"
                name="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="জরুরি অবস্থায় যোগাযোগের নম্বর"
                error={errors['emergencyContact']}
              />

              <InputField
                label="ইমেইল"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                error={errors['email']}
              />
            </div>

            <div className="space-y-4">
              <InputField
                label="বর্তমান ঠিকানা"
                name="currentAddress"
                type="textarea"
                value={formData.currentAddress}
                onChange={handleChange}
                placeholder="বর্তমান ঠিকানা বিস্তারিত লিখুন"
                rows={2}
                required
                error={errors['currentAddress']}
              />

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

              <InputField
                label="স্থায়ী ঠিকানা"
                name="permanentAddress"
                type="textarea"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="স্থায়ী ঠিকানা বিস্তারিত লিখুন"
                rows={2}
                error={errors['permanentAddress']}
              />
            </div>
          </div>

          {/* Educational Qualifications Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">শিক্ষাগত যোগ্যতা</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="শিক্ষাগত যোগ্যতা"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="যেমন: স্নাতক, স্নাতকোত্তর"
                required
                error={errors['education']}
              />

              <InputField
                label="বিষয়"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="যেমন: বাংলা, ইংরেজি, গণিত"
                error={errors['subject']}
              />

              <InputField
                label="বিশ্ববিদ্যালয়/প্রতিষ্ঠান"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="বিশ্ববিদ্যালয় বা প্রতিষ্ঠানের নাম"
                error={errors['university']}
              />

              <InputField
                label="পাসের বছর"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                placeholder="যেমন: 2020"
                error={errors['passingYear']}
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">অভিজ্ঞতা</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="মোট অভিজ্ঞতা"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="যেমন: ৫ বছর"
                error={errors['experience']}
              />

              <InputField
                label="পূর্ববর্তী প্রতিষ্ঠান"
                name="previousInstitution"
                value={formData.previousInstitution}
                onChange={handleChange}
                placeholder="পূর্ববর্তী কর্মস্থলের নাম"
                error={errors['previousInstitution']}
              />
            </div>
          </div>

          {/* Job Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">চাকরির তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="যোগদানের তারিখ"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                required
                error={errors['joiningDate']}
              />

              <InputField
                label="পদবী"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="যেমন: প্রধান শিক্ষক, সহকারী শিক্ষক"
                required
                error={errors['designation']}
              />

              <InputField
                label="বেতন"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="মাসিক বেতন"
                error={errors['salary']}
              />
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="pb-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">অতিরিক্ত তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="বিশেষ স্বাস্থ্য সমস্যা (যদি থাকে)"
                name="medicalConditions"
                type="textarea"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="কোন বিশেষ স্বাস্থ্য সমস্যা থাকলে লিখুন"
                rows={2}
                error={errors['medicalConditions']}
              />

              <InputField
                label="রেফারেন্স"
                name="references"
                type="textarea"
                value={formData.references}
                onChange={handleChange}
                placeholder="রেফারেন্সের তথ্য (নাম, পদবী, যোগাযোগ)"
                rows={2}
                error={errors['references']}
              />

              <InputField
                label="বিশেষ দক্ষতা"
                name="specialSkills"
                type="textarea"
                value={formData.specialSkills}
                onChange={handleChange}
                placeholder="বিশেষ কোন দক্ষতা বা যোগ্যতা"
                rows={2}
                error={errors['specialSkills']}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose} 
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              বাতিল
            </button>
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <UserPlus className="w-4 h-4 mr-2" /> 
              {submitting ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;