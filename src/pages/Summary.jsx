import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useTransactions } from '../hooks/useTransactions.js';
import { CATEGORIES } from '../constants/categories.js';
import Jar from '../components/Jar.jsx';
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

  // Same useMemo pattern as Dashboard's filteredTransactions: only recompute
  // the category breakdowns when the transaction list actually changes.
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

  const expenseJars = buildJars(expenseByCategory, expense);
  const incomeJars = buildJars(incomeByCategory, income);
  const hasData = transactions.length > 0;

  return (
    <Container fluid className="p-4">
      <h1 className="fw-bold summary-title">Summary</h1>

      {!hasData ? (
        <p className="text-muted text-center pt-4">
          No transactions yet. Add some to see your summary.
        </p>
      ) : (
        <>
          <section className="mb-4">
            <h4 className="fw-bold mb-3">Overview</h4>
            <div className="jar-row">
              <Jar label="Income" sublabel="of total flow" percent={incomeOverviewPct} amount={income} color="#4C9F70" />
              <Jar label="Expenses" sublabel="of total flow" percent={expenseOverviewPct} amount={expense} color="#E07A5F" />
            </div>
          </section>

          <Separator color="silver" thickness="2px" space="16px" />

          <section className="mb-4">
            <h4 className="fw-bold mb-3">Expenses by Category</h4>
            {expenseJars.length === 0 ? (
              <p className="text-muted">No expenses recorded.</p>
            ) : (
              <div className="jar-row">
                {expenseJars.map((jar) => (
                  <Jar key={jar.category} label={jar.category} percent={jar.percent} amount={jar.amount} color={jar.color} />
                ))}
              </div>
            )}
          </section>

          <Separator color="silver" thickness="2px" space="16px" />

          <section className="mb-4">
            <h4 className="fw-bold mb-3">Income by Category</h4>
            {incomeJars.length === 0 ? (
              <p className="text-muted">No income recorded.</p>
            ) : (
              <div className="jar-row">
                {incomeJars.map((jar) => (
                  <Jar key={jar.category} label={jar.category} percent={jar.percent} amount={jar.amount} color={jar.color} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </Container>
  );
}

export default Summary;