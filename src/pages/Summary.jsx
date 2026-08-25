import { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTransactions } from '../hooks/useTransactions.js';
import { CATEGORIES } from '../constants/categories.js';
import Jar from '../components/Jar.jsx';
import SegmentedBar from '../components/SegmentedBar.jsx';
import Separator from '../components/Separator.jsx';
import '../css/Summary.css';

const JAR_COLORS = [
  '#4C9F70', '#E07A5F', '#3D9DCF', '#F2CC8F',
  '#9B5DE5', '#F15BB5', '#00BBF9', '#FF9F1C',
];

function colorFor(category, fallbackIdx) {
  const idx = CATEGORIES.indexOf(category);
  return JAR_COLORS[(idx >= 0 ? idx : fallbackIdx) % JAR_COLORS.length];
}

function Summary() {
  const { transactions, income, expense } = useTransactions();

  const { expenseByCategory, incomeByCategory } = useMemo(() => {
    const expenseMap = {};
    const incomeMap = {};
    transactions.forEach((t) => {
      const target = t.type === 'income' ? incomeMap : expenseMap;
      target[t.category] = (target[t.category] || 0) + Number(t.amount);
    });
    return { expenseByCategory: expenseMap, incomeByCategory: incomeMap };
  }, [transactions]);

  const totalFlow = income + expense;
  const incomeOverviewPct = totalFlow > 0 ? (income / totalFlow) * 100 : 0;
  const expenseOverviewPct = totalFlow > 0 ? (expense / totalFlow) * 100 : 0;

  const buildJars = (breakdown, grandTotal) =>
    Object.entries(breakdown)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount], idx) => ({
        category,
        amount,
        percent: grandTotal > 0 ? (amount / grandTotal) * 100 : 0,
        color: colorFor(category, idx),
      }));

  const expenseBreakdown = buildJars(expenseByCategory, expense);
  const incomeBreakdown = buildJars(incomeByCategory, income);
  const hasData = transactions.length > 0;

  return (
    <Container fluid className="p-4">
      <h1 className="fw-bold summary-title mb-4">Summary</h1>

      {!hasData ? (
        <p className="text-muted text-center pt-4">
          No transactions yet. Add some to see your summary.
        </p>
      ) : (
        <Row className="g-4">
          {/* Left column: Overview — stacks on top on mobile via md breakpoint */}
          <Col md={5}>
            <section>
              <h4 className="fw-bold mb-3">Overview</h4>
              <div className="jar-row justify-content-center">
                <Jar label="Income" size='lg' sublabel="of total flow" percent={incomeOverviewPct} amount={income} color="#4C9F70" />
                <Jar label="Expenses" size='lg' sublabel="of total flow" percent={expenseOverviewPct} amount={expense} color="#E07A5F" />
              </div>
            </section>
          </Col>

          {/* Right column: category breakdown bars */}
          <Col md={7}>
            <section className="mb-4">
              <h4 className="fw-bold mb-3">Expenses by Category</h4>
              <SegmentedBar items={expenseBreakdown} emptyMessage="No expenses recorded." />
            </section>

            <Separator color="silver" thickness="2px" space="16px" />

            <section>
              <h4 className="fw-bold mb-3">Income by Category</h4>
              <SegmentedBar items={incomeBreakdown} emptyMessage="No income recorded." />
            </section>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Summary;