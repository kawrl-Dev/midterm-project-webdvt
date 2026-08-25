import { Form, Row, Col } from 'react-bootstrap';
import { CATEGORIES } from '../constants/categories.js';

function TransactionForm({ formData, onChange }) {
  const handleAmountBlur = () => {
      if (formData.amount && !isNaN(formData.amount)) {
        const formattedAmount = Number(formData.amount).toFixed(2);
        
        // Simulate an event object to reuse your existing onChange handler
        onChange({
          target: {
            name: 'amount',
            value: formattedAmount,
          },
        });
      }
    };

  return (
    <>
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" value={formData.date} onChange={onChange} required />
      </Form.Group>

      <Row className='g-3 mt-1'>
        <Col xs={6} sm={6} md={6}>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={onChange} required>
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={6} sm={6} md={6}>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={onChange} required>
              <option value="" disabled>Income/Expense</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" placeholder='(e.g. Jeep commute to school/work)' value={formData.description} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" placeholder='(e.g. 1000.00)' min="0.01" step="0.01" value={formData.amount} onChange={onChange} onBlur={handleAmountBlur}required />
      </Form.Group>
    </>
  );
}

export default TransactionForm;