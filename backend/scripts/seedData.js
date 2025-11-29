const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Student = require('../models/Student');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🍃 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    console.log('🗑️  Cleared existing users');

    // Create demo users
    const users = [
      {
        username: 'principal@dhikmah.edu',
        email: 'principal@dhikmah.edu',
        password: 'admin123',
        role: 'principal',
        profile: {
          fullName: 'Dr. Mohammad Rahman',
          fullNameBangla: 'ড. মোহাম্মদ রহমান',
          phone: '+8801712345678',
          address: 'Sylhet, Bangladesh'
        },
        isActive: true,
        isEmailVerified: true
      },
      {
        username: 'teacher001',
        email: 'teacher@dhikmah.edu',
        password: 'teach123',
        role: 'teacher',
        profile: {
          fullName: 'Md. Abdul Karim',
          fullNameBangla: 'মো. আব্দুল করিম',
          phone: '+8801798765432',
          address: 'Sylhet, Bangladesh'
        },
        teacherData: {
          employeeId: 'TEA001',
          subjects: ['Mathematics', 'Physics'],
          qualification: 'M.Sc in Mathematics',
          joiningDate: new Date('2020-01-01'),
          salary: 35000
        },
        isActive: true,
        isEmailVerified: true
      },
      {
        username: 'guardian001',
        email: 'guardian@email.com',
        password: 'parent123',
        role: 'guardian',
        profile: {
          fullName: 'Md. Ali Ahmed',
          fullNameBangla: 'মো. আলী আহমেদ',
          phone: '+8801634567890',
          address: 'Sylhet, Bangladesh'
        },
        guardianData: {
          occupation: 'Business',
          relationship: 'father'
        },
        isActive: true,
        isEmailVerified: true
      }
    ];

    const createdUsers = await User.create(users);
    console.log('✅ Demo users created successfully');

    // Create a demo student for the guardian
    const guardian = createdUsers.find(user => user.role === 'guardian');
    
    const student = {
      studentId: 'guardian001', // This matches the guardian username for login
      rollNumber: '001',
      personalInfo: {
        fullName: 'Ahmad Ali',
        fullNameBangla: 'আহমাদ আলী',
        dateOfBirth: new Date('2010-05-15'),
        gender: 'male',
        bloodGroup: 'B+',
        nationality: 'Bangladeshi',
        religion: 'Islam'
      },
      contactInfo: {
        phone: '+8801634567891',
        email: 'ahmad.student@email.com',
        presentAddress: 'Sylhet, Bangladesh',
        permanentAddress: 'Sylhet, Bangladesh'
      },
      guardianInfo: {
        father: {
          name: 'Md. Ali Ahmed',
          nameBangla: 'মো. আলী আহমেদ',
          phone: '+8801634567890',
          occupation: 'Business',
          nid: '1234567890123'
        },
        mother: {
          name: 'Fatima Ahmed',
          nameBangla: 'ফাতিমা আহমেদ',
          phone: '+8801634567892',
          occupation: 'Housewife'
        },
        primaryGuardian: guardian._id
      },
      academicInfo: {
        class: new mongoose.Types.ObjectId(), // Demo class ID
        section: 'A',
        group: 'Science',
        admissionDate: new Date('2024-01-01'),
        academicYear: '2024'
      },
      financialInfo: {
        admissionFee: 5000,
        monthlyFee: 2500,
        examFee: 500,
        scholarship: 'None',
        scholarshipAmount: 0
      },
      status: 'active'
    };

    await Student.create(student);
    console.log('✅ Demo student created successfully');

    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const seedData = async () => {
  try {
    await connectDB();
    await seedUsers();
    console.log('🎉 Database seeded successfully!');
    
    console.log('\n📝 Demo Credentials:');
    console.log('1. Principal: principal@dhikmah.edu / admin123');
    console.log('2. Teacher: teacher001 / teach123');
    console.log('3. Guardian: guardian001 / parent123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, seedUsers };