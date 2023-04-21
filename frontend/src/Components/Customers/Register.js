import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faImagePortrait, faKey, faPhoneVolume, faRightFromBracket, faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function Register(props) {
    const [account, setAccount] = useState({})
    const Navigate = useNavigate()
    const onChangeHandle = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    const [validated, setValidated] = useState(false);
    const onSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        account.avt = account.avt.slice(12)
        axios
            .post('http://localhost:5000/api/user', { account })
            .then((res) => {
                toast.success('Đăng ký tài khoản thành công. Bây giờ bạn có thể đăng nhập.', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    function () {
                        Navigate('/login')
                    },
                    4000
                );
            })
            .catch((Error => {
                toast.error('Đăng ký tài khoản không thành công.', {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }))
    }
    return (
        <Container fluid className='padding-header' style={{ backgroundImage: `url('/image/Background/bg-register.png')`, backgroundSize: "cover" }}>
            <ToastContainer />
            <h3 className=" fw-bold text-uppercase text-primary">Đăng ký tài khoản thành viên</h3>
            <Card style={{ background: "none", border: "none", color: "white" }}>
                <Card.Body>
                    <Row>
                        <Col md='6' lg='12' className='d-flex flex-column align-items-center text-start'>
                            <Form noValidate validated={validated} onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="hoten" className="control-label">
                                            <Icon icon={faUser} /> Họ và tên
                                        </Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Tên của bạn "
                                            onChange={onChangeHandle}

                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Label
                                        htmlFor="email"
                                        className="control-label"
                                    >
                                        <Icon icon={faUserLock} />  Tài khoản
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password" className="control-label">
                                        <Icon icon={faKey} />  Mật khẩu
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="avt" className="control-label">
                                        <Icon icon={faImagePortrait} />   Hình ảnh
                                    </Form.Label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="avt"
                                        onChange={onChangeHandle}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="sdt" className="control-label">
                                        <Icon icon={faPhoneVolume} />   Điện thoại
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="sdt"
                                        placeholder="Số điện thoại"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="username" className="control-label">
                                        <Icon icon={faAddressCard} />   Địa chỉ liên hệ
                                    </Form.Label>
                                    <Form.Control
                                        className="form-control"
                                        type="text"
                                        name="adress"
                                        placeholder="Địa chỉ hiện tại của bạn"
                                        onChange={onChangeHandle}
                                        required
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className='m-2'>
                                    <Form.Label>
                                        <Link to={'/login'} className={'text-white fw-bolder h5'}> <Icon icon={faRightFromBracket} /> Đăng nhập tài khoản hiện có </Link>
                                    </Form.Label>
                                </Form.Group>
                                <Button variant='primary' type='submit' onClick={() => onSubmit()}>Đăng Ký</Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default Register;