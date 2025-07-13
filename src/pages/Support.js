import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaChevronUp, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SupportContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const SupportContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SupportHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: var(--primary-blue);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray-600);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-600);
  }
`;

const ContactForm = styled.form`
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
  
  input, textarea, select {
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
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
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

const ContactInfo = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
  
  &:last-child {
    border-bottom: none;
  }
  
  .contact-icon {
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
  
  .contact-details {
    flex: 1;
    
    .contact-title {
      color: var(--primary-blue);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .contact-value {
      color: var(--gray-600);
    }
  }
`;

const FAQSection = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-600);
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  overflow: hidden;
  
  .faq-question {
    background: var(--gray-50);
    padding: 1rem 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s ease;
    
    &:hover {
      background: var(--light-blue);
    }
    
    .question-text {
      color: var(--primary-blue);
      font-weight: 600;
      font-size: 1rem;
    }
    
    .question-icon {
      color: var(--primary-blue);
      transition: transform 0.2s ease;
      
      &.expanded {
        transform: rotate(180deg);
      }
    }
  }
  
  .faq-answer {
    padding: 0 1.5rem;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &.expanded {
      padding: 1rem 1.5rem;
      max-height: 200px;
    }
    
    .answer-text {
      color: var(--gray-700);
      line-height: 1.6;
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

const Support = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const faqs = [
    {
      id: 1,
      question: 'كيف يمكنني البدء في الاستثمار؟',
      answer: 'يمكنك البدء في الاستثمار من خلال إنشاء حساب جديد، إكمال عملية التحقق من الهوية، ثم اختيار المشاريع المناسبة لك والاشتراك فيها.'
    },
    {
      id: 2,
      question: 'ما هي الحدود الدنيا والقصوى للاستثمار؟',
      answer: 'تختلف الحدود حسب المشروع، ولكن الحد الأدنى عادةً يبدأ من 1,400,000 ريال يمني والحد الأقصى يصل إلى 70,000,000 ريال يمني لكل مشروع.'
    },
    {
      id: 3,
      question: 'كيف يتم حساب الأرباح؟',
      answer: 'يتم حساب الأرباح بناءً على أداء المشروع. عادةً ما تكون الأرباح متوقعة بنسبة 15-25% سنوياً، ولكن قد تختلف حسب ظروف السوق.'
    },
    {
      id: 4,
      question: 'هل يمكنني سحب استثماراتي في أي وقت؟',
      answer: 'لا، الاستثمارات مقفلة حتى انتهاء مدة المشروع. يمكنك فقط بيع أسهمك في السوق الثانوية إذا كان متاحاً.'
    },
    {
      id: 5,
      question: 'ما هي رسوم المنصة؟',
      answer: 'تفرض المنصة رسوم إدارية بنسبة 1-2% من قيمة الاستثمار، بالإضافة إلى رسوم تداول في السوق الثانوية.'
    },
    {
      id: 6,
      question: 'كيف يمكنني التواصل مع فريق الدعم؟',
      answer: 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف أو من خلال نموذج الاتصال في هذه الصفحة. فريق الدعم متاح 24/7.'
    }
  ];

  const handleFAQToggle = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      reset();
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SupportContainer>
      <SupportContent>
        <SupportHeader>
          <h1>الدعم والمساعدة</h1>
          <p>نحن هنا لمساعدتك في رحلة الاستثمار. تواصل معنا أو اطلع على الأسئلة الشائعة</p>
        </SupportHeader>

        <SupportGrid>
          <ContactCard>
            <ContactHeader>
              <h3>تواصل معنا</h3>
              <p>أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن</p>
            </ContactHeader>

            <ContactForm onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <label>الاسم الكامل</label>
                <input
                  type="text"
                  {...register('name', {
                    required: 'الاسم مطلوب'
                  })}
                  placeholder="أدخل اسمك الكامل"
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
                  placeholder="أدخل بريدك الإلكتروني"
                />
                {errors.email && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.email.message}</span>}
              </FormGroup>

              <FormGroup>
                <label>نوع الاستفسار</label>
                <select
                  {...register('inquiryType', {
                    required: 'نوع الاستفسار مطلوب'
                  })}
                >
                  <option value="">اختر نوع الاستفسار</option>
                  <option value="technical">مشكلة تقنية</option>
                  <option value="investment">استفسار استثماري</option>
                  <option value="account">مشكلة في الحساب</option>
                  <option value="general">استفسار عام</option>
                </select>
                {errors.inquiryType && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.inquiryType.message}</span>}
              </FormGroup>

              <FormGroup>
                <label>الرسالة</label>
                <textarea
                  {...register('message', {
                    required: 'الرسالة مطلوبة',
                    minLength: {
                      value: 20,
                      message: 'الرسالة يجب أن تكون 20 حرف على الأقل'
                    }
                  })}
                  placeholder="اكتب رسالتك هنا..."
                />
                {errors.message && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errors.message.message}</span>}
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <FaPaperPlane />
                    إرسال الرسالة
                  </>
                )}
              </SubmitButton>
            </ContactForm>
          </ContactCard>

          <ContactInfo>
            <ContactHeader>
              <h3>معلومات الاتصال</h3>
              <p>تواصل معنا عبر أي من الطرق التالية</p>
            </ContactHeader>

            <ContactItem>
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <div className="contact-title">الهاتف</div>
                <div className="contact-value">+967773335044</div>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <div className="contact-title">البريد الإلكتروني</div>
                <div className="contact-value">support@mawthooq.com</div>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <div className="contact-title">العنوان</div>
                <div className="contact-value">اليمن , الامانة</div>
              </div>
            </ContactItem>

            <div style={{ 
              background: 'var(--light-blue)', 
              padding: '1.5rem', 
              borderRadius: '0.5rem', 
              marginTop: '1.5rem' 
            }}>
              <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                أوقات العمل
              </h4>
              <p style={{ color: 'var(--gray-600)', margin: '0' }}>
                الأحد - الخميس: 8:00 ص - 6:00 م<br />
                الجمعة - السبت: 10:00 ص - 4:00 م
              </p>
            </div>
          </ContactInfo>
        </SupportGrid>

        <FAQSection>
          <FAQHeader>
            <h3>الأسئلة الشائعة</h3>
            <p>إجابات على أكثر الأسئلة شيوعاً</p>
          </FAQHeader>

          <FAQList>
            {faqs.map((faq) => (
              <FAQItem key={faq.id}>
                <div 
                  className="faq-question"
                  onClick={() => handleFAQToggle(faq.id)}
                >
                  <div className="question-text">{faq.question}</div>
                  <div className={`question-icon ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                    {expandedFAQ === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                <div className={`faq-answer ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                  <div className="answer-text">{faq.answer}</div>
                </div>
              </FAQItem>
            ))}
          </FAQList>
        </FAQSection>
      </SupportContent>
    </SupportContainer>
  );
};

export default Support; 