import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaTrash, FaEye } from 'react-icons/fa';

const NotificationsContainer = styled.div`
  min-height: 100vh;
  background: var(--gray-50);
  padding: 2rem 1rem;
`;

const NotificationsContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-blue);
    font-size: 2rem;
    font-weight: 700;
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
    
    button {
      background: var(--primary-blue);
      color: var(--white);
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s ease;
      
      &:hover {
        background: var(--secondary-blue);
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  background: var(--white);
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
`;

const FilterTab = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.active {
    background: var(--primary-blue);
    color: var(--white);
  }
  
  &:not(.active) {
    background: transparent;
    color: var(--gray-600);
    
    &:hover {
      color: var(--primary-blue);
    }
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled(motion.div)`
  background: var(--white);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &.unread {
    border-right: 4px solid var(--primary-blue);
    background: var(--light-blue);
  }
  
  .notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .notification-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .notification-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        
        &.success {
          background: var(--light-green);
          color: var(--primary-green);
        }
        
        &.info {
          background: var(--light-blue);
          color: var(--primary-blue);
        }
        
        &.warning {
          background: #fef3c7;
          color: var(--warning);
        }
        
        &.error {
          background: #fee2e2;
          color: var(--error);
        }
      }
      
      .title-text {
        color: var(--primary-blue);
        font-weight: 600;
        font-size: 1.1rem;
      }
    }
    
    .notification-time {
      color: var(--gray-500);
      font-size: 0.9rem;
    }
  }
  
  .notification-content {
    color: var(--gray-700);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .notification-actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      
      &.view {
        background: var(--primary-blue);
        color: var(--white);
        
        &:hover {
          background: var(--secondary-blue);
        }
      }
      
      &.delete {
        background: var(--gray-200);
        color: var(--gray-700);
        
        &:hover {
          background: var(--error);
          color: var(--white);
        }
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--gray-500);
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    color: var(--gray-600);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--gray-500);
  }
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'تم الاشتراك بنجاح',
        content: 'تم الاشتراك في مشروع العقارات الفاخرة بنجاح. سيتم إرسال تفاصيل الاستثمار إلى بريدك الإلكتروني.',
        time: '2024-06-15T10:30:00',
        read: false,
        actionUrl: '/project/1'
      },
      {
        id: 2,
        type: 'info',
        title: 'مشروع جديد متاح',
        content: 'تم إطلاق مشروع شركة المنذر بي سي للتكنولوجيا للاستثمار. احجز مكانك الآن قبل انتهاء الفرصة.',
        time: '2024-06-14T15:45:00',
        read: false,
        actionUrl: '/project/2'
      },
      {
        id: 3,
        type: 'warning',
        title: 'تحديث مهم',
        content: 'يرجى تحديث معلوماتك الشخصية لإكمال عملية التحقق من الحساب.',
        time: '2024-06-13T09:15:00',
        read: true,
        actionUrl: '/profile'
      },
      {
        id: 4,
        type: 'success',
        title: 'تم إكمال المشروع',
        content: 'تم إكمال مشروع الطاقة المتجددة بنجاح. سيتم توزيع الأرباح خلال الأسبوع القادم.',
        time: '2024-06-12T14:20:00',
        read: true,
        actionUrl: '/portfolio'
      },
      {
        id: 5,
        type: 'info',
        title: 'تقرير شهري',
        content: 'تم إرسال التقرير الشهري لأداء محفظتك الاستثمارية إلى بريدك الإلكتروني.',
        time: '2024-06-11T11:00:00',
        read: true,
        actionUrl: '/portfolio'
      },
      {
        id: 6,
        type: 'error',
        title: 'فشل في المعاملة',
        content: 'فشلت عملية شراء الأسهم في مشروع العقارات الفاخرة. يرجى المحاولة مرة أخرى.',
        time: '2024-06-10T16:30:00',
        read: false,
        actionUrl: '/buy-sell/1'
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'info': return <FaInfoCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'error': return <FaTimesCircle />;
      default: return <FaBell />;
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInHours < 48) return 'منذ يوم';
    return `منذ ${Math.floor(diffInHours / 24)} أيام`;
  };

  if (isLoading) {
    return (
      <NotificationsContainer>
        <NotificationsContent>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            جاري التحميل...
          </div>
        </NotificationsContent>
      </NotificationsContainer>
    );
  }

  return (
    <NotificationsContainer>
      <NotificationsContent>
        <NotificationsHeader>
          <h1>الإشعارات</h1>
          <div className="header-actions">
            <button onClick={markAllAsRead}>تحديد الكل كمقروء</button>
            <button onClick={clearAll}>مسح الكل</button>
          </div>
        </NotificationsHeader>

        <FilterTabs>
          <FilterTab 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            الكل ({notifications.length})
          </FilterTab>
          <FilterTab 
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => setFilter('unread')}
          >
            غير مقروء ({notifications.filter(n => !n.read).length})
          </FilterTab>
          <FilterTab 
            className={filter === 'success' ? 'active' : ''}
            onClick={() => setFilter('success')}
          >
            نجح
          </FilterTab>
          <FilterTab 
            className={filter === 'info' ? 'active' : ''}
            onClick={() => setFilter('info')}
          >
            معلومات
          </FilterTab>
        </FilterTabs>

        {filteredNotifications.length === 0 ? (
          <EmptyState>
            <div className="empty-icon">
              <FaBell />
            </div>
            <h3>لا توجد إشعارات</h3>
            <p>ستظهر هنا جميع الإشعارات المهمة</p>
          </EmptyState>
        ) : (
          <NotificationList>
            {filteredNotifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={!notification.read ? 'unread' : ''}
              >
                <div className="notification-header">
                  <div className="notification-title">
                    <div className={`notification-icon ${notification.type}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="title-text">{notification.title}</div>
                  </div>
                  <div className="notification-time">
                    {getTimeAgo(notification.time)}
                  </div>
                </div>

                <div className="notification-content">
                  {notification.content}
                </div>

                <div className="notification-actions">
                  {!notification.read && (
                    <button 
                      className="view"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <FaEye />
                      تحديد كمقروء
                    </button>
                  )}
                  <Link to={notification.actionUrl}>
                    <button className="view">
                      <FaEye />
                      عرض التفاصيل
                    </button>
                  </Link>
                  <button 
                    className="delete"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <FaTrash />
                    حذف
                  </button>
                </div>
              </NotificationCard>
            ))}
          </NotificationList>
        )}
      </NotificationsContent>
    </NotificationsContainer>
  );
};

export default Notifications; 