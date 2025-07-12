import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
  font-size: 1rem;
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 50px;
  gap: 0.5rem;
`;

const Tag = styled.div`
  background: #e0e0ff;
  color: #4a3aff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
`;

const Remove = styled.span`
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4a3aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const navigate = useNavigate();

  const handleTagInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (title.trim() && body.trim()) {
    const newQuestion = { title, body, tags };

    try {
      await axios.post('http://localhost:3001/questions', newQuestion);
      navigate('/home'); // redirect to home after posting
    } catch (err) {
      console.error('Error posting question:', err);
    }
  }
};


  return (
    <PageContainer>
      <h1>Ask a Question</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your question?"
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Details</label>
          <TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Provide more details about your question..."
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Tags (Press Enter or Comma)</label>
          <TagsInput>
            {tags.map((tag, index) => (
              <Tag key={index}>
                {tag}
                <Remove onClick={() => removeTag(tag)}>×</Remove>
              </Tag>
            ))}
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
              placeholder="Add a tag"
              style={{ border: 'none', outline: 'none', flexGrow: 1 }}
            />
          </TagsInput>
        </FormGroup>
        <ButtonGroup>
          <SubmitButton type="submit">Post Question</SubmitButton>
          <CancelButton type="button" onClick={() => navigate('/')}>Cancel</CancelButton>
        </ButtonGroup>
      </Form>
    </PageContainer>
  );
};

export default AskQuestion;
