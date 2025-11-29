import Link from 'next/link'
import { MapPin, Users, GraduationCap, BookOpen, Award, Youtube, Facebook } from 'lucide-react'

export default function About() {
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
              <Link href="/" className="text-gray-700 hover:text-green-700">Home</Link>
              <Link href="/about" className="text-green-700 font-semibold hover:text-green-900">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-700">Contact</Link>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">আমাদের সম্পর্কে</h2>
          <p className="text-xl max-w-2xl mx-auto">
            দারুল হিকমাহ ইনস্টিটিউট - একটি আধুনিক ইসলামী শিক্ষা প্রতিষ্ঠান
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-800">প্রতিষ্ঠানের অবস্থান</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-4">ঠিকানা</h4>
                <p className="text-gray-700 mb-4">
                  শুভেচ্ছা ৩৬৪/বি (আবিদাবাদ), শেখঘাট, সিলেট
                </p>
                <p className="text-gray-600">
                  আমাদের প্রতিষ্ঠানটি সিলেট শহরের কেন্দ্রস্থলে অবস্থিত, যা শিক্ষার্থীদের জন্য সহজলভ্য এবং নিরাপদ পরিবেশ প্রদান করে।
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-700 mb-4">সুবিধাসমূহ</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• শান্ত ও নিরিবিলি পরিবেশ</li>
                  <li>• আধুনিক শিক্ষা উপকরণ</li>
                  <li>• বিশাল গ্রন্থাগার</li>
                  <li>• প্রশস্ত শ্রেণীকক্ষ</li>
                  <li>• নিরাপদ পরিবহন ব্যবস্থা</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-800">প্রিন্সিপাল</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="col-span-1">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">মাওলানা</span>
                </div>
              </div>
              <div className="col-span-2">
                <h4 className="text-xl font-semibold text-green-700 mb-4">জুবায়ের আলম সরকার</h4>
                <p className="text-gray-700 mb-4">
                  দারুল হিকমাহ ইনস্টিটিউটের প্রিন্সিপাল হিসেবে দায়িত্ব পালন করছেন। তিনি ৫ ছরের অভিজ্ঞতা নিয়ে আমাদের প্রতিষ্ঠানে শিক্ষার্থীদের সঠিক দিকনির্দেশনা প্রদান করছেন।
                </p>
                <div className="space-y-2">
                  <p><strong>শিক্ষাগত যোগ্যতা:</strong> দাওরায়ে হাদিস, এম.এ (ইসলামিক স্টাডিজ)</p>
                  <p><strong>অভিজ্ঞতা:</strong> ৫+ বছর শিক্ষকতা ও প্রশাসনিক দায়িত্ব</p>
                  <p><strong>বিশেষত্ব:</strong> কোরআন ও হাদিস শিক্ষা, ইসলামী আইন</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-800">শিক্ষকমণ্ডলী</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">আ.ক</span>
                </div>
                <h4 className="font-semibold text-green-700">আবদুল করিম</h4>
                <p className="text-sm text-gray-600">হিফজ বিভাগের প্রধান</p>
                <p className="text-sm mt-2">১৫ বছর অভিজ্ঞতা</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">ম.র</span>
                </div>
                <h4 className="font-semibold text-green-700">মোহাম্মদ রহিম</h4>
                <p className="text-sm text-gray-600">নাহেরা বিভাগের প্রধান</p>
                <p className="text-sm mt-2">১২ বছর অভিজ্ঞতা</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">আ.স</span>
                </div>
                <h4 className="font-semibold text-green-700">আবুল সালাম</h4>
                <p className="text-sm text-gray-600">কিতাব বিভাগের প্রধান</p>
                <p className="text-sm mt-2">১৮ বছর অভিজ্ঞতা</p>
              </div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-4">শিক্ষকদের যোগ্যতা</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• দাওরায়ে হাদিস সম্পন্ন</li>
                  <li>• বিশেষায়িত কোর্স সম্পন্ন</li>
                  <li>• ন্যূনতম ৫ বছর অভিজ্ঞতা</li>
                  <li>• নিয়মিত প্রশিক্ষণপ্রাপ্ত</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-4">মোট শিক্ষক সংখ্যা</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-green-100 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">১৫</p>
                    <p className="text-sm text-gray-600">সর্বমোট শিক্ষক</p>
                  </div>
                  <div className="text-center bg-green-100 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">৮</p>
                    <p className="text-sm text-gray-600">হাফেজ শিক্ষক</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-800">শিক্ষার্থী পরিসংখ্যান</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center bg-green-100 p-6 rounded-lg">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-green-600">৩৫০</p>
                <p className="text-sm text-gray-600">মোট শিক্ষার্থী</p>
              </div>
              <div className="text-center bg-blue-100 p-6 rounded-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-blue-600">১৫০</p>
                <p className="text-sm text-gray-600">হিফজ বিভাগ</p>
              </div>
              <div className="text-center bg-yellow-100 p-6 rounded-lg">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-yellow-600">১০০</p>
                <p className="text-sm text-gray-600">নাযেরা বিভাগ</p>
              </div>
              <div className="text-center bg-purple-100 p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-purple-600">১০০</p>
                <p className="text-sm text-gray-600">কিতাব বিভাগ</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-4">শিক্ষার্থীদের সুবিধা</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• বিনামূল্যে শিক্ষা</li>
                  <li>• বৃত্তি প্রদান</li>
                  <li>• পুষ্টিকর খাবার</li>
                  <li>• স্বাস্থ্যসেবা</li>
                  <li>• পরিবহন সুবিধা</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-4">শিক্ষার্থীদের অর্জন</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• ৯৮% সফলতার হার</li>
                  <li>• জাতীয় পর্যায়ে পুরস্কার</li>
                  <li>• কোরআন তিলাওয়াত প্রতিযোগিতায় বিজয়</li>
                  <li>• উচ্চ শিক্ষায় ভর্তি</li>
                  <li>• সমাজসেবায় অংশগ্রহণ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
                দারুল হিকমাহ ইনস্টিটিউটে <span className="text-green-400">৩৫০ জন</span> ছাত্র নিবিড় তত্ত্বাবধানে অধ্যয়নরত রয়েছে
            </h2>
            <p className="text-gray-300 text-sm">
                দ্বীনি ও জাগতিক শিক্ষার সমন্বয়ে আধুনিক পাঠ্যক্রমে পরিচালিত একটি ন্যাশনাল ধর্মীয় দ্বীনি শিক্ষা প্রতিষ্ঠান
            </p>
        </div>


          {/* Footer Bottom */}
         <div className="border-t border-gray-700 pt-6 flex justify-center items-center">
          <div className="flex space-x-3">
            <a href="https://www.facebook.com/DarulHikmahInstitute.edu" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors" target='_blank'>
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@DarulHikmahInstitute25" className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors" target='_blank'>
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </footer>
    </div>
  )
}