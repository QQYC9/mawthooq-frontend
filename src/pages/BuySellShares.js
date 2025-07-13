import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlus, FaMinus, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BuySellContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const BuySellContent = styled.div`
  max-width: 800px;
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

const MainCard = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
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

const ProjectInfo = styled.div`
  background: var(--light-blue);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  
  .project-title {
    color: var(--primary-blue);
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .project-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    
    .stat {
      text-align: center;
      
      .value {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary-blue);
      }
      
      .label {
        font-size: 0.9rem;
        color: var(--gray-600);
      }
    }
  }
`;

const ActionTabs = styled.div`
  display: flex;
  background: var(--gray-100);
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.active {
    background: var(--white);
    color: var(--primary-blue);
    box-shadow: var(--shadow-sm);
  }
  
  &:not(.active) {
    background: transparent;
    color: var(--gray-600);
    
    &:hover {
      color: var(--primary-blue);
    }
  }
`;

const Form = styled.form`
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
  
  input {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--gray-200);
    border-radius: 0.5rem;
    font-size: 1rem;
    text-align: center;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(9, 60, 119, 0.1);
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
  
  .quantity-btn {
    width: 40px;
    height: 40px;
    border: 2px solid var(--gray-200);
    background: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: var(--primary-blue);
      color: var(--primary-blue);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .quantity-display {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-blue);
    min-width: 60px;
    text-align: center;
  }
`;

const PriceInfo = styled.div`
  background: var(--gray-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  
  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    
    &:last-child {
      margin-bottom: 0;
      padding-top: 0.75rem;
      border-top: 1px solid var(--gray-200);
      font-weight: 600;
      font-size: 1.1rem;
      color: var(--primary-blue);
    }
    
    .label {
      color: var(--gray-600);
    }
    
    .value {
      color: var(--primary-blue);
      font-weight: 500;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
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
  
  &.buy {
    background: var(--primary-green);
    color: var(--white);
    
    &:hover {
      background: #22a06b;
      transform: translateY(-1px);
    }
  }
  
  &.sell {
    background: var(--error);
    color: var(--white);
    
    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
  }
  
  &:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
  }
`;

const ConfirmationModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  
  .modal-icon {
    width: 60px;
    height: 60px;
    background: var(--light-green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: var(--primary-green);
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
    margin-bottom: 1.5rem;
  }
  
  .modal-buttons {
    display: flex;
    gap: 1rem;
    
    button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.confirm {
        background: var(--primary-green);
        color: var(--white);
        
        &:hover {
          background: #22a06b;
        }
      }
      
      &.cancel {
        background: var(--gray-200);
        color: var(--gray-700);
        
        &:hover {
          background: var(--gray-300);
        }
      }
    }
  }
`;

const BuySellShares = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [sharePrice, setSharePrice] = useState(1000);

  useEffect(() => {
    // Mock data - replace with API call
    const mockProject = {
      id: parseInt(projectId),
      title: 'مشروع العقارات الفاخرة',
      currentPrice: 1000,
      totalShares: 2000,
      availableShares: 500,
      ownedShares: 10,
      priceChange: '+5.2%',
      marketCap: '2,000,000 ريال'
    };
    
    setProject(mockProject);
    setSharePrice(mockProject.currentPrice);
  }, [projectId]);

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= project?.availableShares) {
      setQuantity(newQuantity);
      setCustomAmount((newQuantity * sharePrice).toString());
    }
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    const newQuantity = Math.floor(parseInt(value) / sharePrice);
    if (newQuantity >= 1 && newQuantity <= project?.availableShares) {
      setQuantity(newQuantity);
    }
  };

  // تم التعديل هنا: إشعار فوري عند الشراء أو البيع
  const handleAction = (action) => {
    if (action === 'sell' && quantity > project?.ownedShares) {
      toast.error('لا تملك أسهم كافية للبيع');
      return;
    }
    if (action === 'buy' && quantity > project?.availableShares) {
      toast.error('الأسهم المتاحة غير كافية');
      return;
    }
    const actionText = action === 'buy' ? 'تم الشراء بنجاح!' : 'تم البيع بنجاح!';
    toast.success(actionText);
    // إعادة تعيين النموذج
    setQuantity(1);
    setCustomAmount(sharePrice.toString());
  };

  if (!project) {
    return <div>جاري التحميل...</div>;
  }

  const totalAmount = quantity * sharePrice;

  return (
    <BuySellContainer>
      <BuySellContent>
        <BackButton to={`/project/${projectId}`}>
          <FaArrowRight />
          العودة إلى تفاصيل المشروع
        </BackButton>

        <MainCard>
          <Header>
            <h1>شراء وبيع الأسهم</h1>
            <p>تداول أسهم المشروع بسهولة وأمان</p>
          </Header>

          <ProjectInfo>
            <div className="project-title">{project.title}</div>
            <div className="project-stats">
              <div className="stat">
                <div className="value">{project.currentPrice.toLocaleString()} ريال</div>
                <div className="label">سعر السهم</div>
              </div>
              <div className="stat">
                <div className="value">{project.priceChange}</div>
                <div className="label">التغير اليومي</div>
              </div>
              <div className="stat">
                <div className="value">{project.ownedShares}</div>
                <div className="label">الأسهم المملوكة</div>
              </div>
              <div className="stat">
                <div className="value">{project.availableShares}</div>
                <div className="label">الأسهم المتاحة</div>
              </div>
            </div>
          </ProjectInfo>

          <ActionTabs>
            <TabButton
              className={activeTab === 'buy' ? 'active' : ''}
              onClick={() => setActiveTab('buy')}
            >
              شراء أسهم
            </TabButton>
            <TabButton
              className={activeTab === 'sell' ? 'active' : ''}
              onClick={() => setActiveTab('sell')}
            >
              بيع أسهم
            </TabButton>
          </ActionTabs>

          <Form>
            <FormGroup>
              <label>عدد الأسهم</label>
              <QuantitySelector>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <div className="quantity-display">{quantity}</div>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (activeTab === 'buy' ? project.availableShares : project.ownedShares)}
                >
                  <FaPlus />
                </button>
              </QuantitySelector>
            </FormGroup>

            <FormGroup>
              <label>المبلغ الإجمالي (ريال)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="أدخل المبلغ"
              />
            </FormGroup>

            <PriceInfo>
              <div className="price-row">
                <span className="label">سعر السهم:</span>
                <span className="value">{sharePrice.toLocaleString()} ريال</span>
              </div>
              <div className="price-row">
                <span className="label">عدد الأسهم:</span>
                <span className="value">{quantity}</span>
              </div>
              <div className="price-row">
                <span className="label">العمولة:</span>
                <span className="value">{(totalAmount * 0.01).toLocaleString()} ريال (1%)</span>
              </div>
              <div className="price-row">
                <span className="label">الإجمالي:</span>
                <span className="value">{(totalAmount * 1.01).toLocaleString()} ريال</span>
              </div>
            </PriceInfo>

            <ActionButtons>
              <ActionButton
                type="button"
                className={activeTab}
                onClick={() => handleAction(activeTab)}
                disabled={isLoading}
              >
                {isLoading ? (
                  'جاري المعالجة...'
                ) : (
                  <>
                    {activeTab === 'buy' ? <FaPlus /> : <FaMinus />}
                    {activeTab === 'buy' ? 'شراء الأسهم' : 'بيع الأسهم'}
                  </>
                )}
              </ActionButton>
            </ActionButtons>
          </Form>
        </MainCard>

        {showConfirmation && (
          <ConfirmationModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <div className="modal-icon">
                <FaCheckCircle />
              </div>
              <h3>تأكيد العملية</h3>
              <p>
                هل أنت متأكد من {activeTab === 'buy' ? 'شراء' : 'بيع'} {quantity} سهم 
                بقيمة {(totalAmount * 1.01).toLocaleString()} ريال؟
              </p>
              <div className="modal-buttons">
                <button className="cancel" onClick={() => setShowConfirmation(false)}>
                  إلغاء
                </button>
                <button className="confirm" onClick={confirmAction}>
                  تأكيد
                </button>
              </div>
            </ModalContent>
          </ConfirmationModal>
        )}
      </BuySellContent>
    </BuySellContainer>
  );
};

export default BuySellShares; 