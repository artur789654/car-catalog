import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header({ changeTheme, isDark }) {
  return (
    <header className={styles.header}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
            <div>
            <img
              src="https://seeklogo.com/images/L/line-art-car-logo-99DBB62CB3-seeklogo.com.png"
              alt="Logo"
              width="50"
              height="50"
            />
            </div>
            <span className={`fw-semibold ${styles.logoColor}`}>Car-catalog</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-center">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/CarList">
                  Catalog
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/contact-us">
                  Contact Us
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className={`d-flex align-items-center justify-content-center ${styles.wrapTheme} ms-3`}>
              <FaSun className={`${styles.sunIcon} me-2`} />
              <div className="form-check form-switch">
                <input
                  className={`form-check-input ${styles.formcheckinput}`}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  onChange={changeTheme}
                  checked={isDark}
                />
              </div>
              <FaMoon className={styles.moonIcon} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
