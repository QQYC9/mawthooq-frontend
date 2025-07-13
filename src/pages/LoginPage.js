import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  padding: 2rem 1rem;
`;

const LoginCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-blue);
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-600);
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  
  .input-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
    z-index: 1;
  }
  
  .password-toggle {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
    cursor: pointer;
    z-index: 1;
    
    &:hover {
      color: var(--gray-600);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  padding-left: ${props => props.type === 'password' ? '3rem' : '1rem'};
  border: 2px solid var(--gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: var(--white);
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(9, 60, 119, 0.1);
  }
  
  &.error {
    border-color: var(--error);
  }
  
  &::placeholder {
    color: var(--gray-400);
  }
`;

const ErrorMessage = styled.span`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  background: var(--primary-blue);
  color: var(--white);
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--secondary-blue);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }
`;

const ForgotPassword = styled(Link)`
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary-blue);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--gray-200);
  }
  
  span {
    padding: 0 1rem;
    color: var(--gray-500);
    font-size: 0.9rem;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  color: var(--gray-600);
  font-size: 0.9rem;
  
  a {
    color: var(--primary-blue);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      color: var(--secondary-blue);
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoginPage = ({ setIsAuthenticated }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const result = await login(data);
      if (result.success) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('root', {
          type: 'manual',
          message: result.message || 'فشل في تسجيل الدخول'
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'حدث خطأ في النظام'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginHeader>
          <h1>تسجيل الدخول</h1>
          <p>مرحباً بك في منصة موثوق للاستثمار</p>
        </LoginHeader>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FaEnvelope className="input-icon" />
            <Input
              type="email"
              placeholder="البريد الإلكتروني"
              {...register('email', {
                required: 'البريد الإلكتروني مطلوب',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'البريد الإلكتروني غير صحيح'
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FaLock className="input-icon" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور"
              {...register('password', {
                required: 'كلمة المرور مطلوبة',
                minLength: {
                  value: 6,
                  message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                }
              })}
              className={errors.password ? 'error' : ''}
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>
          
          {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                تسجيل الدخول
                <FaArrowRight />
              </>
            )}
          </SubmitButton>
          
          <ForgotPassword to="/forgot-password">
            نسيت كلمة المرور؟
          </ForgotPassword>
        </Form>
        
        <Divider>
          <span>أو</span>
        </Divider>
        
        <RegisterLink>
          ليس لديك حساب؟{' '}
          <Link to="/register">إنشاء حساب جديد</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 