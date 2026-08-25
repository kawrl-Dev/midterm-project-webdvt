import { useState } from 'react';
import { Navbar, Container, Nav, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { CgMenuRound } from "react-icons/cg";
import { AiFillDashboard } from 'react-icons/ai';
import { TbReportAnalyticsFilled } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { useBrand } from '../context/brand-context.js';
import { DEFAULT_BRAND_NAME } from '../context/BrandContext.jsx';

import '../css/NavigationBar.css';

function NavigationBar() {
  const { brandName, setBrandName, resetBrandName, maxLength } = useBrand();
  const [showEdit, setShowEdit] = useState(false);
  const [draftName, setDraftName] = useState(brandName);

  const handleOpen = () => {
    setDraftName(brandName);
    setShowEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setBrandName(draftName);
    setShowEdit(false);
  };

  const handleReset = () => {
    resetBrandName();
    setDraftName(DEFAULT_BRAND_NAME);
  };

  return (
    <header className="app-header">
      <div className="nav-backdrop" aria-hidden="true" />
      <Container fluid>
        <Navbar expand="lg" className="rounded-4 m-2 customNavbar" collapseOnSelect>
          <Container fluid>
            <Navbar.Brand className="d-flex align-items-center">
              <svg className="navbar-icon-svg me-2" viewBox="0 0 100 150" role="img" aria-label="Budget Tracker icon">
                <polygon points="32,0 68,0 68,13.5 84,13.5 94,33 94,141 86,150 14,150 6,141 6,33 16,13.5 32,13.5" />
              </svg>
              <span className="myBrand">{brandName}</span>
              <Button
                variant="link"
                size="sm"
                onClick={handleOpen}
                aria-label="Edit brand name"
                className="ms-2 p-0 d-flex align-items-center"
              >
                <MdOutlineEdit />
              </Button>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navigationBar" className="border-0 p-0">
              <CgMenuRound size={30} />
            </Navbar.Toggle>
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

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Brand Name</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group controlId="brandNameInput">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                maxLength={maxLength}
                autoFocus
              />
              <Form.Text className="text-muted">
                {draftName.length}/{maxLength} characters
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleReset} type="button">
              Reset to Default
            </Button>
            <Button variant="secondary" onClick={() => setShowEdit(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </header>
  );
}

export default NavigationBar;
