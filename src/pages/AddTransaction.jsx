import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTransactions } from '../hooks/useTransactions.js';

const CATEGORIES = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Salary', 'Other'];

function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
    type: 'expense',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // This is the ONLY place that touches storage logic — and it's
      // just one function call, because useTransactions did the work.
      addTransaction({
        description: formData.description,
        amount: Number(formData.amount),
        date: formData.date,
        category: formData.category,
        type: formData.type,
      });
      setShowAlert(true);
    }
    setValidated(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/dashboard');
  };

  return (
    <Container fluid className="p-4">
      {showAlert && (
        <Alert variant="success" onClose={handleAlertClose} dismissible>
          Transaction added successfully! Click the close button to return to the dashboard.
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" name="amount" min="0.01" step="0.01" value={formData.amount} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange} required>
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default AddTransaction;