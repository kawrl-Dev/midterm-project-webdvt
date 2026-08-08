import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle.jsx';
import { Link } from 'react-router';
import { AiFillDashboard } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';

function NavigationBar() {
  return (
    <Container fluid>
      <header>
        <Navbar expand="lg" sticky="top" bg="body-tertiary" className="rounded-4 mt-2">
          <Container fluid>
            <Navbar.Brand>
              <img 
                src="/budget-tracker-icon.png" 
                alt="icon" 
                className="d-inline-block rounded-circle img-fluid me-2" 
                width={40} 
                height={40}
              />
              <span className="text-secondary myBrand">Personal Budget Tracker</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navigationBar" />
            <Navbar.Collapse id="navigationBar">
              <Nav className="me-auto">
                <ThemeToggle />
              </Nav>
              <Nav className="ms-auto gap-3" navbarScroll>
                <Nav.Link as={Link} to="/">
                  <AiFillDashboard size={30} />
                  <span>Dashboard</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/add-transaction">
                  <CiCirclePlus size={30} />
                  <span>Add Transaction</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Container>
  );
}

export default NavigationBar;
