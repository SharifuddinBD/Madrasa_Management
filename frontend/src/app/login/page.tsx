'use client'

import { useState } from 'react';
import { demoUsers, demoStudent } from '../lib/mockData';
import { Eye, EyeOff, User, Lock, UserCircle, Users, BookOpen, Shield } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<'principal' | 'teacher' | 'guardian'>('principal')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let user;

  
     
      user = demoUsers.find(
        u => (u.username === formData.username || u.email === formData.username) &&
             u.password === formData.password &&
             u.role === loginType
      );
  

    if (user) {
      const { password, ...userToStore } = user;
      const userData = {
        ...userToStore,
        loginTime: new Date().toISOString(),
        remember: formData.remember,
      };

      localStorage.setItem('userAuth', JSON.stringify(userData));

      // Redirect based on user type
      switch (user.role) {
        case 'principal':
          window.location.href = '/dashboard-principal';
          break;
        case 'teacher':
          window.location.href = '/dashboard-teacher';
          break;
        case 'guardian':
          window.location.href = '/dashboard-guardian';
          break;
        default:
          window.location.href = '/'; // Fallback redirect
      }
    } else {
      setError('ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড!');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }



  const getLoginTypeInfo = () => {
    switch(loginType) {
      case 'principal':
        return {
          title: 'প্রিন্সিপাল',
          placeholder: 'demo@gmail.com',
          description: 'আপনার প্রশাসনিক প্যানেলে প্রবেশ করুন',
          features: ['শিক্ষার্থীদের তথ্য দেখুন', 'পরীক্ষার ফলাফল পরিচালনা করুন', 'শিক্ষক ও কর্মচারী তথ্য', 'আর্থিক রিপোর্ট']
        }
      case 'teacher':
        return {
          title: 'শিক্ষক',
          placeholder: 'teacher001',
          description: 'আপনার শিক্ষক প্যানেলে প্রবেশ করুন',
          features: ['ক্লাসের তথ্য দেখুন', 'পরীক্ষার ফলাফল দিন', 'উপস্থিতি নিন', 'অ্যাসাইনমেন্ট দিন']
        }
      case 'guardian':
        return {
          title: 'অভিভাবক',
          placeholder: 'শিক্ষার্থীর আইডি নম্বর',
          description: 'আপনার সন্তানের তথ্য দেখুন',
          features: ['পরীক্ষার ফলাফল', 'উপস্থিতির তথ্য', 'ফি পেমেন্ট স্ট্যাটাস', 'শিক্ষকের মন্তব্য']
        }
    }
  }

  const loginTypeInfo = getLoginTypeInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">دار</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">দারুল হিকমাহ ইনস্টিটিউট</h1>
                <p className="text-sm text-gray-600">DARUL HIKMAH INSTITUTE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-green-700">Home</a>
              <a href="/about" className="text-gray-700 hover:text-green-700">About</a>
              <a href="/contact" className="text-gray-700 hover:text-green-700">Contact</a>
              <a href="/login" className="text-green-700 font-semibold hover:text-green-900">Login</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-green-800">লগইন করুন</h2>
                <p className="text-gray-600 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>

              {/* Login Type Selection */}
              <div className="mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setLoginType('principal')}
                    className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-1 ${
                      loginType === 'principal'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <Shield className="h-3 w-3" />
                    <span>প্রিন্সিপাল</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('teacher')}
                    className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-1 ${
                      loginType === 'teacher'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>শিক্ষক</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('guardian')}
                    className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center space-x-1 ${
                      loginType === 'guardian'
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <Users className="h-3 w-3" />
                    <span>অভিভাবক</span>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginType === 'principal' ? 'ইমেইল/ব্যবহারকারীর নাম' : 
                     loginType === 'teacher' ? 'শিক্ষক আইডি' : 
                     'শিক্ষার্থীর আইডি'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={loginTypeInfo.placeholder}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="আপনার পাসওয়ার্ড"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-gray-700">মনে রাখুন</span>
                  </label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-700">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      লগইন হচ্ছে...
                    </>
                  ) : (
                    'লগইন করুন'
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    {loginTypeInfo.title} লগইন
                  </p>
                  <div className={`p-4 rounded-lg ${
                    loginType === 'principal' ? 'bg-blue-50' :
                    loginType === 'teacher' ? 'bg-purple-50' :
                    'bg-green-50'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${
                      loginType === 'principal' ? 'text-blue-800' :
                      loginType === 'teacher' ? 'text-purple-800' :
                      'text-green-800'
                    }`}>
                      <strong>{loginTypeInfo.title}:</strong> {loginTypeInfo.description}
                    </p>
                    <ul className={`text-xs space-y-1 ${
                      loginType === 'principal' ? 'text-blue-700' :
                      loginType === 'teacher' ? 'text-purple-700' :
                      'text-green-700'
                    }`}>
                      {loginTypeInfo.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  সাহায্য প্রয়োজন? 
                  <a href="/contact" className="text-green-600 hover:text-green-700 ml-1">
                    যোগাযোগ করুন
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 দারুল হিকমাহ ইনস্টিটিউট. All rights reserved.</p>
            <p className="mt-2 text-gray-400">True Guidance Project - একটি প্রতিষ্ঠান</p>
          </div>
        </div>
      </footer>
    </div>
  )
}