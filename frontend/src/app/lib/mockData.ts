export const demoUsers = [
  {
    _id: '60d21b4667d0d8992e610c85',
    username: 'principal@dhikmah.edu',
    email: 'principal@dhikmah.edu',
    password: 'admin123',
    role: 'principal',
    profile: {
      fullName: 'Dr. Abdullah Rahman',
      fullNameBangla: 'ড. আব্দুল্লাহ রহমান',
      phone: '01712345678',
      address: '123, Admin Road, Dhaka'
    },
    isActive: true
  },
  {
    _id: '60d21b4667d0d8992e610c86',
    username: 'teacher001',
    email: 'teacher001@dhikmah.edu',
    password: 'teach123',
    role: 'teacher',
    profile: {
      fullName: 'Fatima Ahmed',
      fullNameBangla: 'ফাতেমা আহমেদ',
      phone: '01812345679',
      address: '456, Teacher Lane, Dhaka'
    },
    isActive: true
  },
  {
    _id: '60d21b4667d0d8992e610c87',
    username: 'guardian001',
    email: 'guardian001@dhikmah.edu',
    password: 'parent123',
    role: 'guardian',
    profile: {
      fullName: 'Kamal Hossain',
      fullNameBangla: 'কামাল হোসেন',
      phone: '01912345680',
      address: '789, Parent Street, Dhaka'
    },
    isActive: true
  }
];

export const demoStudent = {
  _id: '60d21b4667d0d8992e610c88',
  studentId: 'DHI-001',
  guardianInfo: {
    primaryGuardian: '60d21b4667d0d8992e610c87' // Corresponds to Kamal Hossain
  }
};
