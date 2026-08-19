import { useMemo } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTransactions } from "../hooks/useTransactions.js";
import { useTransactionFilters } from "../hooks/useTransactionFilters.js";
import '../css/Dashboard.css';
import Separator from "../components/Separator.jsx";
import TransactionCard from "../components/TransactionCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import { CiCirclePlus } from 'react-icons/ci';

function Dashboard() {
  const { transactions, balance } = useTransactions();
  const {
    filterCategory,
    filterType,
    setCategory,
    setType,
    resetFilters,
    hasActiveFilters,
  } = useTransactionFilters();

  // useMemo: only recompute the filtered list when transactions or the
  // filter values actually change — not on every Dashboard render
  // (e.g. a theme toggle in the footer causing a re-render up the tree).
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesCategory = !filterCategory || t.category === filterCategory;
      const matchesType = !filterType || t.type === filterType;
      return matchesCategory && matchesType;
    });
  }, [transactions, filterCategory, filterType]);

  return (
    <Container fluid className="p-4">
        <h1 className="fw-bold dashboard-title">Dashboard</h1>

        <Row className="g-3">
            <Col md={3}>
                <FilterSidebar
                    filterCategory={filterCategory}
                    filterType={filterType}
                    onCategoryChange={setCategory}
                    onTypeChange={setType}
                    onReset={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            </Col>

            <Col md={9}>
                <Container fluid className="bg-tertiary p-2 rounded-4 mb-2 dashboard-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold balance-display mb-0">
                        Current Balance:{" "}
                        <span className={balance >= 0 ? "text-success" : "text-danger"}>
                            ₱{balance.toFixed(2)}
                        </span>
                        </h3>
                        <Button variant="primary" href="/add-transaction" className="d-flex align-items-center gap-2">
                        <CiCirclePlus size={30} />
                        <span className="button-label">Add Transaction</span>
                        </Button>
                    </div>
                    <Separator color="silver" thickness="2px" space="8px" />
                    {transactions.length === 0 ? (
                        <p className="text-muted text-center pt-4">No transactions yet. Add one to get started.</p>
                    ) : filteredTransactions.length === 0 ? (
                        <p className="text-muted text-center pt-4">No transactions match your filters.</p>
                    ) : (
                        <Container fluid className="w-max mx-auto pb-3 mt-4">
                            <Row xs={1} sm={2} md={2} lg={3} className="g-3">
                                {filteredTransactions.map((transaction) => (
                                    <Col key={transaction.id}>
                                        <TransactionCard transaction={transaction} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}
                </Container>
            </Col>
        </Row>
    </Container>
  );
}

export default Dashboard;