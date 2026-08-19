import { memo } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { CATEGORIES } from '../constants/categories.js';

const FilterSidebar = memo(function FilterSidebar({
  filterCategory,
  filterType,
  onCategoryChange,
  onTypeChange,
  onReset,
  hasActiveFilters
}) {
  return (
    <Card className="p-3 dashboard-header h-100">
      <h5 className="fw-bold mb-3">Filters</h5>
      
      <Form.Group className="mb-3" controlId="filterCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="filterType">
        <Form.Label>Type</Form.Label>
        <Form.Select
          value={filterType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Select>
      </Form.Group>

      <Button
        variant="outline-secondary"
        size="sm"
        onClick={onReset}
        disabled={!hasActiveFilters}
        className="w-100"
      >
        Clear filters
      </Button>
    </Card>
  );
});

export default FilterSidebar;