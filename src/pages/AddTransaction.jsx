import { Container, Form, Button, Alert } from 'react-bootstrap'; 
import { useState } from 'react'; 
import { useNavigate } from 'react-router'; 

function AddTransaction() {
  const navigate = useNavigate(); 
  
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  
  const [formData, setFormData] = useState({ 
    description: '', 
    amount: '', 
    date: '' 
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
      console.log('Form submitted:', formData);
      
      // 1. Show the alert box
      setShowAlert(true); 
      
      // 2. Remove the immediate navigate() from here
    }
    setValidated(true);
  };

  // FIX: Function that handles closing the alert and triggering the redirect
  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/dashboard'); 
  };

  return (
    <Container fluid className="p-4">
      {/* FIX: The Alert now calls handleAlertClose when the 'X' is clicked */}
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
          <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default AddTransaction;
