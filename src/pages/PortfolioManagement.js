import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChartPie, FaArrowUp, FaShieldAlt, FaDollarSign, FaCalculator, FaHistory, FaEye, FaDownload, FaFilter, FaSync } from 'react-icons/fa';

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

const PortfolioOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const OverviewCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || 'linear-gradient(90deg, #11998e, #38ef7d)'};
  }
`;

const OverviewValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #11998e;
  margin-bottom: 0.5rem;
`;

const OverviewLabel = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const OverviewChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#11998e' : '#e74c3c'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

const ToolsSection = styled.div`
  margin-bottom: 3rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ToolCard = styled.div`
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

const ToolIcon = styled.div`
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

const ToolTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ToolDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ToolButton = styled.button`
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

const PortfolioTable = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin-bottom: 3rem;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const TableActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: right;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  color: #333;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e1e5e9;
  color: #666;
`;

const TdValue = styled(Td)`
  font-weight: bold;
  color: #11998e;
`;

const TdChange = styled(Td)`
  color: ${props => props.positive ? '#11998e' : '#e74c3c'};
  font-weight: bold;
`;

const ChartSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin-bottom: 3rem;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
  border: 2px dashed #dee2e6;
`;

const PortfolioManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');

  const portfolioData = [
    {
      id: 1,
      asset: 'مجمع العقارات الفاخرة',
      type: 'عقارات',
      value: '8,750,000',
      shares: '50',
      change: '+25%',
      positive: true
    },
    {
      id: 2,
      asset: 'شركة المنذر بي سي للتكنولوجيا',
      type: 'تكنولوجيا',
      value: '4,620,000',
      shares: '30',
      change: '+10%',
      positive: true
    },
    {
      id: 3,
      asset: 'مشروع الطاقة المتجددة',
      type: 'طاقة',
      value: '4,130,000',
      shares: '20',
      change: '+47.5%',
      positive: true
    }
  ];

  const tools = [
    {
      icon: <FaChartPie />,
      title: 'تحليل التوزيع',
      description: 'احصل على تحليل مفصل لتوزيع استثماراتك عبر القطاعات المختلفة',
      action: 'عرض التحليل'
    },
    {
      icon: <FaArrowUp />,
      title: 'مؤشرات الأداء',
      description: 'راقب أداء محفظتك مع مؤشرات متقدمة ومقارنات مع السوق',
      action: 'عرض المؤشرات'
    },
    {
      icon: <FaShieldAlt />,
      title: 'إدارة المخاطر',
      description: 'حلل مخاطر محفظتك واحصل على توصيات لتحسين التوازن',
      action: 'تحليل المخاطر'
    },
    {
      icon: <FaCalculator />,
      title: 'حاسبة العوائد',
      description: 'احسب العوائد المتوقعة والمحتملة لمختلف سيناريوهات الاستثمار',
      action: 'استخدام الحاسبة'
    },
    {
      icon: <FaHistory />,
      title: 'السجل التاريخي',
      description: 'راجع تاريخ جميع المعاملات والأداء عبر الزمن',
      action: 'عرض السجل'
    },
    {
      icon: <FaDollarSign />,
      title: 'توقعات الربح',
      description: 'احصل على توقعات مفصلة لأرباحك المستقبلية بناءً على الأداء الحالي',
      action: 'عرض التوقعات'
    }
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>إدارة المحفظة</HeroTitle>
        <HeroSubtitle>
          أدوات متقدمة لإدارة محفظتك الاستثمارية
          <br />
          راقب أداءك واتخذ قرارات مدروسة
        </HeroSubtitle>
      </Hero>

      <PortfolioOverview>
        <OverviewCard color="linear-gradient(90deg, #11998e, #38ef7d)">
          <OverviewValue>17,500,000 ريال يمني</OverviewValue>
          <OverviewLabel>إجمالي قيمة المحفظة</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> موحد مع صفحة المحفظة الاستثمارية
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #667eea, #764ba2)">
          <OverviewValue>1,000</OverviewValue>
          <OverviewLabel>إجمالي الأسهم</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> +50 سهم جديد
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #f093fb, #f5576c)">
          <OverviewValue>18.7%</OverviewValue>
          <OverviewLabel>متوسط العائد السنوي</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> +2.3% عن العام الماضي
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #4facfe, #00f2fe)">
          <OverviewValue>3</OverviewValue>
          <OverviewLabel>المشاريع النشطة</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> جميعها مربحة
          </OverviewChange>
        </OverviewCard>
      </PortfolioOverview>

      <ToolsSection>
        <SectionTitle>أدوات إدارة المحفظة</SectionTitle>
        <ToolsGrid>
          {tools.map((tool, index) => (
            <ToolCard key={index}>
              <ToolIcon>{tool.icon}</ToolIcon>
              <ToolTitle>{tool.title}</ToolTitle>
              <ToolDescription>{tool.description}</ToolDescription>
              <ToolButton>{tool.action}</ToolButton>
            </ToolCard>
          ))}
        </ToolsGrid>
      </ToolsSection>

      <PortfolioTable>
        <TableHeader>
          <TableTitle>تفاصيل المحفظة</TableTitle>
          <TableActions>
            <ActionButton>
              <FaFilter /> فلترة
            </ActionButton>
            <ActionButton>
              <FaDownload /> تصدير
            </ActionButton>
            <ActionButton>
              <FaSync /> تحديث
            </ActionButton>
          </TableActions>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <Th>الأصل</Th>
              <Th>النوع</Th>
              <Th>القيمة الحالية</Th>
              <Th>عدد الأسهم</Th>
              <Th>التغير</Th>
              <Th>الإجراءات</Th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map((item) => (
              <tr key={item.id}>
                <Td>{item.asset}</Td>
                <Td>{item.type}</Td>
                <TdValue>{item.value} ريال يمني</TdValue>
                <Td>{item.shares}</Td>
                <TdChange positive={item.positive}>
                  {item.change}
                </TdChange>
                <Td>
                  <ActionButton>
                    <FaEye /> عرض
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </PortfolioTable>

      <ChartSection>
        <SectionTitle>تحليل أداء المحفظة</SectionTitle>
        <ChartPlaceholder>
          <div>
            <FaChartPie style={{ fontSize: '3rem', marginBottom: '1rem', color: '#11998e' }} />
            <div>مخطط تفاعلي لأداء المحفظة</div>
            <div style={{ fontSize: '1rem', marginTop: '0.5rem', opacity: 0.7 }}>
              سيتم عرض المخطط هنا مع بيانات حقيقية
            </div>
          </div>
        </ChartPlaceholder>
      </ChartSection>
    </Container>
  );
};

export default PortfolioManagement; 