import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--white);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: var(--white);
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>جاري التحميل...</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 