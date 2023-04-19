import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMapLocationDot, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons';
function Footer(props) {
    return (
        <div className='mx-4'>
            <Row className='mt-3 mb-3 g-3'>
                <div className='col-md-5 '>
                    <Link>
                        <img src='/image/Logo/logoCustomer.png' alt='...' style={{ width: "150px" }} />
                    </Link>
                    <p className='mt-2'>
                        Mauris sit amet quam congue, pulvinar urna et, congue diam. Suspendisse eu lorem massa. Integer sit amet posuere tellustea dictumst.
                    </p>
                    <Link to={'/'}>
                        <Icon icon={faSquareFacebook} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </Link>
                    <Link to={'/'}>
                        <Icon icon={faSquareTwitter} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </Link>
                    <Link to={'/'}>
                        <Icon icon={faSquareEnvelope} style={{ fontSize: "50px", color: "blue", padding: "5px" }} />
                    </Link>
                </div>
                <div className='col-md-4'>
                    <h2 className='mb-4'>Điều bạn cần biết</h2>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Home </Link>
                            </ul>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Products </Link>
                            </ul>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Contacts </Link>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Abouts </Link>
                            </ul>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Blog </Link>
                            </ul>
                            <ul>
                                <Link to={'/'} className='text-primary mx-4 fw-bolder' > Login </Link>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='col-md-3'>
                    <h2 className='mb-4'>Thông tin liên hệ</h2>
                    <p className=' fw-bold text-start'><Icon icon={faMapLocationDot} /> 232/19A Đường 30/4, Hưng Lợi - Ninh Kiều - Cần Thơ</p>
                    <p className='fw-bold text-start '>Phone:
                        <Link to={'/'} className='text-primary mx-4' > 0786877893 </Link>
                    </p>
                    <p className='fw-bold text-start'>Email:
                        <Link to={'/'} className='text-primary mx-4' > Thuanb1910456@student.ctu.edu.vn </Link>
                    </p>
                </div>
            </Row>
            <Row className='mt-2 mb-3'>
                <div className='bg-light' style={{ height: "50px" }}>
                    <p className='d-flex p-2 bd-highlight justify-content-center'>Copyright © 2023 Design by Nguyễn Văn Minh Thuận</p>
                </div>
            </Row>
        </div>
    );
}

export default Footer;