import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaIdCard, FaLock, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const RegisterContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  padding: 2rem 1rem;
`;

const RegisterCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  box-shadow: var(--shadow-xl);
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const RegisterHeader = styled.div`
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  border: 2px solid var(--gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: var(--white);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(9, 60, 119, 0.1);
  }
  
  &.error {
    border-color: var(--error);
  }
`;

const ErrorMessage = styled.span`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const PlanSection = styled.div`
  margin: 1rem 0;
`;

const PlanTitle = styled.h3`
  color: var(--primary-blue);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const PlanCard = styled.div`
  border: 2px solid ${props => props.selected ? 'var(--primary-blue)' : 'var(--gray-200)'};
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? 'var(--light-blue)' : 'var(--white)'};
  
  &:hover {
    border-color: var(--primary-blue);
    background: var(--light-blue);
  }
  
  .plan-name {
    font-weight: 600;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
  }
  
  .plan-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-green);
    margin-bottom: 0.25rem;
  }
  
  .plan-features {
    font-size: 0.9rem;
    color: var(--gray-600);
  }
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

const LoginLink = styled.div`
  text-align: center;
  color: var(--gray-600);
  font-size: 0.9rem;
  margin-top: 1rem;
  
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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm();

  const password = watch('password');

  const plans = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      price: 'مجاناً',
      features: 'استثمارات محدودة (حتى 7,000,000 ريال يمني)، تقارير أساسية'
    },
    {
      id: 'premium',
      name: 'الخطة المميزة',
      price: '13,860 ريال يمني/شهر',
      features: 'استثمارات غير محدودة، تحليل متقدم'
    },
    {
      id: 'pro',
      name: 'الخطة الاحترافية',
      price: '27,860 ريال يمني/شهر',
      features: 'جميع المميزات، استشارات مالية'
    }
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const userData = {
        ...data,
        plan: selectedPlan
      };
      
      const result = await registerUser(userData);
      if (result.success) {
        navigate('/login');
      } else {
        setError('root', {
          type: 'manual',
          message: result.message || 'فشل في إنشاء الحساب'
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
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <RegisterHeader>
          <h1>إنشاء حساب جديد</h1>
          <p>انضم إلى منصة موثوق وابدأ رحلة الاستثمار</p>
        </RegisterHeader>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormGroup>
              <FaUser className="input-icon" />
              <Input
                type="text"
                placeholder="الاسم الكامل"
                {...register('name', {
                  required: 'الاسم الكامل مطلوب',
                  minLength: {
                    value: 3,
                    message: 'الاسم يجب أن يكون 3 أحرف على الأقل'
                  }
                })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <FaPhone className="input-icon" />
              <Input
                type="tel"
                placeholder="رقم الجوال"
                {...register('phone', {
                  required: 'رقم الجوال مطلوب',
                  pattern: {
                    value: /^(\+966|966|0)?5[0-9]{8}$/,
                    message: 'رقم الجوال غير صحيح'
                  }
                })}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </FormGroup>
          </FormRow>
          
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
            <FaIdCard className="input-icon" />
            <Input
              type="text"
              placeholder="رقم الهوية الوطنية / الإقامة"
              {...register('nationalId', {
                required: 'رقم الهوية مطلوب',
                pattern: {
                  value: /^[12]\d{9}$/,
                  message: 'رقم الهوية غير صحيح'
                }
              })}
              className={errors.nationalId ? 'error' : ''}
            />
            {errors.nationalId && <ErrorMessage>{errors.nationalId.message}</ErrorMessage>}
          </FormGroup>
          
          <FormRow>
            <FormGroup>
              <FaLock className="input-icon" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                {...register('password', {
                  required: 'كلمة المرور مطلوبة',
                  minLength: {
                    value: 8,
                    message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص'
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
            
            <FormGroup>
              <FaLock className="input-icon" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="تأكيد كلمة المرور"
                {...register('confirmPassword', {
                  required: 'تأكيد كلمة المرور مطلوب',
                  validate: value => value === password || 'كلمة المرور غير متطابقة'
                })}
                className={errors.confirmPassword ? 'error' : ''}
              />
              <div
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
            </FormGroup>
          </FormRow>
          
          <PlanSection>
            <PlanTitle>اختر خطة الاشتراك</PlanTitle>
            <PlanGrid>
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  selected={selectedPlan === plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">{plan.price}</div>
                  <div className="plan-features">{plan.features}</div>
                </PlanCard>
              ))}
            </PlanGrid>
          </PlanSection>
          
          {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}
          
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                إنشاء الحساب
                <FaArrowRight />
              </>
            )}
          </SubmitButton>
        </Form>
        
        <LoginLink>
          لديك حساب بالفعل؟{' '}
          <Link to="/login">تسجيل الدخول</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage; 