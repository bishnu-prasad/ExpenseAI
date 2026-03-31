import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      setError('Please provide both title and amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/expenses', {
        title,
        amount: parseFloat(amount)
      });
      setSuccess('Expense added successfully! AI categorized it.');
      setTitle('');
      setAmount('');
      // Optionally redirect to dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to add expense. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Add New Expense</h1>
        </div>

        <div className="card max-w-md">
          <p className="mb-4 text-secondary">Let AI handle the categorization. Just tell us what you bought and how much it was.</p>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">What did you buy?</label>
              <input 
                type="text" 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Medium Iced Coffee, Uber to work"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input 
                type="number" 
                id="amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Adding Expense...' : 'Add Expense'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddExpense;
