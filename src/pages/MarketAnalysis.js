import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChartLine, FaArrowUp, FaArrowDown, FaSearch, FaFilter, FaDownload, FaEye, FaBell, FaCalculator, FaHistory, FaLightbulb, FaGlobe } from 'react-icons/fa';

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

const MarketOverview = styled.div`
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
    background: ${props => props.color || 'linear-gradient(90deg, #667eea, #764ba2)'};
  }
`;

const OverviewValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
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
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const AnalysisTools = styled.div`
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
  background: linear-gradient(135deg, #667eea, #764ba2);
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

const MarketTable = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin-bottom: 3rem;
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
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
  color: #667eea;
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

const MarketAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sector, setSector] = useState('');
  const [timeframe, setTimeframe] = useState('');

  const marketData = [
    {
      id: 1,
      sector: 'عقارات',
      index: 'MTHQ-RE',
      value: '175,000', // 1,250 * 140
      change: '+6,300', // 45 * 140
      changePercent: '+3.7%',
      positive: true,
      volume: '2.5M',
      trend: 'صاعد'
    },
    {
      id: 2,
      sector: 'طاقة',
      index: 'MTHQ-EN',
      value: '137,200', // 980 * 140
      change: '-4,480', // 32 * 140
      changePercent: '-3.2%',
      positive: false,
      volume: '1.8M',
      trend: 'هابط'
    },
    {
      id: 3,
      sector: 'مطاعم',
      index: 'MTHQ-RS',
      value: '203,000', // 1,450 * 140
      change: '+10,920', // 78 * 140
      changePercent: '+5.7%',
      positive: true,
      volume: '3.2M',
      trend: 'صاعد'
    },
    {
      id: 4,
      sector: 'تكنولوجيا',
      index: 'MTHQ-TECH',
      value: '294,000', // 2,100 * 140
      change: '+16,800', // 120 * 140
      changePercent: '+6.1%',
      positive: true,
      volume: '4.5M',
      trend: 'صاعد'
    }
  ];

  const tools = [
    {
      icon: <FaChartLine />,
      title: 'التحليل الفني',
      description: 'احصل على تحليل فني متقدم مع مؤشرات ومخططات تفاعلية',
      action: 'عرض التحليل'
    },
    {
      icon: <FaArrowUp />,
      title: 'مؤشرات السوق',
      description: 'راقب مؤشرات السوق الرئيسية وتوقعات الأداء',
      action: 'عرض المؤشرات'
    },
    {
      icon: <FaCalculator />,
      title: 'حاسبة المخاطر',
      description: 'احسب مخاطر الاستثمار والعوائد المتوقعة',
      action: 'استخدام الحاسبة'
    },
    {
      icon: <FaHistory />,
      title: 'التحليل التاريخي',
      description: 'راجع الأداء التاريخي للأسواق والمشاريع',
      action: 'عرض التاريخ'
    },
    {
      icon: <FaLightbulb />,
      title: 'توصيات الاستثمار',
      description: 'احصل على توصيات استثمارية مدروسة',
      action: 'عرض التوصيات'
    },
    {
      icon: <FaGlobe />,
      title: 'تحليل القطاعات',
      description: 'حلل أداء مختلف القطاعات الاقتصادية',
      action: 'عرض التحليل'
    }
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>تحليل السوق</HeroTitle>
        <HeroSubtitle>
          أدوات تحليل متقدمة لفهم اتجاهات السوق
          <br />
          اتخذ قرارات استثمارية مدروسة بناءً على البيانات
        </HeroSubtitle>
      </Hero>

      <MarketOverview>
        <OverviewCard color="linear-gradient(90deg, #667eea, #764ba2)">
          <OverviewValue>1,250</OverviewValue>
          <OverviewLabel>مؤشر السوق الرئيسي</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> +3.2% اليوم
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #11998e, #38ef7d)">
          <OverviewValue>85%</OverviewValue>
          <OverviewLabel>معدل النمو السنوي</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> +5.1% عن العام الماضي
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #f093fb, #f5576c)">
          <OverviewValue>12.5M</OverviewValue>
          <OverviewLabel>حجم التداول اليومي</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> +8.3% هذا الأسبوع
          </OverviewChange>
        </OverviewCard>
        <OverviewCard color="linear-gradient(90deg, #4facfe, #00f2fe)">
          <OverviewValue>4</OverviewValue>
          <OverviewLabel>القطاعات النشطة</OverviewLabel>
          <OverviewChange positive>
            <FaArrowUp /> جميعها إيجابية
          </OverviewChange>
        </OverviewCard>
      </MarketOverview>

      <SearchSection>
        <SectionTitle>البحث والفلترة</SectionTitle>
        <SearchForm>
          <InputGroup>
            <Label>البحث في المؤشرات</Label>
            <Input
              type="text"
              placeholder="ابحث عن مؤشر أو قطاع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>القطاع</Label>
            <Select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">جميع القطاعات</option>
              <option value="عقارات">عقارات</option>
              <option value="طاقة">طاقة</option>
              <option value="مطاعم">مطاعم</option>
              <option value="تكنولوجيا">تكنولوجيا</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>الفترة الزمنية</Label>
            <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="">جميع الفترات</option>
              <option value="1D">يوم واحد</option>
              <option value="1W">أسبوع</option>
              <option value="1M">شهر</option>
              <option value="3M">3 أشهر</option>
              <option value="1Y">سنة</option>
            </Select>
          </InputGroup>
          <SearchButton>
            <FaSearch /> بحث
          </SearchButton>
        </SearchForm>
      </SearchSection>

      <AnalysisTools>
        <SectionTitle>أدوات التحليل</SectionTitle>
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
      </AnalysisTools>

      <MarketTable>
        <TableHeader>
          <TableTitle>مؤشرات السوق</TableTitle>
          <TableActions>
            <ActionButton>
              <FaFilter /> فلترة
            </ActionButton>
            <ActionButton>
              <FaDownload /> تصدير
            </ActionButton>
            <ActionButton>
              <FaBell /> تنبيهات
            </ActionButton>
          </TableActions>
        </TableHeader>
        <Table>
          <thead>
            <tr>
              <Th>القطاع</Th>
              <Th>المؤشر</Th>
              <Th>القيمة</Th>
              <Th>التغير</Th>
              <Th>حجم التداول</Th>
              <Th>الاتجاه</Th>
              <Th>الإجراءات</Th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((item) => (
              <tr key={item.id}>
                <Td>{item.sector}</Td>
                <Td>{item.index}</Td>
                <TdValue>{item.value} ريال يمني</TdValue>
                <TdChange positive={item.positive}>
                  {item.change} ({item.changePercent})
                </TdChange>
                <Td>{item.volume}</Td>
                <Td>{item.trend}</Td>
                <Td>
                  <ActionButton>
                    <FaEye /> عرض
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MarketTable>

      <ChartSection>
        <SectionTitle>تحليل الاتجاهات</SectionTitle>
        <ChartPlaceholder>
          <div>
            <FaChartLine style={{ fontSize: '3rem', marginBottom: '1rem', color: '#667eea' }} />
            <div>مخطط تفاعلي لتحليل اتجاهات السوق</div>
            <div style={{ fontSize: '1rem', marginTop: '0.5rem', opacity: 0.7 }}>
              سيتم عرض المخطط هنا مع بيانات حقيقية
            </div>
          </div>
        </ChartPlaceholder>
      </ChartSection>
    </Container>
  );
};

export default MarketAnalysis; 