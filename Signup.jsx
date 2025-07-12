import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return Swal.fire('Error', 'Passwords do not match!', 'error');
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&]).{6,}$/.test(password)) {
      return Swal.fire('Weak Password', 'Must include 1 number + 1 special char & min 6 chars', 'warning');
    }

    try {
      const res = await axios.post('http://localhost:3001/signup', { email, password });

      if (res.status === 201 || res.status === 200) {
        // Save user email to localStorage
        localStorage.setItem('userEmail', email);

        Swal.fire({
          icon: 'success',
          title: 'Signed up!',
          text: 'Redirecting to SignIn...',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => navigate('/signin'));
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire('Oops!', 'Email already exists!', 'error');
      } else {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#f9f9fb',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#5c4efc', marginBottom: '24px' }}>Create an Account</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: '16px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '14px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '16px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '14px',
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            marginBottom: '24px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '100%',
            fontSize: '14px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#5c4efc',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px',
            marginBottom: '12px'
          }}
        >
          Sign Up
        </button>

        <div style={{ textAlign: 'center', fontSize: '14px' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            style={{
              color: '#5c4efc',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
