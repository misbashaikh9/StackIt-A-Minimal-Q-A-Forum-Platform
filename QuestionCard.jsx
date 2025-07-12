import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Body = styled.p`
  color: #666;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
`;

const QuestionCard = ({ question, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{question.title}</Title>
      <Body>{question.body}</Body>
      <Meta>
        <span>Posted on {question.date}</span>
        <span>0 Answers</span>
      </Meta>
    </Card>
  );
};

export default QuestionCard;