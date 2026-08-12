import { Container, Table, Badge, Button } from "react-bootstrap";
import { useTransactions } from "../hooks/useTransactions.js";
import '../css/Dashboard.css';
import Separator from "../components/Separator.jsx";
import { CiCirclePlus } from 'react-icons/ci';

function Dashboard() {
  const { transactions, balance } = useTransactions();

  return (
    <Container fluid className="p-4">
        <h1 className="fw-bold dashboard-title">Dashboard</h1>
        <Container fluid className="bg-tertiary p-2 rounded-4 mb-2 dashboard-header w-75 mx-auto">
            <h3 className="fw-bold balance-display">
                Current Balance:{' '}
                <span className={balance >= 0 ? 'text-success' : 'text-danger'}>
                ₱{balance.toFixed(2)}
                </span>
            </h3>
            <Separator color="silver" thickness="2px" space="8px" />
            {transactions.length === 0 ? (
                <>
                    <p className="text-muted text-center pt-4">No transactions yet. Add one to get started.</p>
                    <Button variant="primary" href="/add-transaction" className="d-block mt-3 w-75 mx-auto align-items-center gap-2">
                        <CiCirclePlus className="me-2" size={30} />
                        <span className="button-label">Add Transaction</span>
                    </Button>
                </>                
            ) : (
                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                    <tr key={t.id}>
                        <td>{t.date}</td>
                        <td>{t.description}</td>
                        <td>{t.category}</td>
                        <td>
                        <Badge bg={t.type === 'income' ? 'success' : 'danger'}>
                            {t.type}
                        </Badge>
                        </td>
                        <td>₱{Number(t.amount).toFixed(2)}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            )}
        </Container>
    </Container>
  );
}

export default Dashboard;