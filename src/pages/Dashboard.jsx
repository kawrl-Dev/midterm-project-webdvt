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
                <Container fluid className="w-75 mx-auto">
                    {/* Transaction cards will be rendered here */}
                </Container>
            )}
        </Container>
    </Container>
  );
}

export default Dashboard;