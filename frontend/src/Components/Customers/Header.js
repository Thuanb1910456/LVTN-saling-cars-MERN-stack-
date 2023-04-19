import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Header.css"
function Header(props) {
    const Navigate = useNavigate()
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const logout = () => {
        localStorage.removeItem("currentAccount");
        Navigate("/login");
    };
    return (
        <div className='header-navbar'>
            <Nav fill variant="tabs" defaultActiveKey="/" className='align-items-center'>
                <Nav.Item>
                    <Nav.Link eventKey="link-0" as={NavLink} to={'/'} className='logo-header'>
                        <img src='/image/Logo/logoCustomer1.png' alt='...' />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" as={NavLink} to={'/'}>home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" as={NavLink} to={'/products'}>products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" as={NavLink} to={'/contact'}>Contacts </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown title="ABOUT US" menuVariant="dark">
                        <NavDropdown.Item as={NavLink} to={'/blog'}>Blog</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={'/abouts'}> Abouts us</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
                {
                    curentAccount !== null ?
                        <Nav.Item>
                            <NavDropdown title={`Hello ${curentAccount.name}`} menuVariant="dark">
                                <NavDropdown.Item as={NavLink} to={'/bill'}>Đơn hàng</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/cart'}> Giỏ hàng</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={'/myinfo'}>Thông tin cá nhân</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logout()}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>

                        :
                        <Nav.Item>
                            <Nav.Link eventKey="link-4" as={NavLink} to={'/login'}>Login </Nav.Link>
                        </Nav.Item>
                }
            </Nav>
        </div>

    );
}

export default Header;