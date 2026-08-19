import { Form } from 'react-bootstrap';
import { CATEGORIES } from '../constants/categories.js';

function TransactionForm({ formData, onChange }) {
  return (
    <>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={formData.description} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" min="0.01" step="0.01" value={formData.amount} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" value={formData.date} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Select name="type" value={formData.type} onChange={onChange} required>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" value={formData.category} onChange={onChange} required>
          <option value="" disabled>Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
}

export default TransactionForm;