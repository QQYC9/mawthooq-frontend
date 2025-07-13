import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: var(--white);
  box-shadow: var(--shadow-md);
  border-bottom: 1px solid var(--gray-200);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--secondary-blue);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--primary-blue);
    background: var(--light-blue);
  }
  
  &.active {
    color: var(--primary-blue);
    background: var(--light-blue);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled(Link)`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &.primary {
    background: var(--primary-blue);
    color: var(--white);
    
    &:hover {
      background: var(--secondary-blue);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
    
    &:hover {
      background: var(--primary-blue);
      color: var(--white);
    }
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--gray-700);
  font-weight: 500;
  
  &:hover {
    background: var(--gray-100);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: var(--gray-700);
  text-decoration: none;
  transition: background 0.2s ease;
  
  &:hover {
    background: var(--gray-100);
  }
  
  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: var(--error);
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: var(--gray-100);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray-700);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  left: 0;
  background: var(--white);
  border-top: 1px solid var(--gray-200);
  box-shadow: var(--shadow-lg);
  z-index: 999;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const MobileNavLink = styled(Link)`
  padding: 1rem;
  color: var(--gray-700);
  text-decoration: none;
  border-bottom: 1px solid var(--gray-100);
  font-weight: 500;
  
  &:hover {
    background: var(--gray-50);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">موثوق</Logo>
        
        {isAuthenticated && (
          <Nav>
            <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              لوحة التحكم
            </NavLink>
            <NavLink to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
              المحفظة
            </NavLink>
            <NavLink to="/news" className={location.pathname === '/news' ? 'active' : ''}>
              الأخبار
            </NavLink>
            <NavLink to="/support" className={location.pathname === '/support' ? 'active' : ''}>
              الدعم
            </NavLink>
          </Nav>
        )}
        
        {isAuthenticated ? (
          <UserMenu>
            <UserButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <FaUser />
              {user?.name || 'المستخدم'}
            </UserButton>
            
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/profile" onClick={() => setIsDropdownOpen(false)}>
                  <FaUser />
                  الملف الشخصي
                </DropdownItem>
                <DropdownItem to="/notifications" onClick={() => setIsDropdownOpen(false)}>
                  <FaBell />
                  الإشعارات
                </DropdownItem>
                <LogoutButton onClick={handleLogout}>
                  <FaSignOutAlt />
                  تسجيل الخروج
                </LogoutButton>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <AuthButtons>
            <Button to="/login" className="secondary">تسجيل الدخول</Button>
            <Button to="/register" className="primary">إنشاء حساب</Button>
          </AuthButtons>
        )}
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContent>
      
      {isAuthenticated && (
        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNav>
            <MobileNavLink to="/dashboard">لوحة التحكم</MobileNavLink>
            <MobileNavLink to="/portfolio">المحفظة</MobileNavLink>
            <MobileNavLink to="/profile">الملف الشخصي</MobileNavLink>
            <MobileNavLink to="/notifications">الإشعارات</MobileNavLink>
            <MobileNavLink to="/news">الأخبار</MobileNavLink>
            <MobileNavLink to="/support">الدعم</MobileNavLink>
            <MobileNavLink to="#" onClick={handleLogout}>تسجيل الخروج</MobileNavLink>
          </MobileNav>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header; 