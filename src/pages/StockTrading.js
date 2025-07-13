import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExchangeAlt, FaChartLine, FaDollarSign, FaClock, FaArrowUp, FaArrowDown, FaEye, FaHeart, FaShare, FaCalculator, FaHistory, FaBell } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  direction: rtl;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
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

const TradingStats = styled.div`
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
  color: #ff6b6b;
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
    background: linear-gradient(90deg, #ff6b6b, #ee5a24);
    border-radius: 2px;
  }
`;

const TradingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TradingCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`;

const TradingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TradingIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.type === 'buy' ? 'linear-gradient(135deg, #11998e, #38ef7d)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const TradingTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
    border-color: #ff6b6b;
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
    border-color: #ff6b6b;
  }
`;

const TradingButton = styled.button`
  padding: 1rem;
  background: ${props => props.type === 'buy' ? 'linear-gradient(135deg, #11998e, #38ef7d)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)'};
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

const StocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StockCard = styled.div`
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

const StockHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #e1e5e9;
`;

const StockTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const StockInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StockPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b6b;
`;

const StockChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? '#11998e' : '#e74c3c'};
  font-weight: bold;
`;

const StockActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.variant === 'primary' ? '#ff6b6b' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#ff6b6b'};
  border: 2px solid #ff6b6b;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff6b6b;
    color: white;
  }
`;

const StockContent = styled.div`
  padding: 1.5rem;
`;

const StockStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StockStat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

const StockStatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ToolsSection = styled.div`
  margin-bottom: 3rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ToolCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ToolIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
`;

const ToolTitle = styled.h3`
  font-size: 1.2rem;
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
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
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

const StockTrading = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [selectedStock, setSelectedStock] = useState('');

  const stocks = [
    {
      id: 1,
      name: 'مجمع العقارات الفاخرة',
      symbol: 'MTHQ-RE',
      price: '700,000', // 5,000 * 140
      change: '+35,000', // 250 * 140
      changePercent: '+5.3%',
      positive: true,
      volume: '1,250',
      marketCap: '7M', // 50M * 140 = 7,000M, لكن سنبقيها رمزية أو نوضح لاحقاً
    },
    {
      id: 2,
      name: 'مشروع الطاقة المتجددة',
      symbol: 'MTHQ-EN',
      price: '840,000', // 6,000 * 140
      change: '-25,200', // 180 * 140
      changePercent: '-2.9%',
      positive: false,
      volume: '890',
      marketCap: '8.4M', // 60M * 140 = 8,400M
    },
    {
      id: 3,
      name: 'مطعم عائلي مميز',
      symbol: 'MTHQ-RS',
      price: '588,000', // 4,200 * 140
      change: '+44,800', // 320 * 140
      changePercent: '+8.2%',
      positive: true,
      volume: '2,100',
      marketCap: '5.88M', // 42M * 140 = 5,880M
    }
  ];

  const tools = [
    {
      icon: <FaChartLine />,
      title: 'تحليل فني',
      description: 'احصل على تحليل فني متقدم مع مؤشرات ومخططات تفاعلية',
      action: 'عرض التحليل'
    },
    {
      icon: <FaCalculator />,
      title: 'حاسبة الربح',
      description: 'احسب أرباحك المحتملة والخسائر قبل التداول',
      action: 'استخدام الحاسبة'
    },
    {
      icon: <FaHistory />,
      title: 'سجل المعاملات',
      description: 'راجع تاريخ جميع معاملاتك وأداء استثماراتك',
      action: 'عرض السجل'
    },
    {
      icon: <FaBell />,
      title: 'تنبيهات السعر',
      description: 'اضبط تنبيهات لمراقبة أسعار الأسهم المفضلة',
      action: 'إعداد التنبيهات'
    }
  ];

  return (
    <Container>
      <Hero>
        <HeroTitle>شراء وبيع الأسهم</HeroTitle>
        <HeroSubtitle>
          تداول الأسهم بسهولة وأمان
          <br />
          استفد من فرص السوق وابني ثروتك
        </HeroSubtitle>
      </Hero>

      <TradingStats>
        <StatCard>
          <StatNumber>1,250+</StatNumber>
          <StatLabel>معاملة اليوم</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>85M</StatNumber>
          <StatLabel>حجم التداول</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>150+</StatNumber>
          <StatLabel>سهم متاح</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>24/7</StatNumber>
          <StatLabel>تداول مستمر</StatLabel>
        </StatCard>
      </TradingStats>

      <TradingSection>
        <TradingCard>
          <TradingHeader>
            <TradingIcon type="buy">
              <FaArrowUp />
            </TradingIcon>
            <TradingTitle>شراء أسهم</TradingTitle>
          </TradingHeader>
          <Form>
            <InputGroup>
              <Label>اختر السهم</Label>
              <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
                <option value="">اختر سهم...</option>
                {stocks.map(stock => (
                  <option key={stock.id} value={stock.id}>{stock.name} ({stock.symbol})</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>عدد الأسهم</Label>
              <Input
                type="number"
                placeholder="أدخل عدد الأسهم"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>سعر السهم</Label>
              <Input
                type="text"
                placeholder="سعر السهم الحالي"
                readOnly
                value={selectedStock ? stocks.find(s => s.id == selectedStock)?.price + ' ريال يمني' : ''}
              />
            </InputGroup>
            <TradingButton type="buy">
              <FaArrowUp /> شراء الأسهم
            </TradingButton>
          </Form>
        </TradingCard>

        <TradingCard>
          <TradingHeader>
            <TradingIcon type="sell">
              <FaArrowDown />
            </TradingIcon>
            <TradingTitle>بيع أسهم</TradingTitle>
          </TradingHeader>
          <Form>
            <InputGroup>
              <Label>اختر السهم</Label>
              <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
                <option value="">اختر سهم...</option>
                {stocks.map(stock => (
                  <option key={stock.id} value={stock.id}>{stock.name} ({stock.symbol})</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>عدد الأسهم</Label>
              <Input
                type="number"
                placeholder="أدخل عدد الأسهم"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>سعر السهم</Label>
              <Input
                type="text"
                placeholder="سعر السهم الحالي"
                readOnly
                value={selectedStock ? stocks.find(s => s.id == selectedStock)?.price + ' ريال يمني' : ''}
              />
            </InputGroup>
            <TradingButton type="sell">
              <FaArrowDown /> بيع الأسهم
            </TradingButton>
          </Form>
        </TradingCard>
      </TradingSection>

      <SectionTitle>الأسهم المتاحة للتداول</SectionTitle>
      <StocksGrid>
        {stocks.map((stock) => (
          <StockCard key={stock.id}>
            <StockHeader>
              <StockTitle>{stock.name}</StockTitle>
              <StockInfo>
                <StockPrice>{stock.price} ريال يمني</StockPrice>
                <StockChange positive={stock.positive}>
                  {stock.positive ? <FaArrowUp /> : <FaArrowDown />}
                  {stock.change} ({stock.changePercent})
                </StockChange>
              </StockInfo>
              <StockActions>
                <ActionButton variant="primary">
                  <FaExchangeAlt /> تداول
                </ActionButton>
                <ActionButton>
                  <FaEye /> عرض
                </ActionButton>
                <ActionButton>
                  <FaHeart /> مفضلة
                </ActionButton>
              </StockActions>
            </StockHeader>
            <StockContent>
              <StockStats>
                <StockStat>
                  <StatValue>{stock.volume}</StatValue>
                  <StockStatLabel>حجم التداول</StockStatLabel>
                </StockStat>
                <StockStat>
                  <StatValue>{stock.marketCap}</StatValue>
                  <StockStatLabel>القيمة السوقية</StockStatLabel>
                </StockStat>
              </StockStats>
            </StockContent>
          </StockCard>
        ))}
      </StocksGrid>

      <ToolsSection>
        <SectionTitle>أدوات التداول</SectionTitle>
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
    </Container>
  );
};

export default StockTrading; 