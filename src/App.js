import './App.css';
import { Container, Navbar, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import NavigationMenu from "./components/sidebar/NavigationMenu";
import {useEffect, useState} from "react";


function App() {
    const [currentUser,setCurrentUser] = useState("");
    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
    };
    useEffect(() => {
        setCurrentUser(localStorage.getItem("currentUser"))
    })
    return (
        <div dir="rtl">
            <Navbar style={{backgroundColor : "#69122a"}} expand="lg" id="navbar">
                <Container>
                    <Nav.Link to="/reports" as={NavLink} id="navbar-brand">صفحه اصلی</Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title={currentUser} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">ویرایش پروفایل</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">تنظیمات برنامه</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">تنظیمات سرور</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button" onClick={handleLogout}>خروج</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <NavigationMenu/>
                    </Col>
                    <Col xs={10} id="page-content-wrapper">
                        <Container>
                            <Outlet/>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
