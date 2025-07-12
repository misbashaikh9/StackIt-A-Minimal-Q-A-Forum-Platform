import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 48px;
  height: 48px;
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #f64f59, #c471ed, #12c2e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button`
  background: ${({ primary }) => (primary ? '#0d6efd' : 'white')};
  color: ${({ primary }) => (primary ? 'white' : '#0d6efd')};
  border: 1px solid #0d6efd;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ primary }) => (primary ? '#0b5ed7' : '#f0f8ff')};
  }
`;

const EmailText = styled.span`
  font-weight: bold;
  color: #0d6efd;
  font-size: 14px;
`;

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem('userEmail');
  setUserEmail(null);
  navigate('/'); 
};


  return (
    <HeaderWrap>
      <LogoSection onClick={() => navigate('/')}>
        <LogoImg src="/logo-s.png" alt="StackIt Logo" />
        <LogoText>StackIt</LogoText>
      </LogoSection>

      <Nav>
        <Button primary onClick={() => navigate('/ask-question')}>
          Ask Question
        </Button>

        {userEmail ? (
          <>
            <EmailText>{userEmail}</EmailText>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        )}
      </Nav>
    </HeaderWrap>
  );
};

export default Header;
