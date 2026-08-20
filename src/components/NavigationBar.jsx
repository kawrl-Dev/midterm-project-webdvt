import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { AiFillDashboard } from 'react-icons/ai';
import { TbReportAnalyticsFilled } from "react-icons/tb";

import '../css/NavigationBar.css';

function NavigationBar() {
  return (
    <header>
        <Navbar expand="lg" fixed="top" bg="bg-tertiary" className="rounded-4 m-2 customNavbar" collapseOnSelect>
          <Container fluid>
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src="/budget-tracker-icon.png"
                alt="icon"
                className="d-inline-block rounded-circle img-fluid me-2"
                width={40}
                height={40}
              />
              <span className="myBrand">Personal Budget Tracker</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navigationBar" />
            <Navbar.Collapse id="navigationBar">
              <Nav className="ms-auto gap-3" navbarScroll>
                <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center gap-2" eventKey="1">
                  <AiFillDashboard size={30} />
                  <span>Dashboard</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/summary" className="d-flex align-items-center gap-2" eventKey="2">
                  <TbReportAnalyticsFilled size={30}/>
                  <span>Summary</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  );
}

export default NavigationBar;
