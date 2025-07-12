import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import axios from 'axios';

const QuestionsContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const QuestionsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1a1a1a;
`;

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
`;

const NoQuestions = styled.p`
  text-align: center;
  color: #666;
  padding: 40px;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  color: #4a3aff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0ff;
  }
`;

const RecentQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error('Failed to fetch questions:', err));
  }, []);

  return (
    <QuestionsContainer>
      <QuestionsTitle>Recent Questions</QuestionsTitle>
      {questions.length > 0 ? (
        <>
          <QuestionList>
            {questions.slice(0, 3).map((question) => (
              <QuestionCard 
                key={question._id}
                question={question}
                onClick={() => navigate(`/question/${question._id}`)}
              />
            ))}
          </QuestionList>
          {questions.length > 3 && (
            <ViewAllButton onClick={() => navigate('/browse-question')}>
              View All Questions ({questions.length})
            </ViewAllButton>
          )}
        </>
      ) : (
        <NoQuestions>
          No questions yet.
          <span 
            style={{ color: '#4a3aff', cursor: 'pointer', marginLeft: '5px' }}
            onClick={() => navigate('/ask-question')}
          >
            Be the first to ask!
          </span>
        </NoQuestions>
      )}
    </QuestionsContainer>
  );
};

export default RecentQuestions;
