import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function Header(props) {
    const Navigate = useNavigate();
    const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    useEffect(() => {
        if (!curentAdmin) {
            Navigate("/admin/login")
        }
        // eslint-disable-next-line 
    },[]);
    const logout = async () => {
        await Navigate("/admin/login");
        localStorage.removeItem("admin");
    };
    return (
        <div>
            <Navbar style={{background:"rgb(231,221,255)"}} variant="dark" className='d-flex flex-row-reverse pt-3 mx-0 px-4'>
                <Dropdown >
                    <Dropdown.Toggle variant='none' id="dropdown-basic" className='avt-admin px-4'>
                        <span className='fw-bold'>Hello {curentAdmin.hoten}</span>
                        <img src={"/image/Avt/" + curentAdmin?.avt} alt='...' className='mx-1' ></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item>
                            <Link to={'/admin/myinfo'} className='text-danger'>Thông tin    <Icon icon={faCircleInfo} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link onClick={()=>logout()} className='text-danger'>Đăng xuất    <Icon icon={faRightFromBracket} /></Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </div>
    );
}

export default Header;