'use client'
import React, { useState, useCallback } from 'react';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Users, 
  MapPin, 
  BookOpen, 
  UserCheck,
  Upload,
  FileText,
  Phone,
  Calendar,
  Home,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface FormDataType {
  profile: {
    fullName: string;
    dateOfBirth: string;
    bloodGroup: string;
    profilePicture: File | null;
  };
  guardianInfo: {
    fatherName: string;
    motherName: string;
    primaryGuardian: string;
    emergencyContact: string;
  };
  contactInfo: {
    phone: string;
    address: {
      current: string;
      permanent: string;
    };
  };
  academicInfo: {
    class: string;
    teacherName: string;
    previousEducation: string;
    admissionDate: string;
  };
  healthInfo: {
    medicalConditions: string;
    allergies: string;
  };
}

interface ErrorsType {
  [key: string]: string | null;
}

interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string | null;
  options?: { value: string; label: string }[];
  rows?: number;
}

// Move InputField component outside to prevent recreation
const InputField: React.FC<InputFieldProps> = ({
  label,
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          rows={rows}
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}
      {error && (
        <div className="flex items-center mt-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

const StudentRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    profile: {
      fullName: '',
      dateOfBirth: '',
      bloodGroup: '',
      profilePicture: null
    },
    guardianInfo: {
      fatherName: '',
      motherName: '',
      primaryGuardian: '',
      emergencyContact: ''
    },
    contactInfo: {
      phone: '',
      address: {
        current: '',
        permanent: ''
      }
    },
    academicInfo: {
      class: '',
      teacherName: '',
      previousEducation: '',
      admissionDate: new Date().toISOString().split('T')[0]
    },
    healthInfo: {
      medicalConditions: '',
      allergies: ''
    }
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [sameAddress, setSameAddress] = useState<boolean>(false);

  // Create stable update functions for each field
  const updateProfileField = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
    // Clear error
    const errorKey = `profile.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  }, [errors]);

  const updateGuardianField = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      guardianInfo: {
        ...prev.guardianInfo,
        [field]: value
      }
    }));
    // Clear error
    const errorKey = `guardianInfo.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  }, [errors]);

  const updateContactPhone = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        phone: value
      }
    }));
    // Clear error
    if (errors['contactInfo.phone']) {
      setErrors(prev => ({ ...prev, 'contactInfo.phone': null }));
    }
  }, [errors]);

  const updateAddressField = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        address: {
          ...prev.contactInfo.address,
          [field]: value
        }
      }
    }));
    // Clear error
    const errorKey = `address.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  }, [errors]);

  const updateAcademicField = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      academicInfo: {
        ...prev.academicInfo,
        [field]: value
      }
    }));
    // Clear error
    const errorKey = `academicInfo.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: null }));
    }
  }, [errors]);

  const updateHealthField = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      healthInfo: {
        ...prev.healthInfo,
        [field]: value
      }
    }));
  }, []);

  const handleSameAddressToggle = useCallback(() => {
    setSameAddress(prev => {
      const newValue = !prev;
      if (newValue) {
        setFormData(prevData => ({
          ...prevData,
          contactInfo: {
            ...prevData.contactInfo,
            address: {
              ...prevData.contactInfo.address,
              permanent: prevData.contactInfo.address.current
            }
          }
        }));
      }
      return newValue;
    });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ErrorsType = {};
    
    // Required field validation
    if (!formData.profile.fullName.trim()) {
      newErrors['profile.fullName'] = 'শিক্ষার্থীর নাম প্রয়োজন';
    }
    
    if (!formData.profile.dateOfBirth) {
      newErrors['profile.dateOfBirth'] = 'জন্ম তারিখ প্রয়োজন';
    }
    
    // Validate date of birth is not in future
    if (formData.profile.dateOfBirth) {
      const dateOfBirth = new Date(formData.profile.dateOfBirth);
      if (dateOfBirth > new Date()) {
        newErrors['profile.dateOfBirth'] = 'জন্ম তারিখ ভবিষ্যতের হতে পারে না';
      }
    }
    
    if (!formData.guardianInfo.fatherName.trim()) {
      newErrors['guardianInfo.fatherName'] = 'পিতার নাম প্রয়োজন';
    }
    
    if (!formData.guardianInfo.motherName.trim()) {
      newErrors['guardianInfo.motherName'] = 'মাতার নাম প্রয়োজন';
    }
    
    if (!formData.guardianInfo.primaryGuardian.trim()) {
      newErrors['guardianInfo.primaryGuardian'] = 'অভিভাবকের নাম প্রয়োজন';
    }
    
    if (!formData.contactInfo.phone.trim()) {
      newErrors['contactInfo.phone'] = 'ফোন নম্বর প্রয়োজন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.contactInfo.phone.replace(/\s/g, ''))) {
      newErrors['contactInfo.phone'] = 'সঠিক ফোন নম্বর দিন (01XXXXXXXXX)';
    }
    
    if (!formData.contactInfo.address.current.trim()) {
      newErrors['address.current'] = 'বর্তমান ঠিকানা প্রয়োজন';
    }
    
    if (!formData.contactInfo.address.permanent.trim()) {
      newErrors['address.permanent'] = 'স্থায়ী ঠিকানা প্রয়োজন';
    }
    
    if (!formData.academicInfo.class) {
      newErrors['academicInfo.class'] = 'ক্লাস নির্বাচন প্রয়োজন';
    }
    
    if (!formData.academicInfo.teacherName.trim()) {
      newErrors['academicInfo.teacherName'] = 'জিম্মাদার উস্তাজের নাম প্রয়োজন';
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

    setLoading(true);
    
    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        // Clean phone number
        contactInfo: {
          ...formData.contactInfo,
          phone: formData.contactInfo.phone.replace(/\s/g, '')
        }
      };

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }

      console.log('Student registered successfully:', result);
      setShowSuccessModal(true);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific error types
      if (error.message.includes('duplicate') || error.message.includes('already exists')) {
        alert('এই নামে একজন শিক্ষার্থী ইতিমধ্যে নিবন্ধিত আছে।');
      } else if (error.message.includes('validation')) {
        alert('দয়া করে সকল তথ্য সঠিকভাবে পূরণ করুন।');
      } else {
        alert(error.message || 'নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      profile: {
        fullName: '',
        dateOfBirth: '',
        bloodGroup: '',
        profilePicture: null
      },
      guardianInfo: {
        fatherName: '',
        motherName: '',
        primaryGuardian: '',
        emergencyContact: ''
      },
      contactInfo: {
        phone: '',
        address: {
          current: '',
          permanent: ''
        }
      },
      academicInfo: {
        class: '',
        teacherName: '',
        previousEducation: '',
        admissionDate: new Date().toISOString().split('T')[0]
      },
      healthInfo: {
        medicalConditions: '',
        allergies: ''
      }
    });
    setErrors({});
    setSameAddress(false);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log('Navigate to dashboard');
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
            <p className="text-gray-600 mb-6">নতুন শিক্ষার্থী সফলভাবে নিবন্ধিত হয়েছে।</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                নতুন শিক্ষার্থী যোগ করুন
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
                <h1 className="text-2xl font-bold text-gray-800">নতুন শিক্ষার্থী নিবন্ধন</h1>
                <p className="text-gray-600">দারুল হিকমাহ ইনস্টিটিউট</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">আজকের তারিখ</p>
              <p className="font-semibold text-gray-800">
                {new Date().toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">ব্যক্তিগত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="শিক্ষার্থীর নাম"
                  value={formData.profile.fullName}
                  onChange={(value) => updateProfileField('fullName', value)}
                  placeholder="শিক্ষার্থীর পূর্ণ নাম লিখুন"
                  required
                  error={errors['profile.fullName']}
                />

                <InputField
                  label="জন্ম তারিখ"
                  type="date"
                  value={formData.profile.dateOfBirth}
                  onChange={(value) => updateProfileField('dateOfBirth', value)}
                  required
                  error={errors['profile.dateOfBirth']}
                />

                <InputField
                  label="রক্তের গ্রুপ"
                  type="select"
                  value={formData.profile.bloodGroup}
                  onChange={(value) => updateProfileField('bloodGroup', value)}
                  placeholder="রক্তের গ্রুপ নির্বাচন করুন"
                  options={bloodGroups.map(group => ({ value: group, label: group }))}
                />
              </div>
            </div>

            {/* Guardian Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">অভিভাবকের তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="পিতার নাম"
                  value={formData.guardianInfo.fatherName}
                  onChange={(value) => updateGuardianField('fatherName', value)}
                  placeholder="পিতার পূর্ণ নাম লিখুন"
                  required
                  error={errors['guardianInfo.fatherName']}
                />

                <InputField
                  label="মাতার নাম"
                  value={formData.guardianInfo.motherName}
                  onChange={(value) => updateGuardianField('motherName', value)}
                  placeholder="মাতার পূর্ণ নাম লিখুন"
                  required
                  error={errors['guardianInfo.motherName']}
                />

                <InputField
                  label="অভিভাবকের নাম"
                  value={formData.guardianInfo.primaryGuardian}
                  onChange={(value) => updateGuardianField('primaryGuardian', value)}
                  placeholder="অভিভাবকের পূর্ণ নাম লিখুন"
                  required
                  error={errors['guardianInfo.primaryGuardian']}
                />

                <InputField
                  label="জরুরি যোগাযোগ"
                  type="tel"
                  value={formData.guardianInfo.emergencyContact}
                  onChange={(value) => updateGuardianField('emergencyContact', value)}
                  placeholder="জরুরি অবস্থায় যোগাযোগের নম্বর"
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">যোগাযোগের তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="ফোন নম্বর"
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={updateContactPhone}
                  placeholder="01XXXXXXXXX"
                  required
                  error={errors['contactInfo.phone']}
                />
              </div>

              <div className="space-y-4">
                <InputField
                  label="বর্তমান ঠিকানা"
                  type="textarea"
                  value={formData.contactInfo.address.current}
                  onChange={(value) => updateAddressField('current', value)}
                  placeholder="বর্তমান ঠিকানা বিস্তারিত লিখুন"
                  rows={3}
                  required
                  error={errors['address.current']}
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
                  type="textarea"
                  value={formData.contactInfo.address.permanent}
                  onChange={(value) => updateAddressField('permanent', value)}
                  placeholder="স্থায়ী ঠিকানা বিস্তারিত লিখুন"
                  rows={3}
                  required
                  error={errors['address.permanent']}
                />
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">শিক্ষাগত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="ক্লাস নির্বাচন"
                  type="select"
                  value={formData.academicInfo.class}
                  onChange={(value) => updateAcademicField('class', value)}
                  placeholder="ক্লাস নির্বাচন করুন"
                  options={classOptions}
                  required
                  error={errors['academicInfo.class']}
                />

                <InputField
                  label="জিম্মাদার উস্তাজের নাম"
                  value={formData.academicInfo.teacherName}
                  onChange={(value) => updateAcademicField('teacherName', value)}
                  placeholder="জিম্মাদার উস্তাজের নাম লিখুন"
                  required
                  error={errors['academicInfo.teacherName']}
                />

                <InputField
                  label="ভর্তির তারিখ"
                  type="date"
                  value={formData.academicInfo.admissionDate}
                  onChange={(value) => updateAcademicField('admissionDate', value)}
                />

                <InputField
                  label="পূর্ববর্তী শিক্ষা প্রতিষ্ঠান"
                  value={formData.academicInfo.previousEducation}
                  onChange={(value) => updateAcademicField('previousEducation', value)}
                  placeholder="পূর্ববর্তী শিক্ষা প্রতিষ্ঠানের নাম (যদি থাকে)"
                />
              </div>
            </div>

            {/* Health Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">স্বাস্থ্য সংক্রান্ত তথ্য</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="বিশেষ স্বাস্থ্য সমস্যা (যদি থাকে)"
                  type="textarea"
                  value={formData.healthInfo.medicalConditions}
                  onChange={(value) => updateHealthField('medicalConditions', value)}
                  placeholder="কোন বিশেষ স্বাস্থ্য সমস্যা থাকলে লিখুন"
                  rows={3}
                />

                <InputField
                  label="অ্যালার্জি (যদি থাকে)"
                  type="textarea"
                  value={formData.healthInfo.allergies}
                  onChange={(value) => updateHealthField('allergies', value)}
                  placeholder="কোন অ্যালার্জি থাকলে লিখুন"
                  rows={3}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    নিবন্ধন করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    নিবন্ধন সংরক্ষণ করুন
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal />
    </div>
  );
};

export default StudentRegistrationForm;