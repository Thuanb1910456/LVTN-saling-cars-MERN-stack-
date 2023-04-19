import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
function Myinfo(props) {
    const curentAccounts = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const [show, setShow] = useState(false)
    const [Refresh, setRefresh] = useState(0)
    const [Accounts, setAccounts] = useState(curentAccounts)
    const onChange = (e) => {
        setShow({ ...show, [e.target.name]: e.target.value })
    }
    const update = (id) => {
        if (show.avt.lenght > 16) {
            show.avt = show.avt.slice(12)
        } else {
            show.avt = curentAccounts.avt
        }
        axios
            .put(`http://localhost:5000/api/admin/${id}`, show, {})
            .then((res)=>{
                toast.success('Cập nhật thành công', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setAccounts(show)
        setShow(false)
    }
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/admin/${Accounts._id}`)
        .then((res) => {
            setAccounts(res.data.data.admin)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Refresh])
    return (
        <div className='boder-main'>
            <ToastContainer />
            <h3 className='fw-bold text-uppercase mt-3 text-danger'> Thông tin cá nhân của bạn</h3>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col">MÃ NHÂN VIÊN</th>
                        <th scope="col">HỌ TÊN</th>
                        <th scope="col">GIỚI TÍNH</th>
                        <th scope="col">NGÀY SINH</th>
                        <th scope="col">TÀI KHOẢN</th>
                        <th scope="col">MẬT KHẨU</th>
                        <th scope="col">HÌNH ẢNH</th>
                        <th scope="col">ĐIỆN THOẠI</th>
                        <th scope="col">ĐỊA CHỈ</th>
                        <th scope="col">CHỨC VỤ</th>
                        <th scope="col">CẬP NHẬT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{Accounts._id}</td>
                        <td>{Accounts.hoten}</td>
                        <td>{Accounts.sex}</td>
                        <td>{Accounts.date}</td>
                        <td>{Accounts.email}</td>
                        <td>{Accounts.password}</td>
                        <td>
                            <img src={`/image/avt/${Accounts.avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                        </td>
                        <td>{Accounts.sdt}</td>
                        <td>{Accounts.adress}</td>
                        <td>Nhân viên</td>
                        <td>
                            <Button variant="success" onClick={() => setShow(Accounts)}><Icon icon={faPenToSquare} /></Button>
                            <Modal show={show !== false} onHide={() => setShow(false)}>
                                <Modal.Header>
                                    <Modal.Title>Tài Khoản</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Họ & Tên</Form.Label>
                                            <Form.Control type="text" name="hoten" placeholder={Accounts.hoten} onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" placeholder={Accounts.email} onChange={onChange} disabled />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" placeholder='Cập nhật mật khẩu' onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Điện Thoại</Form.Label>
                                            <Form.Control type="text" name="sdt" placeholder={Accounts.sdt} onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control type="text" name="adress" placeholder={Accounts.adress} onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Giới Tính</Form.Label>
                                            <Form.Select aria-label="Default select example" name='sex' onChange={onChange}>
                                                <option>--Chọn--</option>
                                                <option name="sex" value='nam'>Nam</option>
                                                <option name="sex" value='nữ'>Nữ</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Ngày tháng năm sinh</Form.Label>
                                            <Form.Control type="text" name="date" placeholder={Accounts.date} onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Hình Ảnh</Form.Label>
                                            <Form.Control type="file"
                                                multiple
                                                name="avt"
                                                onChange={onChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={() => update(show._id)}>
                                        Cập nhật
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Myinfo;