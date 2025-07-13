import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUsers, FaCalendar, FaMapMarkerAlt, FaChartLine, FaFileAlt, FaCheckCircle, FaShare, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProjectContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const ProjectContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary-blue);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: var(--white);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
`;

const ProjectHeader = styled.div`
  position: relative;
  height: 300px;
  background: linear-gradient(45deg, var(--primary-blue), var(--primary-green));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  
  .project-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    z-index: 2;
  }
  
  .project-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    z-index: 2;
  }
  
  .action-button {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: var(--white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    &.active {
      background: var(--error);
    }
  }
`;

const ProjectInfo = styled.div`
  padding: 2rem;
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: var(--gray-50);
  border-radius: 0.5rem;
  
  .stat-icon {
    width: 50px;
    height: 50px;
    background: var(--light-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: var(--primary-blue);
    font-size: 1.2rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-blue);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: var(--gray-600);
    font-size: 0.9rem;
  }
`;

const ProgressSection = styled.div`
  margin-bottom: 2rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: var(--primary-blue);
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .progress-percentage {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-green);
    }
  }
  
  .progress-bar {
    width: 100%;
    height: 12px;
    background: var(--gray-200);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
    
    .progress-fill {
      height: 100%;
      background: var(--primary-green);
      border-radius: 6px;
      transition: width 0.3s ease;
    }
  }
  
  .progress-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    .detail {
      text-align: center;
      padding: 1rem;
      background: var(--gray-50);
      border-radius: 0.5rem;
      
      .value {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--primary-blue);
        margin-bottom: 0.25rem;
      }
      
      .label {
        color: var(--gray-600);
        font-size: 0.9rem;
      }
    }
  }
`;

const ProjectDescription = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--gray-700);
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const ProjectGoals = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .goals-list {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--gray-200);
      
      &:last-child {
        border-bottom: none;
      }
      
      .goal-icon {
        color: var(--primary-green);
        font-size: 1.1rem;
      }
      
      .goal-text {
        color: var(--gray-700);
        flex: 1;
      }
    }
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SubscriptionCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const SubscriptionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h3 {
    color: var(--primary-blue);
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-600);
    font-size: 0.9rem;
  }
`;

const InvestmentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  }
`;

const InvestmentSummary = styled.div`
  background: var(--gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
      font-weight: 600;
      color: var(--primary-blue);
      font-size: 1.1rem;
    }
  }
`;

const SubscribeButton = styled.button`
  background: var(--primary-green);
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
    background: #22a06b;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  
  h4 {
    color: var(--primary-blue);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-icon {
      color: var(--primary-green);
      width: 20px;
    }
    
    .info-text {
      color: var(--gray-700);
      font-size: 0.9rem;
    }
  }
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock data - replace with API call
    const mockProject = {
      id: parseInt(id),
      title: 'مشروع العقارات الفاخرة',
      description: 'مشروع استثماري فاخر في قلب صنعاء يهدف إلى تطوير مجمع سكني تجاري متكامل. المشروع يتميز بموقعه الاستراتيجي وتصميمه العصري الذي يجمع بين الفخامة والراحة.',
      longDescription: 'هذا المشروع يعد فرصة استثمارية فريدة في سوق العقارات اليمني. يتميز المشروع بموقعه الاستراتيجي في قلب العاصمة صنعاء، حيث يقع على شارع الملك فهد الرئيسي، مما يضمن سهولة الوصول وزيادة القيمة الاستثمارية.',
      goals: [
        'تطوير مجمع سكني تجاري متكامل',
        'تحقيق عائد استثماري سنوي 15-20%',
        'إكمال المشروع خلال 24 شهر',
        'توفير 200 وحدة سكنية و50 محلاً تجارياً'
      ],
      target: 2000000,
      raised: 1500000,
      investors: 150,
      daysLeft: 15,
      location: 'صنعاء، شارع الملك فهد',
      startDate: '2024-01-15',
      endDate: '2026-01-15',
      minInvestment: 10000,
      maxInvestment: 500000,
      expectedReturn: '15-20% سنوياً',
      riskLevel: 'متوسط'
    };
    
    setProject(mockProject);
  }, [id]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!investmentAmount || investmentAmount < project.minInvestment) {
      toast.error(`الحد الأدنى للاستثمار هو ${project.minInvestment.toLocaleString()} ريال`);
      return;
    }
    
    if (investmentAmount > project.maxInvestment) {
      toast.error(`الحد الأقصى للاستثمار هو ${project.maxInvestment.toLocaleString()} ريال`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('تم الاشتراك في المشروع بنجاح!');
      setIsSubscribed(true);
      navigate(`/buy-sell/${project.id}`);
    } catch (error) {
      toast.error('حدث خطأ أثناء الاشتراك في المشروع');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'تم إزالة المشروع من المفضلة' : 'تم إضافة المشروع إلى المفضلة');
  };

  const handleShare = () => {
    navigator.share({
      title: project.title,
      text: project.description,
      url: window.location.href
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('تم نسخ رابط المشروع');
    });
  };

  if (!project) {
    return <div>جاري التحميل...</div>;
  }

  const progress = (project.raised / project.target) * 100;
  const remainingAmount = project.target - project.raised;

  return (
    <ProjectContainer>
      <ProjectContent>
        <BackButton to="/dashboard">
          <FaArrowRight />
          العودة إلى لوحة التحكم
        </BackButton>

        <ProjectGrid>
          <MainContent>
            <ProjectHeader>
              <div className="project-overlay">
                <button className="action-button" onClick={handleShare}>
                  <FaShare />
                </button>
                <button 
                  className={`action-button ${isLiked ? 'active' : ''}`} 
                  onClick={handleLike}
                >
                  <FaHeart />
                </button>
              </div>
              <h1 className="project-title">{project.title}</h1>
            </ProjectHeader>

            <ProjectInfo>
              <ProjectStats>
                <StatItem>
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-value">{project.investors}</div>
                  <div className="stat-label">مستثمر</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">
                    <FaCalendar />
                  </div>
                  <div className="stat-value">{project.daysLeft}</div>
                  <div className="stat-label">يوم متبقي</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-value">{project.expectedReturn}</div>
                  <div className="stat-label">العائد المتوقع</div>
                </StatItem>
                <StatItem>
                  <div className="stat-icon">
                    <FaFileAlt />
                  </div>
                  <div className="stat-value">{project.riskLevel}</div>
                  <div className="stat-label">مستوى المخاطر</div>
                </StatItem>
              </ProjectStats>

              <ProgressSection>
                <div className="progress-header">
                  <h3>تقدم التمويل</h3>
                  <span className="progress-percentage">{progress.toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="progress-details">
                  <div className="detail">
                    <div className="value">{project.target.toLocaleString()} ريال</div>
                    <div className="label">الهدف</div>
                  </div>
                  <div className="detail">
                    <div className="value">{project.raised.toLocaleString()} ريال</div>
                    <div className="label">المجمع</div>
                  </div>
                </div>
              </ProgressSection>

              <ProjectDescription>
                <h3>وصف المشروع</h3>
                <p>{project.longDescription}</p>
              </ProjectDescription>

              <ProjectGoals>
                <h3>أهداف المشروع</h3>
                <ul className="goals-list">
                  {project.goals.map((goal, index) => (
                    <li key={index}>
                      <FaCheckCircle className="goal-icon" />
                      <span className="goal-text">{goal}</span>
                    </li>
                  ))}
                </ul>
              </ProjectGoals>
            </ProjectInfo>
          </MainContent>

          <Sidebar>
            <SubscriptionCard>
              <SubscriptionHeader>
                <h3>اشترك في المشروع</h3>
                <p>استثمر الآن واحصل على عوائد مميزة</p>
              </SubscriptionHeader>

              <InvestmentForm onSubmit={handleSubscribe}>
                <FormGroup>
                  <label>مبلغ الاستثمار (ريال)</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={`الحد الأدنى: ${project.minInvestment.toLocaleString()}`}
                    min={project.minInvestment}
                    max={project.maxInvestment}
                    required
                  />
                </FormGroup>

                <InvestmentSummary>
                  <div className="summary-row">
                    <span>مبلغ الاستثمار:</span>
                    <span>{investmentAmount ? `${parseInt(investmentAmount).toLocaleString()} ريال` : '0 ريال'}</span>
                  </div>
                  <div className="summary-row">
                    <span>العائد المتوقع:</span>
                    <span>{project.expectedReturn}</span>
                  </div>
                  <div className="summary-row">
                    <span>المدة المتوقعة:</span>
                    <span>24 شهر</span>
                  </div>
                  <div className="summary-row">
                    <span>إجمالي العائد المتوقع:</span>
                    <span>
                      {investmentAmount ? 
                        `${(parseInt(investmentAmount) * 1.15).toLocaleString()} ريال` : 
                        '0 ريال'
                      }
                    </span>
                  </div>
                </InvestmentSummary>

                <SubscribeButton type="submit" disabled={isLoading || isSubscribed}>
                  {isLoading ? 'جاري المعالجة...' : isSubscribed ? 'تم الاشتراك' : 'اشترك الآن'}
                </SubscribeButton>
              </InvestmentForm>
            </SubscriptionCard>

            <InfoCard>
              <h4>معلومات المشروع</h4>
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span className="info-text">{project.location}</span>
              </div>
              <div className="info-item">
                <FaCalendar className="info-icon" />
                <span className="info-text">تاريخ البداية: {new Date(project.startDate).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="info-item">
                <FaCalendar className="info-icon" />
                <span className="info-text">تاريخ الانتهاء: {new Date(project.endDate).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="info-item">
                <FaChartLine className="info-icon" />
                <span className="info-text">الحد الأدنى: {project.minInvestment.toLocaleString()} ريال</span>
              </div>
              <div className="info-item">
                <FaChartLine className="info-icon" />
                <span className="info-text">الحد الأقصى: {project.maxInvestment.toLocaleString()} ريال</span>
              </div>
            </InfoCard>
          </Sidebar>
        </ProjectGrid>
      </ProjectContent>
    </ProjectContainer>
  );
};

export default ProjectDetails; 