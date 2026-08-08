import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { AiFillDashboard } from 'react-icons/ai';
import { CiCirclePlus } from 'react-icons/ci';

import '../css/NavigationBar.css';

function NavigationBar() {
  return (
    <header>
      <Container fluid>
        <Navbar expand="lg" sticky="top" bg="body-tertiary" className="rounded-4 mt-2">
          <Container fluid>
            <Navbar.Brand className="d-flex align-items-center">
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
              <Nav className="ms-auto gap-3" navbarScroll>
                <Nav.Link as={Link} to="/" className="d-flex align-items-center gap-2">
                  <AiFillDashboard size={30} />
                  <span>Dashboard</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/add-transaction" className="d-flex align-items-center gap-2">
                  <CiCirclePlus size={30} />
                  <span>Add Transaction</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
}

export default NavigationBar;
