import {useRef, useLayoutEffect} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { AiFillDashboard } from 'react-icons/ai';
import { TbReportAnalyticsFilled } from "react-icons/tb";

import '../css/NavigationBar.css';

function NavigationBar() {
    const headerRef = useRef(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${el.offsetHeight}px`
      );
    };

    setHeaderHeight();

    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <header className="app-header" ref={headerRef}>
      <div className="nav-backdrop" aria-hidden="true" />
      <Container fluid>
        <Navbar expand="lg" className="rounded-4 m-2 customNavbar" collapseOnSelect>
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
            <Navbar.Toggle aria-controls="navigationBar"/>
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
      </Container>
    </header>
  );
}

export default NavigationBar;
