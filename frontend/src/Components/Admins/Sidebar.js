import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import '../Admins/admin.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faBarsStaggered,
    faBookBookmark,
    faCartFlatbed,
    faCaretRight,
    faChevronDown,
    faCalendarDays,
    faClockRotateLeft,
    faCommentDots,
    faCarSide,
    faCartPlus,
    faBookJournalWhills,
    faUsers,
    faUserTag,
    faMessage,
    faCircleUser,
    faFileContract,
    faCircleInfo,
    faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
    faProductHunt
} from "@fortawesome/free-brands-svg-icons"
const ADMIN_SIDEBAR = [
    { icon: faChartLine, name: 'Tổng Quan', to: '/admin' },
    {
        icon: faCalendarDays, name: 'Thống Kê ', children: [
            { icon: faClockRotateLeft, name: 'Lợi nhuận theo thời gian', to: '/admin/profitovertime' },
            { icon: faProductHunt, name: 'Lợi nhuận theo sản phẩm', to: '/admin/profitbyproduct' },
        ]
    },
    {
        icon: faBarsStaggered, name: 'Quản Lý Danh Mục', children: [
            { icon: faCaretRight, name: 'Loại sản phẩm', to: '/admin/category' },
        ]
    },
    {
        icon: faBookBookmark, name: 'Quản Lý Sản Phẩm', children: [
            { icon: faCarSide, name: 'Sản phẩm', to: '/admin/product' },
            { icon: faCommentDots, name: 'Bình luận', to: '/admin/comment' },
        ]
    },
    {
        icon: faCartFlatbed, name: 'Quản Lý Đơn Hàng', isAdmin: true, children: [
            { icon: faCartPlus, name: 'Đơn đặt hàng', to: '/admin/order' },
            { icon: faBookJournalWhills, name: 'Hóa đơn', to: '/admin/bill' },
        ]
    },

    {
        icon: faCircleUser, name: 'Quản Lý Tài Khoản', children: [
            { icon: faUsers, name: 'Tài khoản nhân viên', to: '/admin/employee' },
            { icon: faUserTag, name: 'Tài khoản khách hàng', to: '/admin/customer' }
        ]
    },
    {
        icon: faMessage, name: 'Chăm Sóc Khách Hàng', children: [
            { icon: faCaretRight, name: 'Phản hồi khách hàng', to: '/admin/feedbacks' },
        ]
    },
    {
        icon: faFileContract, name: 'Quản Lý Phiếu Nhập Hàng', children: [
            { icon: faCircleInfo, name: 'Thông tin phiếu nhập hàng', to: '/admin/phieunhap' },
            { icon: faCalendarPlus, name: 'Tạo mới phiếu nhập', to: '/admin/themphieunhap' },
        ]
    },
]

function Sidebar(props) {
    const [clicked, setClicked] = useState(null)
    const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : JSON.parse(localStorage.kho)
    const toggleExpand = (index) => {
        if (clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }
    return (
        <Col xs={3} className="pt-3" style={{ background: "rgb(11,42,73)" }} >
            <div style={{ position: "sticky", top: 0 }} className='pt-3'>
                <Link to="/admin">
                    <img src='/image/Logo/logo.png' alt='...' className='mb-4' style={{ borderRadius: "50%", width: "150px" }}></img>
                </Link>
                <div className='mx-3'>
                    <div className='d-flex'>
                        <img src={`/image/Avt/${curentAdmin.avt}`} alt='...' className='mb-4' style={{ borderRadius: "50%", width: "50px" }} />
                        <div className='text-white text-start mx-2'>
                            <span className='h6'>Họ tên: {curentAdmin.hoten}</span>
                            <br></br>
                            <span > Tài khoản: {curentAdmin.email}</span>
                        </div>
                    </div>
                    {
                        ADMIN_SIDEBAR.map((item, index) => {
                            return (
                                <div key={index} className='item'>
                                    <div className='header'
                                        aria-expanded={(clicked === index) ? 'true' : 'false'}
                                    >
                                        <Link to={item.to} className='name menuItem'>
                                            <Icon icon={item.icon} className='iconItem' />
                                            <span>{item.name}</span>
                                        </Link>
                                        {(item.children != null) && (
                                            <button
                                                className='btnExpand'
                                                onClick={() => toggleExpand(index)}
                                            >
                                                <Icon icon={faChevronDown} />
                                            </button>
                                        )}
                                    </div>
                                    <div className='body'>
                                        {item.children != null && item.children.map((childItem, idx) => (
                                            <Link to={childItem.to} key={idx} className='menuItem'>
                                                <Icon icon={childItem.icon} className='iconItem' />
                                                <span>{childItem.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Col >
    );
}

export default Sidebar;