"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Clock,
  Send,
  Youtube,
} from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };
      console.log("Sending email with params:", templateParams);

      await emailjs.send(
        "service_3ejd3z9", // Your Service ID
        "template_ih17ibq", // Your Template ID
        templateParams,
        "WOeUS1toAdBwQoDid" // Your Public Key
      );


      alert("বার্তা সফলভাবে পাঠানো হয়েছে!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("বার্তা পাঠাতে ব্যর্থ হয়েছে। পরে চেষ্টা করুন।");
    }
  };

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
                <h1 className="text-2xl font-bold text-green-800">
                  দারুল হিকমাহ ইনস্টিটিউট
                </h1>
                <p className="text-sm text-gray-600">
                  DARUL HIKMAH INSTITUTE
                </p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-green-700">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-700">
                About
              </Link>
              <Link
                href="/contact"
                className="text-green-700 font-semibold hover:text-green-900"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">যোগাযোগ করুন</h2>
          <p className="text-xl max-w-2xl mx-auto">
            আমাদের সাথে যোগাযোগ করুন এবং আপনার সন্তানের ভবিষ্যৎ গড়ুন
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6">
                আমাদের সাথে যোগাযোগ করুন
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="আপনার নাম লিখুন"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="আপনার ইমেইল লিখুন"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="আপনার ফোন নম্বর"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">বিষয় নির্বাচন করুন</option>
                  <option value="admission">ভর্তি সংক্রান্ত</option>
                  <option value="info">তথ্য জানতে চাই</option>
                  <option value="complaint">অভিযোগ</option>
                  <option value="other">অন্যান্য</option>
                </select>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="আপনার বার্তা লিখুন..."
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>বার্তা পাঠান</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">
                  যোগাযোগের তথ্য
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700">ঠিকানা</h4>
                      <p className="text-gray-600">
                        শুভেচ্ছা ৩৬৪/বি (আবিদাবাদ)
                        <br />
                        শেখঘাট, সিলেট
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700">ফোন</h4>
                      <p className="text-gray-600">
                        +880 1318-043304
                        <br />
                        +880 1843-458020
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700">ইমেইল</h4>
                      <p className="text-gray-600">
                        darulhikmahinstituee.edu.bd@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Facebook className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700">
                        Facebook
                      </h4>
                      <p className="text-gray-600">
                        facebook.com/DarulHikmahInstituee.edu
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">
                  অফিস সময়
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">
                        সাপ্তাহিক দিন
                      </h4>
                      <p className="text-gray-600">
                        রবিবার - বৃহস্পতিবার: ৮:০০ - ১৭:০০
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">শুক্রবার</h4>
                      <p className="text-gray-600">
                        ৮:০০ - ১১:৩০ (জুমার নামাজের আগে)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-700">শনিবার</h4>
                      <p className="text-gray-600">বন্ধ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-8">
            আমাদের অবস্থান
          </h3>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d436.0250393786533!2d91.8576928038592!3d24.8894917140645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1754151512712!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">জরুরী যোগাযোগ</h3>
            <p className="mb-6">
              জরুরী প্রয়োজনে যে কোনো সময় যোগাযোগ করুন
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">প্রিন্সিপাল</p>
                <p>+880 1318-043304</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold">অফিস</p>
                <p>+880 1843-458020</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              দারুল হিকমাহ ইনস্টিটিউটে{" "}
              <span className="text-green-400">৩৫০ জন</span> ছাত্র নিবিড়
              তত্ত্বাবধানে অধ্যয়নরত রয়েছে
            </h2>
            <p className="text-gray-300 text-sm">
              দ্বীনি ও জাগতিক শিক্ষার সমন্বয়ে আধুনিক পাঠ্যক্রমে পরিচালিত একটি
              ন্যাশনাল ধর্মীয় দ্বীনি শিক্ষা প্রতিষ্ঠান
            </p>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-6 flex justify-center items-center">
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/DarulHikmahInstitute.edu"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors"
                target="_blank"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@DarulHikmahInstitute25"
                className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors"
                target="_blank"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
