
Madrasa_Management/
├── backend/                    # Node.js/Express Backend
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── controllers/           # Business logic
│   │   ├── gradeController.js
│   │   ├── noticeController.js
│   │   ├── studentController.js
│   │   └── teacherController.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── async.js
│   ├── models/                # MongoDB Schemas
│   │   ├── Grade.js
│   │   ├── Notice.js
│   │   ├── Student.js
│   │   └── Teacher.js
│   ├── routes/                # API Routes
│   │   ├── grade.js
│   │   ├── notices.js
│   │   ├── students.js
│   │   └── teachers.js
│   ├── scripts/
│   │   └── seedData.js        # Database seeding
│   ├── server.js              # Main server file
│   └── package.json
│
└── frontend/                  # Next.js Frontend
    ├── src/
    │   ├── app/
    │   │   ├── dashboard-principal/  # Principal dashboard
    │   │   │   ├── TeachersTab.tsx  # View/manage teachers
    │   │   │   ├── StudentsTab.tsx
    │   │   │   └── page.tsx
    │   │   ├── dashboard-teacher/    # Teacher dashboard
    │   │   │   ├── GradingView.tsx
    │   │   │   ├── AttendanceTab.tsx
    │   │   │   └── page.tsx
    │   │   ├── login/
    │   │   ├── register/
    │   │   └── ...
    │   ├── lib/
    │   │   └── api.ts         # Axios API client
    │   └── services/
    │       └── gradeService.ts
    └── package.json
```

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: Helmet, CORS, Rate Limiting
- **Other**: dotenv, morgan, compression

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **UI Components**: Radix UI, Lucide Icons
- **Notifications**: React Hot Toast



## 🔍 Key Features

### Principal Dashboard
- ✅ View all teachers
- ✅ Add new teachers
- ✅ Edit/Delete teachers
- ✅ View students
- ✅ View notices
- ✅ View results/grades

### Teacher Dashboard
- ✅ View assigned students
- ✅ Mark attendance
- ✅ Grade students
- ✅ Assign homework
- ✅ View notices
- ✅ Profile management

### Grade Management
- ✅ Create grades for students
- ✅ Filter by class, subject, term
- ✅ Auto-calculate grade letters (A+, A, B, C, D, F)
- ✅ View statistics
- ✅ Update/Delete grades

--

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Ensure MongoDB is running
- **Port Already in Use**: Change `PORT` in `.env` or kill process on port 5000
- **Module Not Found**: Run `npm install` in backend directory

### Frontend Issues
- **API Connection Error**: Check `NEXT_PUBLIC_API_URL` in `.env.local`
- **Build Errors**: Clear `.next` folder and rebuild
- **TypeScript Errors**: Check `tsconfig.json` configuration


## 📚 Next Steps / Improvements

1. **Implement Full Authentication**:
   - JWT-based auth for all protected routes
   - Role-based access control (Principal, Teacher, Guardian)

2. **Enhance Teacher-Student Relationship**:
   - Use ObjectId references instead of string names
   - Add many-to-many relationship (teacher can teach multiple classes)

3. **Add Course Management**:
   - Create Course model
   - Link teachers to specific courses/subjects
   - Better course-teacher-student relationship

4. **Add View Teacher Details Modal**:
   - Currently only shows list, add detail view
   - Show teacher's assigned students
   - Show teacher's performance statistics

5. **Add Search/Filter UI**:
   - Implement search bar in TeachersTab
   - Filter by designation, subject, etc.


