import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserTie, FaHandshake, FaChartLine, FaCalculator, FaPhone, FaEnvelope, FaCalendar, FaStar, FaUsers, FaLightbulb, FaShieldAlt, FaGraduationCap } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  direction: rtl;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/old-sanaa.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #11998e;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #11998e, #38ef7d);
    border-radius: 2px;
  }
`;

const ServicesSection = styled.div`
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ConsultantsSection = styled.div`
  margin-bottom: 3rem;
`;

const ConsultantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ConsultantCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ConsultantImage = styled.div`
  height: 200px;
  background: ${props => `url(${props.image}) center/cover`};
  position: relative;
`;

const ConsultantOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 1rem;
`;

const ConsultantName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ConsultantTitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ConsultantContent = styled.div`
  padding: 1.5rem;
`;

const ConsultantStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ConsultantStat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #11998e;
`;

const ConsultantStatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ConsultantRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.2rem;
  color: #ffc107;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ConsultantActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #11998e, #38ef7d)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#11998e'};
  border: 2px solid #11998e;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #11998e;
    color: white;
  }
`;

const ContactSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin-bottom: 3rem;
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #11998e;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #11998e;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #11998e;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 1rem;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FinancialConsulting = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    {
      icon: <FaChartLine />,
      title: 'تخطيط الاستثمار',
      description: 'احصل على خطة استثمارية مخصصة تناسب أهدافك المالية ومخاطرك',
      action: 'احجز استشارة'
    },
    {
      icon: <FaCalculator />,
      title: 'تحليل المحفظة',
      description: 'حلل محفظتك الحالية واحصل على توصيات لتحسين الأداء',
      action: 'احجز استشارة'
    },
    {
      icon: <FaShieldAlt />,
      title: 'إدارة المخاطر',
      description: 'تعلم كيفية إدارة المخاطر وحماية استثماراتك',
      action: 'احجز استشارة'
    },
    {
      icon: <FaLightbulb />,
      title: 'استراتيجيات التداول',
      description: 'احصل على استراتيجيات تداول متقدمة ومربحة',
      action: 'احجز استشارة'
    },
    {
      icon: <FaGraduationCap />,
      title: 'التعليم المالي',
      description: 'تعلم أساسيات الاستثمار والتداول من خبراء',
      action: 'احجز دورة'
    },
    {
      icon: <FaHandshake />,
      title: 'استشارات الأعمال',
      description: 'احصل على استشارات مالية لشركتك أو مشروعك',
      action: 'احجز استشارة'
    }
  ];

  const consultants = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      title: 'خبير استثمارات',
      image: '/images/consultant1.jpg',
      experience: '15+ سنة',
      clients: '250+',
      rating: 4.9,
      specializations: ['عقارات', 'طاقة', 'تكنولوجيا']
    },
    {
      id: 2,
      name: 'فاطمة أحمد حسن',
      title: 'محللة مالية',
      image: '/images/consultant2.jpg',
      experience: '12+ سنة',
      clients: '180+',
      rating: 4.8,
      specializations: ['تحليل فني', 'إدارة المخاطر', 'تخطيط مالي']
    },
    {
      id: 3,
      name: 'محمد عبدالله سالم',
      title: 'مستشار تداول',
      image: '/images/consultant3.jpg',
      experience: '10+ سنة',
      clients: '320+',
      rating: 4.7,
      specializations: ['تداول الأسهم', 'التحليل الفني', 'استراتيجيات التداول']
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Hero>
        <HeroTitle>الاستشارات المالية</HeroTitle>
        <HeroSubtitle>
          احصل على استشارات مالية احترافية من خبراء معتمدين
          <br />
          بني ثروتك بثقة مع منصة موثوق
        </HeroSubtitle>
      </Hero>

      <StatsGrid>
        <StatCard>
          <StatNumber>25+</StatNumber>
          <StatLabel>خبير معتمد</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>1,500+</StatNumber>
          <StatLabel>عميل راضي</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>95%</StatNumber>
          <StatLabel>معدل الرضا</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>10+</StatNumber>
          <StatLabel>سنوات خبرة</StatLabel>
        </StatCard>
      </StatsGrid>

      <ServicesSection>
        <SectionTitle>خدمات الاستشارة</SectionTitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceButton>{service.action}</ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesSection>

      <ConsultantsSection>
        <SectionTitle>خبراؤنا المعتمدون</SectionTitle>
        <ConsultantsGrid>
          {consultants.map((consultant) => (
            <ConsultantCard key={consultant.id}>
              <ConsultantImage image={consultant.image}>
                <ConsultantOverlay>
                  <ConsultantName>{consultant.name}</ConsultantName>
                  <ConsultantTitle>{consultant.title}</ConsultantTitle>
                </ConsultantOverlay>
              </ConsultantImage>
              <ConsultantContent>
                <ConsultantStats>
                  <ConsultantStat>
                    <StatValue>{consultant.experience}</StatValue>
                                    <ConsultantStatLabel>الخبرة</ConsultantStatLabel>
              </ConsultantStat>
              <ConsultantStat>
                <StatValue>{consultant.clients}</StatValue>
                <ConsultantStatLabel>العملاء</ConsultantStatLabel>
                  </ConsultantStat>
                </ConsultantStats>
                <ConsultantRating>
                  <Stars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: i < Math.floor(consultant.rating) ? '#ffc107' : '#e0e0e0' }} />
                    ))}
                  </Stars>
                  <RatingText>{consultant.rating}/5</RatingText>
                </ConsultantRating>
                <ConsultantActions>
                  <ActionButton variant="primary">
                    <FaPhone /> احجز استشارة
                  </ActionButton>
                  <ActionButton>
                    <FaEnvelope /> راسل
                  </ActionButton>
                </ConsultantActions>
              </ConsultantContent>
            </ConsultantCard>
          ))}
        </ConsultantsGrid>
      </ConsultantsSection>

      <ContactSection>
        <SectionTitle>احجز استشارة مجانية</SectionTitle>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>الاسم الكامل</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="أدخل اسمك الكامل"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>البريد الإلكتروني</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>رقم الهاتف</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="أدخل رقم هاتفك"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>نوع الخدمة</Label>
            <Select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
            >
              <option value="">اختر نوع الخدمة</option>
              <option value="investment">تخطيط الاستثمار</option>
              <option value="portfolio">تحليل المحفظة</option>
              <option value="risk">إدارة المخاطر</option>
              <option value="trading">استراتيجيات التداول</option>
              <option value="education">التعليم المالي</option>
              <option value="business">استشارات الأعمال</option>
            </Select>
          </FormGroup>
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>رسالتك</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="اكتب رسالتك هنا..."
              required
            />
          </FormGroup>
          <SubmitButton type="submit">
            <FaCalendar /> احجز استشارة مجانية
          </SubmitButton>
        </ContactForm>
      </ContactSection>
    </Container>
  );
};

export default FinancialConsulting; 