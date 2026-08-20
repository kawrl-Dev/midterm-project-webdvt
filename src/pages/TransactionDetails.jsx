import { useState } from 'react';
import { Container, Card, Badge, Button, Form, Modal, Alert, Stack } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';
import { useTransactions } from '../hooks/useTransactions.js';
import TransactionForm from '../components/TransactionForm.jsx';
import '../css/TransactionDetails.css';
import { IoReturnDownBackOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransactionById, updateTransaction, deleteTransaction } = useTransactions();
  const transaction = getTransactionById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(null);

  if (!transaction) {
    return (
      <Container fluid className="p-4">
        <Alert variant="warning">
          Transaction not found. It may have already been deleted.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const { date, description, category, type, amount } = transaction;

  const handleEditClick = () => {
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
    });
    setValidated(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    updateTransaction(id, {
      description: formData.description,
      amount: Number(formData.amount),
      date: formData.date,
      category: formData.category,
      type: formData.type,
    });
    navigate('/dashboard');
  };

  const handleDeleteConfirm = () => {
    deleteTransaction(id);
    navigate('/dashboard');
  };

  return (
    <Container fluid className="p-4">
      <Card className="w-75 mx-auto">
        <Card.Body>
          {isEditing ? (
            <Form noValidate validated={validated} onSubmit={handleSave}>
              <TransactionForm formData={formData} onChange={handleChange} />
              <Stack direction="horizontal" gap={2} className="mt-3">
                <Button type="submit" variant="primary">Save</Button>
                <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
              </Stack>
            </Form>
          ) : (
            <>
              <Card.Title>{description}</Card.Title>
              <Card.Text>
                <strong>Date:</strong> {date} <br />
                <strong>Category:</strong> {category} <br />
                <strong>Type:</strong> <Badge bg={type === 'income' ? 'success' : 'danger'}>{type}</Badge> <br />
                <strong>Amount:</strong> ₱{Number(amount).toFixed(2)}
              </Card.Text>
              <Stack direction="vertical" gap={2} className="transactionDetailsBtnGroup mt-3 w-100">
                <Button variant="primary" onClick={() => navigate('/dashboard')} className="d-flex align-items-center justify-content-center">
                  <IoReturnDownBackOutline /> 
                  <span>Back</span>
                </Button>
                <Button variant="secondary"  onClick={handleEditClick} className="d-flex align-items-center justify-content-center">
                  <MdOutlineEdit /> 
                  <span>Edit</span>
                </Button>
                
                <Button variant="danger" onClick={() => setShowDeleteModal(true)} className="d-flex align-items-center justify-content-center">
                  <RiDeleteBinFill /> 
                  <span>Delete</span>
                </Button>
              </Stack>
            </>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{description}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Confirm Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TransactionDetails;