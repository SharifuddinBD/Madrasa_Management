"use client";
import React, { useState, useCallback } from "react";
import {
  X,
  UserPlus,
  User,
  Users,
  Phone,
  BookOpen,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import api from "@/lib/api";

export interface StudentPayload {
  fullName: string;
  dateOfBirth: string;
  bloodGroup: string;
  
  // Guardian Information
  fatherName: string;
  motherName: string;
  primaryGuardian: string;
  emergencyContact: string;
  
  // Contact Information
  phone: string;
  currentAddress: string;
  permanentAddress: string;
  
  // Academic Information
  className: string;
  teacherName: string;
  previousEducation: string;
  admissionDate: string;
  
  // Health Information
  medicalConditions: string;
  allergies: string;
}

export interface StudentRecord extends StudentPayload {
  _id: string;
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
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
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
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
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
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm ${
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

const StudentModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (student: StudentRecord) => void;
}) => {
  const [formData, setFormData] = useState<StudentPayload>({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    bloodGroup: '',
    
    // Guardian Information
    fatherName: '',
    motherName: '',
    primaryGuardian: '',
    emergencyContact: '',
    
    // Contact Information
    phone: '',
    currentAddress: '',
    permanentAddress: '',
    
    // Academic Information
    className: '',
    teacherName: '',
    previousEducation: '',
    admissionDate: new Date().toISOString().split('T')[0],
    
    // Health Information
    medicalConditions: '',
    allergies: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
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
    
    // Required field validation
    if (!formData.fullName.trim()) {
      newErrors['fullName'] = 'শিক্ষার্থীর নাম প্রয়োজন';
    }
    
    if (!formData.dateOfBirth) {
      newErrors['dateOfBirth'] = 'জন্ম তারিখ প্রয়োজন';
    }
    
    // Validate date of birth is not in future
    if (formData.dateOfBirth) {
      const dateOfBirth = new Date(formData.dateOfBirth);
      if (dateOfBirth > new Date()) {
        newErrors['dateOfBirth'] = 'জন্ম তারিখ ভবিষ্যতের হতে পারে না';
      }
    }
    
    if (!formData.fatherName.trim()) {
      newErrors['fatherName'] = 'পিতার নাম প্রয়োজন';
    }
    
    if (!formData.motherName.trim()) {
      newErrors['motherName'] = 'মাতার নাম প্রয়োজন';
    }
    
    if (!formData.primaryGuardian.trim()) {
      newErrors['primaryGuardian'] = 'অভিভাবকের নাম প্রয়োজন';
    }
    
    if (!formData.phone.trim()) {
      newErrors['phone'] = 'ফোন নম্বর প্রয়োজন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors['phone'] = 'সঠিক ফোন নম্বর দিন (01XXXXXXXXX)';
    }
    
    if (!formData.currentAddress.trim()) {
      newErrors['currentAddress'] = 'বর্তমান ঠিকানা প্রয়োজন';
    }
    
    if (!formData.permanentAddress.trim()) {
      newErrors['permanentAddress'] = 'স্থায়ী ঠিকানা প্রয়োজন';
    }
    
    if (!formData.className) {
      newErrors['className'] = 'ক্লাস নির্বাচন প্রয়োজন';
    }
    
    if (!formData.teacherName.trim()) {
      newErrors['teacherName'] = 'জিম্মাদার উস্তাজের নাম প্রয়োজন';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setSubmitting(true);
      setServerError(null);
      const response = await api.post('/students', formData);
      onSuccess(response.data.data as StudentRecord);
      toast.success(response.data.message || 'শিক্ষার্থী সফলভাবে যুক্ত হয়েছে');
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

  const classOptions = [
    { value: 'madani-first', label: 'মাদানি নেসাব প্রথম বর্ষ' },
    { value: 'madani-second', label: 'মাদানি নেসাব দ্বিতীয় বর্ষ' },
    { value: 'hifz-beginner', label: 'হিফয (প্রাথমিক)' },
    { value: 'hifz-intermediate', label: 'হিফয (মাধ্যমিক)' },
    { value: 'hifz-advanced', label: 'হিফয (উন্নত)' },
    { value: 'nazera', label: 'নাজেরা' },
    { value: 'qaida', label: 'কায়দা' }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">নতুন শিক্ষার্থী নিবন্ধন</h3>
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
              <User className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">ব্যক্তিগত তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="শিক্ষার্থীর নাম"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="শিক্ষার্থীর পূর্ণ নাম লিখুন"
                required
                error={errors['fullName']}
              />

              <InputField
                label="জন্ম তারিখ"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                error={errors['dateOfBirth']}
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
            </div>
          </div>

          {/* Guardian Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">অভিভাবকের তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                label="অভিভাবকের নাম"
                name="primaryGuardian"
                value={formData.primaryGuardian}
                onChange={handleChange}
                placeholder="অভিভাবকের পূর্ণ নাম লিখুন"
                required
                error={errors['primaryGuardian']}
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
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <Phone className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">যোগাযোগের তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="ফোন নম্বর"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
                error={errors['phone']}
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
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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
                required
                error={errors['permanentAddress']}
              />
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <BookOpen className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">শিক্ষাগত তথ্য</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="ক্লাস নির্বাচন"
                name="className"
                type="select"
                value={formData.className}
                onChange={handleChange}
                placeholder="ক্লাস নির্বাচন করুন"
                options={classOptions}
                required
                error={errors['className']}
              />

              <InputField
                label="জিম্মাদার উস্তাজের নাম"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="জিম্মাদার উস্তাজের নাম লিখুন"
                required
                error={errors['teacherName']}
              />

              <InputField
                label="ভর্তির তারিখ"
                name="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={handleChange}
                error={errors['admissionDate']}
              />

              <InputField
                label="পূর্ববর্তী শিক্ষা প্রতিষ্ঠান"
                name="previousEducation"
                value={formData.previousEducation}
                onChange={handleChange}
                placeholder="পূর্ববর্তী শিক্ষা প্রতিষ্ঠানের নাম (যদি থাকে)"
                error={errors['previousEducation']}
              />
            </div>
          </div>

          {/* Health Information Section */}
          <div className="pb-6">
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-800">স্বাস্থ্য সংক্রান্ত তথ্য</h4>
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
                label="অ্যালার্জি (যদি থাকে)"
                name="allergies"
                type="textarea"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="কোন অ্যালার্জি থাকলে লিখুন"
                rows={2}
                error={errors['allergies']}
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
              className={`px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center transition-colors ${
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

export default StudentModal;