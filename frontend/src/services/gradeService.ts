import api from '@/lib/api';

export interface Grade {
  id: string;
  student: string;
  class: string;
  subject: string;
  score: number;
  gradeLetter: string;
  term?: string;
  academicYear?: string;
  remarks?: string;
  createdAt?: string;
}

export interface GradeStats {
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalGrades: number;
  gradeDistribution?: {
    'A+': number;
    'A': number;
    'B': number;
    'C': number;
    'D': number;
    'F': number;
  };
}

export interface CreateGradeData {
  studentId: string;
  subject: string;
  score: number;
  term?: string;
  remarks?: string;
}

export interface UpdateGradeData {
  score?: number;
  remarks?: string;
  term?: string;
}

export interface GradeFilters {
  class?: string;
  subject?: string;
  studentId?: string;
  academicYear?: string;
  term?: string;
}

// Get all grades with optional filters
export const getAllGrades = async (filters?: GradeFilters): Promise<{ data: Grade[]; count?: number }> => {
  try {
    const response = await api.get('/grades', { params: filters });
    
    if (response.data.success) {
      return {
        data: response.data.data || [],
        count: response.data.count
      };
    }
    
    throw new Error(response.data.message || 'নম্বর লোড করতে ব্যর্থ হয়েছে');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'নম্বর লোড করতে ব্যর্থ হয়েছে';
    throw new Error(errorMessage);
  }
};

// Get grade by ID
export const getGradeById = async (id: string): Promise<Grade> => {
  try {
    const response = await api.get(`/grades/${id}`);
    
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'নম্বর পাওয়া যায়নি');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'নম্বর পাওয়া যায়নি';
    throw new Error(errorMessage);
  }
};

// Create a new grade
export const createGrade = async (gradeData: CreateGradeData): Promise<Grade> => {
  try {
    const response = await api.post('/grades', gradeData);
    
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'নম্বর যোগ করতে ব্যর্থ হয়েছে');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'নম্বর যোগ করতে ব্যর্থ হয়েছে';
    throw new Error(errorMessage);
  }
};

// Update a grade
export const updateGrade = async (id: string, gradeData: UpdateGradeData): Promise<Grade> => {
  try {
    const response = await api.put(`/grades/${id}`, gradeData);
    
    if (response.data.success) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'নম্বর আপডেট করতে ব্যর্থ হয়েছে');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'নম্বর আপডেট করতে ব্যর্থ হয়েছে';
    throw new Error(errorMessage);
  }
};

// Delete a grade
export const deleteGrade = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/grades/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'নম্বর মুছে ফেলতে ব্যর্থ হয়েছে');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'নম্বর মুছে ফেলতে ব্যর্থ হয়েছে';
    throw new Error(errorMessage);
  }
};

// Get grade statistics
export const getGradeStats = async (filters?: GradeFilters): Promise<{ data: GradeStats }> => {
  try {
    const response = await api.get('/grades/stats', { params: filters });
    
    if (response.data.success) {
      return {
        data: response.data.data
      };
    }
    
    throw new Error(response.data.message || 'পরিসংখ্যান লোড করতে ব্যর্থ হয়েছে');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'পরিসংখ্যান লোড করতে ব্যর্থ হয়েছে';
    throw new Error(errorMessage);
  }
};

