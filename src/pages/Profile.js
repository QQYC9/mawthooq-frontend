import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { FaEdit, FaSave, FaTimes, FaCrown, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const ProfileContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
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
    font-size: 1.1rem;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  .edit-button {
    background: none;
    border: none;
    color: var(--primary-blue);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: background 0.2s ease;
    
    &:hover {
      background: var(--light-blue);
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  label {
    display: block;
    color: var(--gray-700);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--gray-200);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(9, 60, 119, 0.1);
    }
    
    &:disabled {
      background: var(--gray-50);
      color: var(--gray-600);
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  button {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    &.save {
      background: var(--primary-green);
      color: var(--white);
      
      &:hover {
        background: #22a06b;
      }
    }
    
    &.cancel {
      background: var(--gray-200);
      color: var(--gray-700);
      
      &:hover {
        background: var(--gray-300);
      }
    }
  }
`;

const PlanCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  margin-bottom: 1.5rem;
  
  .plan-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .plan-icon {
      width: 50px;
      height: 50px;
      background: var(--light-blue);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-blue);
      font-size: 1.2rem;
    }
    
    .plan-info {
      flex: 1;
      
      .plan-name {
        color: var(--primary-blue);
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      
      .plan-price {
        color: var(--primary-green);
        font-weight: 600;
      }
    }
    
    .current-badge {
      background: var(--light-green);
      color: var(--primary-green);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
  
  .plan-features {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: var(--gray-700);
      
      .feature-icon {
        color: var(--primary-green);
        font-size: 0.9rem;
      }
    }
  }
  
  .plan-actions {
    display: flex;
    gap: 1rem;
    
    button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.upgrade {
        background: var(--primary-blue);
        color: var(--white);
        
        &:hover {
          background: var(--secondary-blue);
        }
      }
      
      &.downgrade {
        background: var(--gray-200);
        color: var(--gray-700);
        
        &:hover {
          background: var(--gray-300);
        }
      }
      
      &.current {
        background: var(--light-green);
        color: var(--primary-green);
        cursor: default;
      }
    }
  }
`;

const SecuritySection = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  margin-top: 2rem;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
  
  &:last-child {
    border-bottom: none;
  }
  
  .security-info {
    .security-title {
      color: var(--primary-blue);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .security-description {
      color: var(--gray-600);
      font-size: 0.9rem;
    }
  }
  
  .security-action {
    button {
      background: var(--primary-blue);
      color: var(--white);
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s ease;
      
      &:hover {
        background: var(--secondary-blue);
      }
    }
  }
`;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        nationalId: user.nationalId || ''
      });
    }
  }, [user, reset]);

  const plans = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      price: 'مجاناً',
      features: [
        'استثمارات محدودة (حتى 7,000,000 ريال يمني)',
        'تقارير أساسية',
        'دعم عبر البريد الإلكتروني'
      ],
      current: user?.plan === 'basic'
    },
    {
      id: 'premium',
      name: 'الخطة المميزة',
      price: '13,860 ريال يمني/شهر',
      features: [
        'استثمارات غير محدودة',
        'تحليل متقدم للسوق',
        'تقارير مفصلة',
        'دعم مخصص'
      ],
      current: user?.plan === 'premium'
    },
    {
      id: 'pro',
      name: 'الخطة الاحترافية',
      price: '27,860 ريال يمني/شهر',
      features: [
        'جميع مميزات الخطة المميزة',
        'استشارات مالية شخصية',
        'وصول مبكر للمشاريع الجديدة',
        'دعم هاتفي 24/7'
      ],
      current: user?.plan === 'pro'
    }
  ];

  const handleSave = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateUser(data);
      setIsEditing(false);
      toast.success('تم تحديث الملف الشخصي بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      nationalId: user.nationalId || ''
    });
    setIsEditing(false);
  };

  const handlePlanChange = (planId) => {
    if (planId === user?.plan) {
      toast.info('أنت بالفعل مشترك في هذه الخطة');
      return;
    }
    
    toast.success(`تم الترقية إلى ${plans.find(p => p.id === planId)?.name}`);
    updateUser({ plan: planId });
  };

  if (!user) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileHeader>
          <h1>الملف الشخصي</h1>
          <p>إدارة معلوماتك الشخصية وخطة الاشتراك</p>
        </ProfileHeader>

        <ProfileGrid>
          <ProfileCard>
            <CardHeader>
              <h3>المعلومات الشخصية</h3>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <FaTimes /> : <FaEdit />}
              </button>
            </CardHeader>

            <Form onSubmit={handleSubmit(handleSave)}>
              <FormGroup>
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'الاسم مطلوب',
                    minLength: {
                      value: 3,
                      message: 'الاسم يجب أن يكون 3 أحرف على الأقل'
                    }
                  })}
                  disabled={!isEditing}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.name.message}</span>}
              </FormGroup>

              <FormGroup>
                <label>البريد الإلكتروني</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'البريد الإلكتروني غير صحيح'
                    }
                  })}
                  disabled={!isEditing}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.email.message}</span>}
              </FormGroup>

              <FormGroup>
                <label>رقم الجوال</label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'رقم الجوال مطلوب',
                    pattern: {
                      value: /^(\+966|966|0)?5[0-9]{8}$/,
                      message: 'رقم الجوال غير صحيح'
                    }
                  })}
                  disabled={!isEditing}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.phone.message}</span>}
              </FormGroup>

              <FormGroup>
                <label>رقم الهوية الوطنية / الإقامة</label>
                <input
                  type="text"
                  {...register('nationalId', {
                    required: 'رقم الهوية مطلوب',
                    pattern: {
                      value: /^[12]\d{9}$/,
                      message: 'رقم الهوية غير صحيح'
                    }
                  })}
                  disabled={!isEditing}
                  className={errors.nationalId ? 'error' : ''}
                />
                {errors.nationalId && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.nationalId.message}</span>}
              </FormGroup>

              {isEditing && (
                <FormActions>
                  <button type="submit" className="save" disabled={isLoading}>
                    <FaSave />
                    {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                  <button type="button" className="cancel" onClick={handleCancel}>
                    <FaTimes />
                    إلغاء
                  </button>
                </FormActions>
              )}
            </Form>
          </ProfileCard>

          <div>
            <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>خطة الاشتراك</h3>
            {plans.map((plan) => (
              <PlanCard key={plan.id}>
                <div className="plan-header">
                  <div className="plan-icon">
                    <FaCrown />
                  </div>
                  <div className="plan-info">
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">{plan.price}</div>
                  </div>
                  {plan.current && (
                    <div className="current-badge">الحالية</div>
                  )}
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <FaCheckCircle className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="plan-actions">
                  {plan.current ? (
                    <button className="current" disabled>
                      الخطة الحالية
                    </button>
                  ) : (
                    <button 
                      className="upgrade"
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {user.plan === 'basic' && plan.id !== 'basic' ? 'ترقية' : 'تغيير'}
                    </button>
                  )}
                </div>
              </PlanCard>
            ))}
          </div>
        </ProfileGrid>

        <SecuritySection>
          <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem' }}>الأمان والخصوصية</h3>
          
          <SecurityItem>
            <div className="security-info">
              <div className="security-title">كلمة المرور</div>
              <div className="security-description">تحديث كلمة المرور لزيادة الأمان</div>
            </div>
            <div className="security-action">
              <button>تغيير كلمة المرور</button>
            </div>
          </SecurityItem>

          <SecurityItem>
            <div className="security-info">
              <div className="security-title">المصادقة الثنائية</div>
              <div className="security-description">تفعيل المصادقة الثنائية لحماية إضافية</div>
            </div>
            <div className="security-action">
              <button>تفعيل</button>
            </div>
          </SecurityItem>

          <SecurityItem>
            <div className="security-info">
              <div className="security-title">إشعارات الأمان</div>
              <div className="security-description">تلقي إشعارات عند تسجيل الدخول من أجهزة جديدة</div>
            </div>
            <div className="security-action">
              <button>تفعيل</button>
            </div>
          </SecurityItem>
        </SecuritySection>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile; 