import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine, FaShieldAlt, FaUsers, FaRocket } from 'react-icons/fa';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
`;

const HeroSection = styled.section`
  position: relative;
  padding: 6rem 0 4rem;
  text-align: center;
  color: var(--white);
  background: url('/images/old-sanaa.jpg') center center/cover no-repeat;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(9, 60, 119, 0.7); /* طبقة زرقاء شفافة */
    z-index: 2;
  }

  > * {
    position: relative;
    z-index: 3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: var(--primary-green);
    color: var(--white);
    
    &:hover {
      background: #22a06b;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--white);
    border: 2px solid var(--white);
    
    &:hover {
      background: var(--white);
      color: var(--primary-blue);
      transform: translateY(-2px);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: var(--white);
`;

const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--white);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  border: 1px solid var(--gray-200);
  
  .icon {
    width: 60px;
    height: 60px;
    background: var(--light-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: var(--primary-blue);
    font-size: 1.5rem;
  }
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray-600);
    line-height: 1.6;
  }
`;

const InvestmentSection = styled.section`
  padding: 4rem 0;
  background: var(--gray-50);
`;

const InvestmentContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const InvestmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InvestmentCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const InvestmentImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  font-weight: 700;
`;

const InvestmentDetails = styled.div`
  padding: 1.5rem;
`;

const InvestmentTitle = styled.h3`
  color: var(--primary-blue);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InvestmentStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  .subscription {
    background: var(--light-green);
    color: var(--primary-green);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .status {
    color: var(--gray-600);
    font-size: 0.9rem;
  }
`;

const InvestmentProgress = styled.div`
  margin-bottom: 1rem;
  
  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: var(--primary-green);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
  
  .progress-text {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--gray-600);
  }
`;

const InvestmentButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-blue);
  color: var(--white);
  text-decoration: none;
  text-align: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.2s ease;
  
  &:hover {
    background: var(--secondary-blue);
  }
`;

const StatsSection = styled.section`
  padding: 4rem 0;
  background: var(--primary-blue);
  color: var(--white);
`;

const StatsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-green);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const LandingPage = () => {
  const features = [
    {
      icon: <FaChartLine />,
      title: 'تحليل متقدم',
      description: 'أدوات تحليل متطورة لمساعدتك في اتخاذ قرارات استثمارية مدروسة'
    },
    {
      icon: <FaShieldAlt />,
      title: 'أمان عالي',
      description: 'حماية متقدمة لأموالك وبياناتك الشخصية وفق أعلى معايير الأمان'
    },
    {
      icon: <FaUsers />,
      title: 'مجتمع مستثمرين',
      description: 'انضم إلى مجتمع من المستثمرين المحترفين وشارك الخبرات'
    },
    {
      icon: <FaRocket />,
      title: 'نمو سريع',
      description: 'فرص استثمارية عالية العائد مع إمكانية نمو سريع'
    }
  ];

  const investments = [
    {
      id: 1,
      title: 'مشروع العقارات الفاخرة',
      subscription: '85%',
      status: 'مفتوح للاستثمار',
      progress: 75,
      target: `${(2000000 * 140).toLocaleString()} ريال يمني`,
      raised: `${(1500000 * 140).toLocaleString()} ريال يمني`
    },
    {
      id: 2,
      title: 'شركة المنذر بي سي للتكنولوجيا',
      subscription: '92%',
      status: 'قريب من الاكتمال',
      progress: 92,
      target: `${(500000 * 140).toLocaleString()} ريال يمني`,
      raised: `${(460000 * 140).toLocaleString()} ريال يمني`
    },
    {
      id: 3,
      title: 'مشروع الطاقة المتجددة',
      subscription: '67%',
      status: 'مفتوح للاستثمار',
      progress: 67,
      target: `${(1500000 * 140).toLocaleString()} ريال يمني`,
      raised: `${(1005000 * 140).toLocaleString()} ريال يمني`
    }
  ];

  const stats = [
    { number: '50+', label: 'مشروع ناجح' },
    { number: '10,000+', label: 'مستثمر نشط' },
    { number: '500M+', label: 'ريال مستثمر' },
    { number: '25%', label: 'متوسط العائد السنوي' }
  ];

  return (
    <LandingContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            استثمر في المستقبل
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            منصة موثوق تفتح لك أبواب الاستثمار في أفضل الفرص الواعدة 
            مع شفافية كاملة وأمان عالي
          </HeroSubtitle>
          <CTAButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CTAButton to="/register" className="primary">
              ابدأ الاستثمار الآن
            </CTAButton>
            <CTAButton to="/login" className="secondary">
              تسجيل الدخول
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContent>
          <SectionTitle>لماذا تختار منصة موثوق؟</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContent>
      </FeaturesSection>

      <InvestmentSection>
        <InvestmentContent>
          <SectionTitle>أحدث الفرص الاستثمارية</SectionTitle>
          <InvestmentGrid>
            {investments.map((investment, index) => (
              <InvestmentCard
                key={investment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <InvestmentImage>
                  {investment.title.split(' ')[0]}
                </InvestmentImage>
                <InvestmentDetails>
                  <InvestmentTitle>{investment.title}</InvestmentTitle>
                  <InvestmentStatus>
                    <span className="subscription">{investment.subscription}</span>
                    <span className="status">{investment.status}</span>
                  </InvestmentStatus>
                  <InvestmentProgress>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${investment.progress}%` }}
                      />
                    </div>
                    <div className="progress-text">
                      <span>المستهدف: {investment.target}</span>
                      <span>المجمع: {investment.raised}</span>
                    </div>
                  </InvestmentProgress>
                  <InvestmentButton to={`/project/${investment.id}`}>
                    عرض التفاصيل
                  </InvestmentButton>
                </InvestmentDetails>
              </InvestmentCard>
            ))}
          </InvestmentGrid>
        </InvestmentContent>
      </InvestmentSection>

      <StatsSection>
        <StatsContent>
          <SectionTitle style={{ color: 'var(--white)' }}>إحصائيات منصة موثوق</SectionTitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsContent>
      </StatsSection>
    </LandingContainer>
  );
};

export default LandingPage; 