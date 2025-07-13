import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: var(--gray-900);
  color: var(--white);
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--primary-green);
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  p {
    color: var(--gray-300);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  a {
    color: var(--gray-300);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--primary-green);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--gray-300);
    
    svg {
      color: var(--primary-green);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--gray-800);
    color: var(--white);
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--primary-green);
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--gray-800);
  padding-top: 1rem;
  text-align: center;
  color: var(--gray-400);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>منصة موثوق</h3>
            <p>
              منصة استثمارية رائدة تتيح للمستثمرين الوصول إلى فرص استثمارية متنوعة 
              ومربحة في السوق اليمني والعالمي.
            </p>
            <SocialLinks>
              <a href="#" aria-label="فيسبوك">
                <FaFacebook />
              </a>
              <a href="#" aria-label="تويتر">
                <FaTwitter />
              </a>
              <a href="#" aria-label="إنستغرام">
                <FaInstagram />
              </a>
              <a href="#" aria-label="لينكد إن">
                <FaLinkedin />
              </a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>روابط سريعة</h3>
            <FooterLinks>
              <Link to="/dashboard">لوحة التحكم</Link>
              <Link to="/portfolio">المحفظة</Link>
              <Link to="/news">الأخبار والتحديثات</Link>
              <Link to="/support">الدعم والمساعدة</Link>
              <Link to="/profile">الملف الشخصي</Link>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>الخدمات</h3>
            <FooterLinks>
              <Link to="/investment-projects">الاستثمار في المشاريع</Link>
              <Link to="/portfolio-management">إدارة المحفظة</Link>
              <Link to="/stock-trading">شراء وبيع الأسهم</Link>
              <Link to="/market-analysis">تحليل السوق</Link>
              <Link to="/financial-consulting">الاستشارات المالية</Link>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>تواصل معنا</h3>
            <ContactInfo>
              <div className="contact-item">
                <FaPhone />
                <span>+967773335044</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@mawthooq.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>اليمن , الامانة</span>
              </div>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>
            © {new Date().getFullYear()} منصة موثوق للاستثمار. جميع الحقوق محفوظة.
          </p>
          <p>
            هذا الموقع مرخص من هيئة السوق المالية اليمنية برقم الترخيص: 12345
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 