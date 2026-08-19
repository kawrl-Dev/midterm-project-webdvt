import { useMemo, useState } from "react";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useTransactions } from "../hooks/useTransactions.js";
import { useTransactionFilters } from "../hooks/useTransactionFilters.js";
import { useResponsiveItemsPerPage } from "../hooks/useResponsiveItemsPerPage.js";
import { usePagination } from "../hooks/usePagination.js";
import '../css/Dashboard.css';
import Separator from "../components/Separator.jsx";
import PaginationControls from "../components/PaginationControls.jsx";
import TransactionCard from "../components/TransactionCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import { CiCirclePlus, CiFilter } from 'react-icons/ci';

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

  const [showFilters, setShowFilters] = useState(false);
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesCategory = !filterCategory || t.category === filterCategory;
      const matchesType = !filterType || t.type === filterType;
      return matchesCategory && matchesType;
    });
  }, [transactions, filterCategory, filterType]);

  const itemsPerPage = useResponsiveItemsPerPage();const { currentPage, totalPages, paginatedItems, setCurrentPage } =
    usePagination(filteredTransactions, itemsPerPage);

  const filterProps = {
    filterCategory,
    filterType,
    onCategoryChange: setCategory,
    onTypeChange: setType,
    onReset: resetFilters,
    hasActiveFilters,
  };

  return (
    <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h1 className="fw-bold dashboard-title mb-0">Dashboard</h1>

            {/* Mobile-only filter trigger; hidden entirely at md+ since the
                sidebar is already visible there. */}
            <Button
                variant="outline-secondary"
                className="d-md-none d-flex align-items-center gap-2"
                onClick={() => setShowFilters(true)}
            >
                <CiFilter size={20} />
                Filters
                {hasActiveFilters && <span className="filter-active-dot" aria-label="Filters active" />}
            </Button>
        </div>

        {/* Mobile filter panel. Positioned fixed by Bootstrap regardless of
            where it sits in the tree, so it lives outside the Row/Col grid
            to avoid picking up gutter spacing. */}
        <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start" mountOnEnter>
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
                <FilterSidebar {...filterProps} />
            </Offcanvas.Body>
        </Offcanvas>

        <Row className="g-3 mt-1">
            <Col md={3} className="d-none d-md-block">
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
                                {paginatedItems.map((transaction) => (
                                    <Col key={transaction.id}>
                                        <TransactionCard transaction={transaction} />
                                    </Col>
                                ))}
                            </Row>
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </Container>
                    )}
                </Container>
            </Col>
        </Row>
    </Container>
  );
}

export default Dashboard;