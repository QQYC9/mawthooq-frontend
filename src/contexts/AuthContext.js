import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call
      const response = await mockLoginAPI(credentials);
      
      if (response.success) {
        const userData = response.user;
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        toast.success('تم تسجيل الدخول بنجاح');
        return { success: true };
      } else {
        toast.error(response.message || 'فشل في تسجيل الدخول');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تسجيل الدخول');
      return { success: false, message: 'حدث خطأ في النظام' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const response = await mockRegisterAPI(userData);
      
      if (response.success) {
        toast.success('تم إنشاء الحساب بنجاح');
        return { success: true };
      } else {
        toast.error(response.message || 'فشل في إنشاء الحساب');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء الحساب');
      return { success: false, message: 'حدث خطأ في النظام' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    localStorage.setItem('userData', JSON.stringify({ ...user, ...updatedData }));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock API functions (replace with real API calls)
const mockLoginAPI = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 1,
        name: 'أحمد محمد',
        email: 'test@example.com',
        phone: '+966501234567',
        nationalId: '1234567890',
        plan: 'premium',
        balance: 50000,
        createdAt: new Date().toISOString()
      }
    };
  } else {
    return {
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    };
  }
};

const mockRegisterAPI = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (userData.email && userData.password && userData.name) {
    return {
      success: true,
      message: 'تم إنشاء الحساب بنجاح'
    };
  } else {
    return {
      success: false,
      message: 'يرجى ملء جميع الحقول المطلوبة'
    };
  }
}; 