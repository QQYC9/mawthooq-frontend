import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBuilding, FaChartLine, FaHandshake, FaShieldAlt, FaUsers, FaLightbulb, FaSearch, FaFilter, FaEye, FaHeart } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  direction: rtl;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1rem;
`;

const FeaturesSection = styled.div`
  margin-bottom: 3rem;
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
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
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

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  border: 1px solid #e1e5e9;
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
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
    border-color: #667eea;
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
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
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

const ProjectImage = styled.div`
  height: 200px;
  background: ${props => `url(${props.image}) center/cover`};
  position: relative;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProjectStat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
`;

const ProjectStatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ProjectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
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

const InvestmentProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minInvestment, setMinInvestment] = useState('');

  const features = [
    {
      icon: <FaBuilding />,
      title: 'مشاريع متنوعة',
      description: 'اختر من بين مجموعة واسعة من المشاريع الاستثمارية في مختلف القطاعات'
    },
    {
      icon: <FaChartLine />,
      title: 'تحليل متقدم',
      description: 'احصل على تحليلات مفصلة ومؤشرات الأداء لكل مشروع'
    },
    {
      icon: <FaHandshake />,
      title: 'شراكات موثوقة',
      description: 'نعمل مع شركاء موثوقين لضمان جودة المشاريع'
    },
    {
      icon: <FaShieldAlt />,
      title: 'حماية الاستثمار',
      description: 'آليات حماية متعددة لضمان أمان استثماراتك'
    },
    {
      icon: <FaUsers />,
      title: 'مجتمع المستثمرين',
      description: 'انضم إلى مجتمع من المستثمرين الناجحين'
    },
    {
      icon: <FaLightbulb />,
      title: 'فرص مبتكرة',
      description: 'اكتشف فرص استثمارية مبتكرة في قطاعات ناشئة'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'مشروع إنتاج الألبان ومشتقاتها',
      description: 'مشروع يهدف إلى إنتاج الألبان ومشتقاتها لتلبية الطلب المحلي المتزايد وتحقيق الاكتفاء الذاتي.',
      image: '/images/dairy-production.jpg',
      minInvestment: '2,500,000 دولار',
      expectedReturn: '22%',
      duration: '30 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 2,
      title: 'مشروع إنتاج الدواجن اللاحم',
      description: 'مشروع لإنتاج لحوم الدواجن بجودة عالية لتغطية احتياجات السوق المحلي وتقليل الاستيراد.',
      image: '/images/broiler-chicken-production.jpg',
      minInvestment: '1,800,000 دولار',
      expectedReturn: '20%',
      duration: '24 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 3,
      title: 'مشروع إنتاج بيض المائدة',
      description: 'مشروع لإنتاج بيض المائدة بكميات كبيرة وجودة عالية لتلبية الطلب المحلي.',
      image: '/images/table-eggs-production.jpg',
      minInvestment: '1,200,000 دولار',
      expectedReturn: '18%',
      duration: '24 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 4,
      title: 'مشروع إنتاج الأعلاف الحيوانية',
      description: 'مشروع لإنتاج الأعلاف الحيوانية لدعم قطاع الثروة الحيوانية وتحسين الإنتاجية.',
      image: '/images/animal-feed-production.jpg',
      minInvestment: '900,000 دولار',
      expectedReturn: '17%',
      duration: '18 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 5,
      title: 'مشروع زراعة وإنتاج القمح',
      description: 'مشروع لزراعة القمح في مساحات واسعة لتحقيق الأمن الغذائي.',
      image: '/images/wheat-farming.jpg',
      minInvestment: '3,000,000 دولار',
      expectedReturn: '19%',
      duration: '30 شهر',
      category: 'زراعة'
    },
    {
      id: 6,
      title: 'مشروع زراعة وإنتاج الذرة الشامية',
      description: 'مشروع لزراعة الذرة الشامية واستخدامها في الصناعات الغذائية والأعلاف.',
      image: '/images/maize-farming.jpg',
      minInvestment: '1,100,000 دولار',
      expectedReturn: '16%',
      duration: '18 شهر',
      category: 'زراعة'
    },
    {
      id: 7,
      title: 'مشروع زراعة وإنتاج القطن',
      description: 'مشروع لزراعة القطن وتوفير المادة الخام للصناعات النسيجية.',
      image: '/images/cotton-farming.jpg',
      minInvestment: '2,200,000 دولار',
      expectedReturn: '21%',
      duration: '30 شهر',
      category: 'زراعة'
    },
    {
      id: 8,
      title: 'مشروع زراعة وإنتاج البن',
      description: 'مشروع لزراعة البن اليمني الشهير وتصديره للأسواق العالمية.',
      image: '/images/coffee-farming.jpg',
      minInvestment: '1,500,000 دولار',
      expectedReturn: '25%',
      duration: '36 شهر',
      category: 'زراعة'
    },
    {
      id: 9,
      title: 'مشروع زراعة وإنتاج الفواكه (المانجو، البابايا، الموز)',
      description: 'مشروع لزراعة الفواكه الاستوائية وتوفيرها للسوق المحلي والتصدير.',
      image: '/images/fruit-farming.jpg',
      minInvestment: '1,700,000 دولار',
      expectedReturn: '20%',
      duration: '24 شهر',
      category: 'زراعة'
    },
    {
      id: 10,
      title: 'مشروع إنتاج وتعبئة العسل',
      description: 'مشروع لإنتاج وتعبئة العسل اليمني الطبيعي عالي الجودة.',
      image: '/images/honey-production.jpg',
      minInvestment: '600,000 دولار',
      expectedReturn: '30%',
      duration: '18 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 11,
      title: 'مشروع إنتاج وتعبئة التمور',
      description: 'مشروع لإنتاج وتعبئة التمور اليمنية وتصديرها.',
      image: '/images/dates-production.jpg',
      minInvestment: '800,000 دولار',
      expectedReturn: '19%',
      duration: '18 شهر',
      category: 'زراعة وصناعة غذائية'
    },
    {
      id: 12,
      title: 'مشروع إنتاج وتعبئة الأسماك',
      description: 'مشروع لإنتاج وتعبئة الأسماك الطازجة والمجمدة.',
      image: '/images/fish-processing.jpg',
      minInvestment: '1,400,000 دولار',
      expectedReturn: '23%',
      duration: '24 شهر',
      category: 'صيد وتصنيع سمكي'
    },
    {
      id: 13,
      title: 'مشروع تصنيع وتعليب الأسماك',
      description: 'مشروع لتصنيع وتعليب الأسماك وتصديرها للأسواق الخارجية.',
      image: '/images/fish-canning.jpg',
      minInvestment: '2,000,000 دولار',
      expectedReturn: '24%',
      duration: '30 شهر',
      category: 'صيد وتصنيع سمكي'
    },
    {
      id: 14,
      title: 'مشروع إنتاج وتعبئة المياه المعدنية',
      description: 'مشروع لإنتاج وتعبئة المياه المعدنية النقية.',
      image: '/images/mineral-water-production.jpg',
      minInvestment: '1,300,000 دولار',
      expectedReturn: '18%',
      duration: '18 شهر',
      category: 'صناعات غذائية'
    },
    {
      id: 15,
      title: 'مشروع صناعة الأدوية البشرية',
      description: 'مشروع لصناعة الأدوية البشرية وتغطية احتياجات السوق المحلي.',
      image: '/images/pharmaceuticals-production.jpg',
      minInvestment: '4,500,000 دولار',
      expectedReturn: '28%',
      duration: '36 شهر',
      category: 'صناعات دوائية'
    },
    {
      id: 16,
      title: 'مشروع صناعة الأدوية البيطرية',
      description: 'مشروع لصناعة الأدوية البيطرية لدعم قطاع الثروة الحيوانية.',
      image: '/images/veterinary-medicine-production.jpg',
      minInvestment: '1,000,000 دولار',
      expectedReturn: '20%',
      duration: '24 شهر',
      category: 'صناعات دوائية'
    },
    {
      id: 17,
      title: 'مشروع صناعة الزيوت النباتية',
      description: 'مشروع لصناعة الزيوت النباتية من المحاصيل المحلية.',
      image: '/images/vegetable-oil-production.jpg',
      minInvestment: '2,800,000 دولار',
      expectedReturn: '22%',
      duration: '24 شهر',
      category: 'صناعات غذائية'
    },
    {
      id: 18,
      title: 'مشروع صناعة السكر',
      description: 'مشروع لصناعة السكر من قصب السكر والبنجر.',
      image: '/images/sugar-production.jpg',
      minInvestment: '3,800,000 دولار',
      expectedReturn: '21%',
      duration: '30 شهر',
      category: 'صناعات غذائية'
    },
    {
      id: 19,
      title: 'مشروع صناعة الإسمنت',
      description: 'مشروع لصناعة الإسمنت لتلبية احتياجات قطاع البناء.',
      image: '/images/cement-production.jpg',
      minInvestment: '12,000,000 دولار',
      expectedReturn: '17%',
      duration: '36 شهر',
      category: 'صناعات إنشائية'
    },
    {
      id: 20,
      title: 'مشروع صناعة السيراميك والبلاط',
      description: 'مشروع لصناعة السيراميك والبلاط للاستخدام المحلي والتصدير.',
      image: '/images/ceramic-tiles-production.jpg',
      minInvestment: '2,600,000 دولار',
      expectedReturn: '18%',
      duration: '24 شهر',
      category: 'صناعات إنشائية'
    },
    {
      id: 21,
      title: 'محطة توليد الكهرباء الغازية',
      description: 'مشروع إنشاء محطة توليد كهرباء تعمل بالغاز الطبيعي لتوفير الطاقة الكهربائية بشكل مستدام وفعال.',
      image: '/images/gas-power-plant.jpg',
      minInvestment: '25,000,000 دولار',
      expectedReturn: '26%',
      duration: '36 شهر',
      category: 'طاقة'
    }
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>الاستثمار في المشاريع</HeroTitle>
        <HeroSubtitle>
          اكتشف فرص استثمارية استثنائية في مختلف القطاعات
          <br />
          استثمر في المستقبل مع منصة موثوق الرائدة
        </HeroSubtitle>
      </Hero>

      <StatsGrid>
        <StatCard>
          <StatNumber>150+</StatNumber>
          <StatLabel>مشروع ناجح</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>2,500+</StatNumber>
          <StatLabel>مستثمر نشط</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>85%</StatNumber>
          <StatLabel>معدل النجاح</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>1.2M</StatNumber>
          <StatLabel>ريال يمني مستثمر</StatLabel>
        </StatCard>
      </StatsGrid>

      <FeaturesSection>
        <SectionTitle>مزايا الاستثمار في المشاريع</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <SearchSection>
        <SectionTitle>البحث عن المشاريع</SectionTitle>
        <SearchForm>
          <InputGroup>
            <Label>البحث في المشاريع</Label>
            <Input
              type="text"
              placeholder="ابحث عن مشروع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>القسم</Label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">جميع الأقسام</option>
              <option value="عقارات">عقارات</option>
              <option value="طاقة">طاقة</option>
              <option value="مطاعم">مطاعم</option>
              <option value="تكنولوجيا">تكنولوجيا</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>الحد الأدنى للاستثمار</Label>
            <Input
              type="number"
              placeholder="ريال يمني"
              value={minInvestment}
              onChange={(e) => setMinInvestment(e.target.value)}
            />
          </InputGroup>
          <SearchButton>
            <FaSearch /> بحث
          </SearchButton>
        </SearchForm>
      </SearchSection>

      <SectionTitle>المشاريع المتاحة</SectionTitle>
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage image={project.image}>
              <ProjectOverlay>
                <IconButton>
                  <FaEye />
                </IconButton>
                <IconButton>
                  <FaHeart />
                </IconButton>
              </ProjectOverlay>
            </ProjectImage>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectStats>
                <ProjectStat>
                  <StatValue>{project.minInvestment}</StatValue>
                  <ProjectStatLabel>الحد الأدنى</ProjectStatLabel>
                </ProjectStat>
                <ProjectStat>
                  <StatValue>{project.expectedReturn}</StatValue>
                  <ProjectStatLabel>العائد المتوقع</ProjectStatLabel>
                </ProjectStat>
                <ProjectStat>
                  <StatValue>{project.duration}</StatValue>
                  <ProjectStatLabel>المدة</ProjectStatLabel>
                </ProjectStat>
              </ProjectStats>
              <ProjectButton>استثمر الآن</ProjectButton>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </Container>
  );
};

export default InvestmentProjects; 