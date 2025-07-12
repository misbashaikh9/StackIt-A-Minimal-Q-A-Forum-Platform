import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Auth Components
import Signup from './Signup';
import Signin from './Signin';

// Core App Components
import Header from './components/Header';
import Home from './components/Home';
import AskQuestion from './components/AskQuestionForm';
import Stats from './components/Stats';
import RecentQuestions from './components/RecentQuestions';
import BrowseQuestions from './components/BrowseQuestions';

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background: #f9f9fb;
  color: #1a1a1a;
  min-height: 100vh;
`;

function App() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Main App Routes (with Header + Container wrap) */}
        <Route
          path="/"
          element={
            <Container>
              <Header />
              <Home />
              <Stats />
              <RecentQuestions questions={questions} />
            </Container>
          }
        />
        <Route
          path="/ask-question"
          element={
            <Container>
              <Header />
              <AskQuestion addQuestion={addQuestion} />
            </Container>
          }
        />
        <Route
  path="/browse-question"
  element={
    <Container>
      <Header />
      <BrowseQuestions /> {/* remove questions={questions} */}
    </Container>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
