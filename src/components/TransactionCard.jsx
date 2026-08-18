import React from "react";
import { Card, Badge } from "react-bootstrap";
import useNavigate from "react-router";
import '../css/TransactionCard.css';

function TransactionCard({ transaction }) {
    const navigate = useNavigate();
    const { date, description, category, type, amount } = transaction;

    const handleCardClick = () => {
        navigate(`/transaction/${transaction.id}`);
    }

    return (
    <Card className="transaction-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>
            <strong>Date:</strong> {date} <br />
            <strong>Category:</strong> {category} <br />
            <strong>Type:</strong> <Badge bg={type === 'income' ? 'success' : 'danger'}>{type}</Badge> <br />
            <strong>Amount:</strong> ₱{Number(amount).toFixed(2)}
        </Card.Text>
        </Card.Body>
    </Card>
    );
}

export default TransactionCard;