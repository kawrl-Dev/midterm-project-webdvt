import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTransactions } from '../hooks/useTransactions.js';
import TransactionForm from '../components/TransactionForm.jsx';

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
        <TransactionForm formData={formData} onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default AddTransaction;