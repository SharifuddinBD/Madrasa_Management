"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("principal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [madrashaName, setMadrashaName] = useState("");
  const [madrashaId, setMadrashaId] = useState("");
  const [principalId, setPrincipalId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // TODO: Replace with actual registration logic
    console.log("Registering user:", {
      role,
      email,
      password,
      madrashaName,
      madrashaId,
      ...(role === "principal" && { principalId }),
      ...(role === "guardian" && { 
        studentName, 
        studentClass, 
        guardianName, 
        phoneNumber 
      }),
    });

    // Redirect to OTP verification page
    router.push("/otp-verification");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          🕌 Madrasha Management Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role Selection */}
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              className={`w-1/2 py-3 rounded-lg font-medium transition-all ${
                role === "principal"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setRole("principal")}
            >
              👨‍🏫 Principal
            </button>
            <button
              type="button"
              className={`w-1/2 py-3 rounded-lg font-medium transition-all ${
                role === "guardian"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setRole("guardian")}
            >
              👨‍👩‍👧‍👦 Guardian
            </button>
          </div>

          {/* Role Description */}
          <div className={`p-3 rounded-lg mb-4 ${
            role === "principal" 
              ? "bg-green-50 border border-green-200" 
              : "bg-blue-50 border border-blue-200"
          }`}>
            <p className={`text-sm ${
              role === "principal" ? "text-green-700" : "text-blue-700"
            }`}>
              {role === "principal" 
                ? "🎓 Register as Principal to manage your madrasha, students, and staff"
                : "👨‍👩‍👧‍👦 Register as Guardian to monitor your child's progress and activities"
              }
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              placeholder="Confirm your password"
              minLength={6}
            />
          </div>

          {/* Madrasha Name */}
          <div>
            <label htmlFor="madrashaName" className="block text-sm font-medium text-gray-700">
              Madrasha Name
            </label>
            <input
              id="madrashaName"
              type="text"
              required
              value={madrashaName}
              onChange={(e) => setMadrashaName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              placeholder="Enter madrasha name"
            />
          </div>

          {/* Madrasha ID */}
          <div>
            <label htmlFor="madrashaId" className="block text-sm font-medium text-gray-700">
              Madrasha ID
            </label>
            <input
              id="madrashaId"
              type="text"
              required
              value={madrashaId}
              onChange={(e) => setMadrashaId(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
              placeholder="Enter madrasha ID"
            />
          </div>

          {/* Principal Specific Fields */}
          {role === "principal" && (
            <div>
              <label htmlFor="principalId" className="block text-sm font-medium text-gray-700">
                Principal ID
              </label>
              <input
                id="principalId"
                type="text"
                required
                value={principalId}
                onChange={(e) => setPrincipalId(e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600"
                placeholder="Enter your principal ID"
              />
            </div>
          )}

          {/* Guardian Specific Fields */}
          {role === "guardian" && (
            <>
              <div>
                <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
                  Guardian Name
                </label>
                <input
                  id="guardianName"
                  type="text"
                  required
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                  placeholder="Enter your child's name"
                />
              </div>

              <div>
                <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700">
                  Student Class
                </label>
                <select
                  id="studentClass"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="">Select class</option>
                  <option value="Hifz-1">Hifz-1</option>
                  <option value="Hifz-2">Hifz-2</option>
                  <option value="Hifz-3">Hifz-3</option>
                  <option value="Alim-1">Alim-1</option>
                  <option value="Alim-2">Alim-2</option>
                  <option value="Alim-3">Alim-3</option>
                  <option value="Fazil-1">Fazil-1</option>
                  <option value="Fazil-2">Fazil-2</option>
                  <option value="Kamil">Kamil</option>
                </select>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              role === "principal"
                ? "bg-green-700 hover:bg-green-800 text-white"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            {role === "principal" ? "Register as Principal" : "Register as Guardian"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-700 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </main>
  );
}