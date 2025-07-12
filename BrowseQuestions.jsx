import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard'; // ✅ Confirm this path is correct
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #1a1a1a;
`;

const AskButton = styled.button`
  padding: 12px 24px;
  background: #4a3aff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #3a2ad8;
  }
`;

const QuestionsList = styled.div`
  display: grid;
  gap: 20px;
`;

const BrowseQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/questions')
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error('❌ Error fetching questions:', err));
  }, []);

  return (
    <PageContainer>
      <Header>
        <Title>Browse Questions</Title>
        <AskButton onClick={() => navigate('/ask-question')}>
          Ask Question
        </AskButton>
      </Header>

      <QuestionsList>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard 
              key={question._id}
              question={question}
              onClick={() => navigate(`/question/${question._id}`)}
            />
          ))
        ) : (
          <p>No questions found. Be the first to ask!</p>
        )}
      </QuestionsList>
    </PageContainer>
  );
};

export default BrowseQuestions;
