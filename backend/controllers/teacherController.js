const Teacher = require('../models/Teacher');

// Create new teacher
exports.createTeacher = async (req, res) => {
try {
// Check if phone number already exists
const existingTeacher = await Teacher.findOne({ phoneNumber: req.body.phoneNumber });
if (existingTeacher) {
return res.status(400).json({
    success: false,
    message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে একজন শিক্ষক নিবন্ধিত আছেন'
});
}

// Check if email already exists (if provided)
if (req.body.email) {
const existingEmail = await Teacher.findOne({ email: req.body.email });
if (existingEmail) {
    return res.status(400).json({
    success: false,
    message: 'এই ইমেইল ঠিকানা ইতিমধ্যে ব্যবহৃত হয়েছে'
    });
}
}

const teacher = new Teacher(req.body);
await teacher.save();

res.status(201).json({
success: true,
message: 'শিক্ষক সফলভাবে নিবন্ধিত হয়েছেন',
data: teacher
});
} catch (error) {
// Handle validation errors
if (error.name === 'ValidationError') {
const errors = {};
Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
});

return res.status(400).json({
    success: false,
    message: 'তথ্য যাচাই করতে সমস্যা হয়েছে',
    errors
});
}

res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
try {
const { page = 1, limit = 10, designation, search } = req.query;

const query = { isActive: true };
if (designation) query.designation = designation;
if (search) {
query.$or = [
    { teacherName: { $regex: search, $options: 'i' } },
    { phoneNumber: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
    { designation: { $regex: search, $options: 'i' } }
];
}

const teachers = await Teacher.find(query)
.limit(limit * 1)
.skip((page - 1) * limit)
.sort({ createdAt: -1 });

const count = await Teacher.countDocuments(query);

res.status(200).json({
success: true,
data: teachers,
totalPages: Math.ceil(count / limit),
currentPage: page,
total: count
});
} catch (error) {
res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Get single teacher
exports.getTeacherById = async (req, res) => {
try {
const teacher = await Teacher.findById(req.params.id);

if (!teacher) {
return res.status(404).json({
    success: false,
    message: 'শিক্ষক খুঁজে পাওয়া যায়নি'
});
}

res.status(200).json({
success: true,
data: teacher
});
} catch (error) {
res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Update teacher
exports.updateTeacher = async (req, res) => {
try {
// Check if phone number is being changed and if it already exists
if (req.body.phoneNumber) {
const existingTeacher = await Teacher.findOne({ 
    phoneNumber: req.body.phoneNumber,
    _id: { $ne: req.params.id }
});
if (existingTeacher) {
    return res.status(400).json({
    success: false,
    message: 'এই মোবাইল নম্বর দিয়ে ইতিমধ্যে অন্য একজন শিক্ষক নিবন্ধিত আছেন'
    });
}
}

// Check if email is being changed and if it already exists
if (req.body.email) {
const existingEmail = await Teacher.findOne({ 
    email: req.body.email,
    _id: { $ne: req.params.id }
});
if (existingEmail) {
    return res.status(400).json({
    success: false,
    message: 'এই ইমেইল ঠিকানা ইতিমধ্যে অন্য কেউ ব্যবহার করছেন'
    });
}
}

const teacher = await Teacher.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!teacher) {
return res.status(404).json({
    success: false,
    message: 'শিক্ষক খুঁজে পাওয়া যায়নি'
});
}

res.status(200).json({
success: true,
message: 'শিক্ষকের তথ্য সফলভাবে আপডেট হয়েছে',
data: teacher
});
} catch (error) {
if (error.name === 'ValidationError') {
const errors = {};
Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
});

return res.status(400).json({
    success: false,
    message: 'তথ্য যাচাই করতে সমস্যা হয়েছে',
    errors
});
}

res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
try {
const teacher = await Teacher.findByIdAndDelete(req.params.id);

if (!teacher) {
return res.status(404).json({
    success: false,
    message: 'শিক্ষক খুঁজে পাওয়া যায়নি'
});
}

res.status(200).json({
success: true,
message: 'শিক্ষক সফলভাবে মুছে ফেলা হয়েছে'
});
} catch (error) {
res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Get active teachers only
exports.getActiveTeachers = async (req, res) => {
try {
const teachers = await Teacher.find({ isActive: true }).sort({ createdAt: -1 });

res.status(200).json({
success: true,
count: teachers.length,
data: teachers
});
} catch (error) {
res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};

// Search teachers
exports.searchTeachers = async (req, res) => {
try {
const searchQuery = req.params.query;
const teachers = await Teacher.find({
isActive: true,
$or: [
    { teacherName: { $regex: searchQuery, $options: 'i' } },
    { phoneNumber: { $regex: searchQuery, $options: 'i' } },
    { email: { $regex: searchQuery, $options: 'i' } },
    { designation: { $regex: searchQuery, $options: 'i' } }
]
});

res.status(200).json({
success: true,
count: teachers.length,
data: teachers
});
} catch (error) {
res.status(500).json({
success: false,
message: 'অনুসন্ধান করতে সমস্যা হয়েছে',
error: error.message
});
}
};

// Get teachers by designation
exports.getTeachersByDesignation = async (req, res) => {
try {
const teachers = await Teacher.find({ 
designation: req.params.designation,
isActive: true
});

res.status(200).json({
success: true,
count: teachers.length,
data: teachers
});
} catch (error) {
res.status(500).json({
success: false,
message: 'সার্ভার ত্রুটি ঘটেছে',
error: error.message
});
}
};