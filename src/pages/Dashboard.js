import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartLine, FaEye, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const DashboardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const WelcomeSection = styled.div`
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
    font-size: 0.9rem;
    color: var(--primary-green);
    font-weight: 500;
    
    &.negative {
      color: var(--error);
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    color: var(--primary-blue);
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const SearchFilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 3rem;
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
  
  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--white);
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
  }
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const OpportunityCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const OpportunityImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  
  .status-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    
    &.active {
      background: var(--light-green);
      color: var(--primary-green);
    }
    
    &.pending {
      background: #fef3c7;
      color: var(--warning);
    }
    
    &.completed {
      background: var(--light-blue);
      color: var(--primary-blue);
    }
  }
`;

const OpportunityContent = styled.div`
  padding: 1.5rem;
`;

const OpportunityTitle = styled.h3`
  color: var(--primary-blue);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const OpportunityDescription = styled.p`
  color: var(--gray-600);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const OpportunityStats = styled.div`
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
    }
    
    .label {
      font-size: 0.8rem;
      color: var(--gray-500);
    }
  }
`;

const ProgressBar = styled.div`
  margin-bottom: 1rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--gray-600);
  }
  
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
`;

const ActionButton = styled(Link)`
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

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockOpportunities = [
      {
        id: 1,
        title: 'مشروع العقارات الفاخرة',
        description: 'استثمار في مشروع عقاري فاخر في قلب صنعاء مع عوائد متوقعة عالية',
        status: 'active',
        progress: 75,
        target: `${(2000000 * 140).toLocaleString()} ريال يمني`,
        raised: `${(1500000 * 140).toLocaleString()} ريال يمني`,
        investors: 150,
        daysLeft: 15,
        image: 'alrawdah-project.jpg'
      },
      {
        id: 2,
        title: 'شركة المنذر بي سي للتكنولوجيا',
        description: 'استثمار في شركة تقنية واعدة تعمل على تطوير تطبيقات ذكية',
        status: 'pending',
        progress: 92,
        target: `${(500000 * 140).toLocaleString()} ريال يمني`,
        raised: `${(460000 * 140).toLocaleString()} ريال يمني`,
        investors: 89,
        daysLeft: 3
      },
      {
        id: 3,
        title: 'مشروع الطاقة المتجددة',
        description: 'استثمار في محطة طاقة شمسية في اليمن',
        status: 'active',
        progress: 67,
        target: `${(1500000 * 140).toLocaleString()} ريال يمني`,
        raised: `${(1005000 * 140).toLocaleString()} ريال يمني`,
        investors: 234,
        daysLeft: 28,
        image: 'energy.jpg'
      },
      {
        id: 4,
        title: 'مطعم عائلي مميز',
        description: 'استثمار في مطعم عائلي في أحد أفضل المواقع التجارية',
        status: 'completed',
        progress: 100,
        target: `${(800000 * 140).toLocaleString()} ريال يمني`,
        raised: `${(800000 * 140).toLocaleString()} ريال يمني`,
        investors: 120,
        daysLeft: 0,
        image: 'restaurant.jpg'
      }
    ];
    
    setOpportunities(mockOpportunities);
  }, []);

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || opportunity.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      title: 'إجمالي الاستثمارات',
      value: `${(125000 * 140).toLocaleString()} ريال يمني`,
      change: '+12.5%',
      icon: <FaChartLine />
    },
    {
      title: 'المشاريع النشطة',
      value: '8',
      change: '+2',
      icon: <FaCheckCircle />
    },
    {
      title: 'العائد السنوي',
      value: '18.5%',
      change: '+2.3%',
      icon: <FaChartLine />
    },
    {
      title: 'المشاريع المكتملة',
      value: '12',
      change: '+1',
      icon: <FaCheckCircle />
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'قيد الانتظار';
      case 'completed': return 'مكتمل';
      default: return 'غير محدد';
    }
  };

  return (
    <DashboardContainer>
      <DashboardContent>
        <DashboardHeader>
          <WelcomeSection>
            <h1>مرحباً، {user?.name || 'المستخدم'}</h1>
            <p>إليك نظرة عامة على استثماراتك والفرص المتاحة</p>
          </WelcomeSection>
        </DashboardHeader>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <div className="stat-icon">{stat.icon}</div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.change.includes('-') ? 'negative' : ''}`}>
                {stat.change}
              </div>
            </StatCard>
          ))}
        </StatsGrid>

        <SectionHeader>
          <h2>الفرص الاستثمارية المتاحة</h2>
        </SectionHeader>

        <SearchFilterBar>
          <SearchInput>
            <input
              type="text"
              placeholder="البحث في المشاريع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </SearchInput>
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="pending">قيد الانتظار</option>
            <option value="completed">مكتمل</option>
          </FilterSelect>
        </SearchFilterBar>

        <OpportunitiesGrid>
          {filteredOpportunities.map((opportunity, index) => (
            <OpportunityCard
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OpportunityImage>
                <span className={`status-badge ${opportunity.status}`}>
                  {getStatusText(opportunity.status)}
                </span>
                {opportunity.image ? (
                  <img src={`/images/${opportunity.image}`} alt={opportunity.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem'}} />
                ) : (
                  opportunity.title.split(' ')[0]
                )}
              </OpportunityImage>
              
              <OpportunityContent>
                <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                
                <OpportunityStats>
                  <div className="stat">
                    <div className="value">{opportunity.investors}</div>
                    <div className="label">مستثمر</div>
                  </div>
                  <div className="stat">
                    <div className="value">{opportunity.daysLeft}</div>
                    <div className="label">يوم متبقي</div>
                  </div>
                </OpportunityStats>
                
                <ProgressBar>
                  <div className="progress-header">
                    <span>المستهدف: {opportunity.target}</span>
                    <span>{opportunity.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${opportunity.progress}%` }}
                    />
                  </div>
                  <div className="progress-header">
                    <span>المجمع: {opportunity.raised}</span>
                  </div>
                </ProgressBar>
                
                <ActionButton to={`/project/${opportunity.id}`}>
                  <FaEye style={{ marginLeft: '0.5rem' }} />
                  عرض التفاصيل
                </ActionButton>
              </OpportunityContent>
            </OpportunityCard>
          ))}
        </OpportunitiesGrid>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default Dashboard;