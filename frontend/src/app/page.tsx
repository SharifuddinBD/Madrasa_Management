'use client';

import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  BookOpen,
  Users,
  Award,
  Clock,
  Youtube,
} from 'lucide-react';
import FacebookFeed from './components/FacebookFeed'; // Make sure this component exists

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-700 rounded-full flex items-center justify-center">
                <img
                  src="/images/madrashalogo.svg"
                  alt="Darul Hikmah Institute Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">
                  দারুল হিকমাহ ইনস্টিটিউট
                </h1>
                <p className="text-sm text-gray-600">DARUL HIKMAH INSTITUTE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-green-700 font-semibold hover:text-green-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-700">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-700">
                Contact
              </Link>
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">দারুল হিকমাহ ইনস্টিটিউট</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            দ্বীনি ও জাগতিক শিক্ষার সমন্বয়ে আধুনিক পাঠ্যক্রমে পরিচালিত একটি ন্যাশনাল ধর্মীয় দ্বীনি শিক্ষা প্রতিষ্ঠান
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/about" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Learn More
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">আমাদের বৈশিষ্ট্যসমূহ</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<BookOpen />} title="হিফজুল কোরআন" desc="সহজ ও আধুনিক পদ্ধতিতে পবিত্র কোরআন মুখস্থ করানো হয়।" />
            <FeatureCard icon={<Users />} title="নাযেরা" desc="কোরআন শুদ্ধভাবে পড়া শেখানো হয়।" />
            <FeatureCard icon={<Award />} title="মাদানী নেসাব" desc="ইসলামী শিক্ষার সাথে সাথে আধুনিক শিক্ষাও প্রদান করা হয়।" />
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">কোর্স বিবরণ</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <CourseCard title="হিফজুল কোরআন ও নাযেরা বিভাগের বৈশিষ্ট্যাবলী:" items={[
              "• অনারভিত্তিক ও নিজস্ব পরিবেশে ব্যবস্থা",
              "• প্রতি ১০/১২ জন ছাত্রের জন্য একজন অভিজ্ঞ ও প্রশিক্ষণপ্রাপ্ত শিক্ষকের দ্বারা নিয়মিত তত্ত্বাবধান",
              "• হিফজের সাথে সাথে সাধারণ শিক্ষা প্রদান",
              "• বিশেষ পরিচর্যা প্রাপ্ত ইয়াতিম শিক্ষার্থীদের জন্য বিশেষ ব্যবস্থা"
            ]} />
            <CourseCard title="কিতাব বিভাগের বৈশিষ্ট্যাবলী:" items={[
              "• জেনারেল শিক্ষা ও মাদানী নেসাব সমন্বিত পাঠ্যক্রম",
              "• প্রথম বর্ষেই শিক্ষার্থীদের আরবি প্রবন্ধ লেখা, আরবি বক্তৃতা ও কিতাব বোঝার যোগ্যতা অর্জন",
              "• দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা যুগ সহকারে পাঠদান",
              "• আধুনিক সিলেবাস-সিলেবাস ও পথনির্দেশ মাধ্যমে আরবি ব্যাকরণ শিক্ষা"
            ]} />
          </div>
        </div>
      </section>

      {/* Admission Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4">ভর্তি বিজ্ঞপ্তি</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <AdmissionCard title="হিফজুল কোরআন বিভাগ" date="২৫শে শাবান ১৪৪৬ হি. / ২৫শে ফেব্রুয়ারি ২০২৫ হি. শনিবার থেকে" />
              <AdmissionCard title="কিতাব বিভাগ" date="৮ই শাওয়াল ১৪৪৬ হি. / ৭ই এপ্রিল ২০২৫ হি. সোমবার থেকে" color="#065084" />
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Feed */}
      <FacebookFeed />

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
  );
}

// ✅ Subcomponents for cleaner JSX
function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 text-green-600 mx-auto mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-green-800 mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function CourseCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h4 className="text-2xl font-semibold text-green-800 mb-4">{title}</h4>
      <ul className="space-y-3 text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AdmissionCard({ title, date, color = 'black' }: { title: string; date: string; color?: string }) {
  return (
    <div className={`bg-[${color}] bg-opacity-20 p-4 rounded-lg`}>
      <p className="font-semibold">{title}</p>
      <p>{date}</p>
    </div>
  );
}
