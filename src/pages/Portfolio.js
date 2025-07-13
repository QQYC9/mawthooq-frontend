import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine, FaWallet, FaArrowUp, FaEye, FaDownload } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const PortfolioContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PortfolioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-blue);
    font-size: 2rem;
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ExportButton = styled.button`
  background: var(--primary-blue);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--secondary-blue);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: var(--white);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .stat-title {
      color: var(--gray-600);
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .stat-icon {
      width: 40px;
      height: 40px;
      background: var(--light-blue);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-blue);
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
  }
  
  .stat-change {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    
    &.positive {
      color: var(--primary-green);
    }
    
    &.negative {
      color: var(--error);
    }
  }
`;

const ChartSection = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;

const InvestmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InvestmentCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  .investment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .investment-title {
      color: var(--primary-blue);
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .investment-status {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      font-weight: 500;
      
      &.active {
        background: var(--light-green);
        color: var(--primary-green);
      }
      
      &.completed {
        background: var(--light-blue);
        color: var(--primary-blue);
      }
    }
  }
  
  .investment-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .stat {
      text-align: center;
      
      .value {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary-blue);
        margin-bottom: 0.25rem;
      }
      
      .label {
        font-size: 0.8rem;
        color: var(--gray-500);
      }
    }
  }
  
  .investment-progress {
    margin-bottom: 1rem;
    
    .progress-bar {
      width: 100%;
      height: 6px;
      background: var(--gray-200);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.5rem;
      
      .progress-fill {
        height: 100%;
        background: var(--primary-green);
        border-radius: 3px;
        transition: width 0.3s ease;
      }
    }
    
    .progress-text {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--gray-600);
    }
  }
  
  .investment-actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.view {
        background: var(--light-blue);
        color: var(--primary-blue);
        
        &:hover {
          background: var(--primary-blue);
          color: var(--white);
        }
      }
      
      &.trade {
        background: var(--primary-green);
        color: var(--white);
        
        &:hover {
          background: #22a06b;
        }
      }
    }
  }
`;

const TransactionsSection = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  select {
    padding: 0.5rem 1rem;
    border: 2px solid var(--gray-200);
    border-radius: 0.5rem;
    background: var(--white);
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
    }
  }
`;

const TransactionsTable = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: right;
      border-bottom: 1px solid var(--gray-200);
    }
    
    th {
      background: var(--gray-50);
      color: var(--gray-700);
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    td {
      color: var(--gray-700);
      
      &.amount {
        font-weight: 600;
        
        &.positive {
          color: var(--primary-green);
        }
        
        &.negative {
          color: var(--error);
        }
      }
      
      &.status {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        
        &.completed {
          background: var(--light-green);
          color: var(--primary-green);
        }
        
        &.pending {
          background: #fef3c7;
          color: var(--warning);
        }
        
        &.failed {
          background: #fee2e2;
          color: var(--error);
        }
      }
    }
  }
`;

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockPortfolioData = {
      totalBalance: 125000 * 140,
      totalInvested: 100000 * 140,
      totalProfit: 25000 * 140,
      profitPercentage: 25,
      chartData: [
        { month: 'يناير', value: 100000 * 140 },
        { month: 'فبراير', value: 105000 * 140 },
        { month: 'مارس', value: 110000 * 140 },
        { month: 'أبريل', value: 115000 * 140 },
        { month: 'مايو', value: 120000 * 140 },
        { month: 'يونيو', value: 125000 * 140 }
      ],
      investments: [
        {
          id: 1,
          title: 'مشروع العقارات الفاخرة',
          status: 'active',
          invested: 50000 * 140,
          currentValue: 62500 * 140,
          profit: 12500 * 140,
          profitPercentage: 25,
          shares: 50,
          progress: 75
        },
        {
          id: 2,
          title: 'شركة المنذر بي سي للتكنولوجيا',
          status: 'active',
          invested: 30000 * 140,
          currentValue: 33000 * 140,
          profit: 3000 * 140,
          profitPercentage: 10,
          shares: 30,
          progress: 92
        },
        {
          id: 3,
          title: 'مشروع الطاقة المتجددة',
          status: 'completed',
          invested: 20000 * 140,
          currentValue: 29500 * 140,
          profit: 9500 * 140,
          profitPercentage: 47.5,
          shares: 20,
          progress: 100
        }
      ]
    };

    const mockTransactions = [
      {
        id: 1,
        type: 'buy',
        project: 'مشروع العقارات الفاخرة',
        amount: 50000 * 140,
        shares: 50,
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'buy',
        project: 'شركة المنذر بي سي للتكنولوجيا',
        amount: 30000 * 140,
        shares: 30,
        date: '2024-02-01',
        status: 'completed'
      },
      {
        id: 3,
        type: 'buy',
        project: 'مشروع الطاقة المتجددة',
        amount: 20000 * 140,
        shares: 20,
        date: '2024-03-10',
        status: 'completed'
      },
      {
        id: 4,
        type: 'sell',
        project: 'مشروع الطاقة المتجددة',
        amount: 29500 * 140,
        shares: 20,
        date: '2024-06-15',
        status: 'completed'
      }
    ];

    setPortfolioData(mockPortfolioData);
    setTransactions(mockTransactions);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.type === filterType;
  });

  const exportPortfolio = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-report.json';
    link.click();
  };

  if (!portfolioData) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <PortfolioContainer>
      <PortfolioContent>
        <PortfolioHeader>
          <h1>المحفظة الاستثمارية</h1>
          <ExportButton onClick={exportPortfolio}>
            <FaDownload />
            تصدير التقرير
          </ExportButton>
        </PortfolioHeader>

        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="stat-header">
              <span className="stat-title">إجمالي الرصيد</span>
              <div className="stat-icon">
                <FaWallet />
              </div>
            </div>
            <div className="stat-value">{portfolioData.totalBalance.toLocaleString()} ريال يمني</div>
            <div className="stat-change positive">
              <FaArrowUp />
              +{portfolioData.profitPercentage}%
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="stat-header">
              <span className="stat-title">إجمالي الاستثمارات</span>
              <div className="stat-icon">
                <FaChartLine />
              </div>
            </div>
            <div className="stat-value">{portfolioData.totalInvested.toLocaleString()} ريال يمني</div>
            <div className="stat-change">
              المبلغ المستثمر
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="stat-header">
              <span className="stat-title">إجمالي الأرباح</span>
              <div className="stat-icon">
                <FaChartLine />
              </div>
            </div>
            <div className="stat-value">{portfolioData.totalProfit.toLocaleString()} ريال يمني</div>
            <div className="stat-change positive">
              <FaArrowUp />
              +{portfolioData.profitPercentage}%
            </div>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="stat-header">
              <span className="stat-title">عدد المشاريع</span>
              <div className="stat-icon">
                <FaChartLine />
              </div>
            </div>
            <div className="stat-value">{portfolioData.investments.length}</div>
            <div className="stat-change">
              مشاريع نشطة
            </div>
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <h3>تطور المحفظة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioData.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString()} ريال يمني`} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getComputedStyle(document.documentElement).getPropertyValue('--primary-blue')}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        <SectionHeader>
          <h3>الاستثمارات الحالية</h3>
        </SectionHeader>

        <InvestmentsGrid>
          {portfolioData.investments.map((investment, index) => (
            <InvestmentCard
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="investment-header">
                <div className="investment-title">{investment.title}</div>
                <div className={`investment-status ${investment.status}`}>
                  {investment.status === 'active' ? 'نشط' : 'مكتمل'}
                </div>
              </div>

              <div className="investment-stats">
                <div className="stat">
                  <div className="value">{investment.invested.toLocaleString()} ريال يمني</div>
                  <div className="label">المستثمر</div>
                </div>
                <div className="stat">
                  <div className="value">{investment.currentValue.toLocaleString()} ريال يمني</div>
                  <div className="label">القيمة الحالية</div>
                </div>
                <div className="stat">
                  <div className="value">{investment.profit.toLocaleString()} ريال يمني</div>
                  <div className="label">الربح</div>
                </div>
                <div className="stat">
                  <div className="value">{investment.shares}</div>
                  <div className="label">الأسهم</div>
                </div>
              </div>

              <div className="investment-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${investment.progress}%` }}
                  />
                </div>
                <div className="progress-text">
                  <span>التقدم: {investment.progress}%</span>
                  <span>+{investment.profitPercentage}% ربح</span>
                </div>
              </div>

              <div className="investment-actions">
                <button className="view">
                  <FaEye />
                  عرض التفاصيل
                </button>
                <button className="trade">
                  تداول
                </button>
              </div>
            </InvestmentCard>
          ))}
        </InvestmentsGrid>

        <TransactionsSection>
          <SectionHeader>
            <h3>سجل المعاملات</h3>
            <FilterBar>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">جميع المعاملات</option>
                <option value="buy">الشراء</option>
                <option value="sell">البيع</option>
              </select>
            </FilterBar>
          </SectionHeader>

          <TransactionsTable>
            <table>
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>نوع العملية</th>
                  <th>المشروع</th>
                  <th>عدد الأسهم</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString('ar-SA')}</td>
                    <td>
                      <span style={{ 
                        color: transaction.type === 'buy' ? 'var(--primary-green)' : 'var(--error)',
                        fontWeight: '600'
                      }}>
                        {transaction.type === 'buy' ? 'شراء' : 'بيع'}
                      </span>
                    </td>
                    <td>{transaction.project}</td>
                    <td>{transaction.shares}</td>
                    <td className={`amount ${transaction.type === 'buy' ? 'negative' : 'positive'}`}>
                      {transaction.type === 'buy' ? '-' : '+'}{transaction.amount.toLocaleString()} ريال يمني
                    </td>
                    <td>
                      <span className={`status ${transaction.status}`}>
                        {transaction.status === 'completed' ? 'مكتمل' : 
                         transaction.status === 'pending' ? 'قيد المعالجة' : 'فشل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TransactionsTable>
        </TransactionsSection>
      </PortfolioContent>
    </PortfolioContainer>
  );
};

export default Portfolio; 