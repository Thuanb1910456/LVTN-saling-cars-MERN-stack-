import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Employee(props) {
    const [Accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)
    const [newAccount, setNewAccount] = useState({})
    const [Refresh, setRefresh] = useState(0)
    const [FindAccount, setFindAccount] = useState([])
    const onChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
        setShow({ ...show, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin")
            .then((res) => {
                setAccounts(res.data.data.admin)
                setFindAccount(res.data.data.admin)
            })
    }, [Refresh])
    const addAccount = () => {
        newAccount.avt = newAccount.avt.slice(12);
        axios
            .post("http://localhost:5000/api/admin", newAccount, {})
            .then((res) => {
                toast.success('Tạo mới tài khoản thành công', {
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
        setShow(false);
    }
    const deleteAccount = (id) => {
        axios
            .delete(`http://localhost:5000/api/admin/${id}`)
            .then((res) => {
                toast.error('Tài khoản đã bị xóa', {
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
    }
    const updateAccount = (id) => {
        if (show.avt.length > 16) {
            show.avt = show.avt.slice(12)
        } else {
            for (let i = 0; i < Accounts.length; i++) {
                if (Accounts[i] === id) {
                    show.avt = Accounts.avt;
                }
            }
        }
        axios
            .put(`http://localhost:5000/api/admin/${id}`, show, {})
            .then((res) => {
                toast.info('Cập nhật thành công', {
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
        setShow(false)
    }
    const findaccount = (e) => {
        const temp = FindAccount.filter(element => element.hoten.toLowerCase().includes(e.target.value.toLowerCase()))
        setAccounts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between m-3'>
                <h4 className='text-primary fw-bold text-uppercase'>Danh sách nhân viên</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Nhập thông tin nhân viên"
                    onChange={findaccount}
                />
                <Button variant="success" onClick={() => setShow(true)}>Thêm tài khoản <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)}>
                    <Modal.Header>
                        <Modal.Title>Tài Khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Họ & Tên</Form.Label>
                                <Form.Control type="text" name="hoten" placeholder={ show.hoten ? show.hoten  : "Họ và Tên" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" placeholder={ show.email ? show.email  : "Tài khoản" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Mật khẩu" onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Điện Thoại</Form.Label>
                                <Form.Control type="text" name="sdt" placeholder= { show.sdt ? show.sdt  : "Nhập số điện thoại" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" name="adress" placeholder={ show.adress ? show.adress  : "Địa chỉ hiện tại" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Giới Tính</Form.Label>
                                <Form.Select aria-label="Default select example" name="sex" onChange={onChange}>
                                    <option name="sex" value='nam'>Nam</option>
                                    <option name="sex" value='nữ'>Nữ</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Ngày tháng năm sinh</Form.Label>
                                <Form.Control type="text" name="date" placeholder={ show.date ? show.date  : "Ngày tháng năm sinh" } onChange={onChange} />
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
                        {
                            show._id !== undefined ?
                                <Button variant="primary" onClick={() => updateAccount(show._id)}>
                                    Cập nhật
                                </Button> :
                                <Button variant="success" onClick={() => addAccount()}>
                                    Tạo mới
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
            {
                Accounts.length === 0 ?
                    <div className='text-danger fw-bold mt-3 '> Không có nhân viên nào được tìm thấy </div>
                    : <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col-1">
                                    STT
                                </th>
                                <th scope="col">HỌ TÊN</th>
                                <th scope="col">GIỚI TÍNH</th>
                                <th scope="col">NGÀY SINH</th>
                                <th colSpan={2} scope='col-2'>TÀI KHOẢN</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">ĐIỆN THOẠI</th>
                                <th scope="col" className='col-2' colSpan="2">TÁC VỤ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Accounts.map((account, i) => (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{account.hoten}</td>
                                        <td>{account.sex}</td>
                                        <td>{account.date}</td>
                                        <td>TK: {account.email}</td>
                                        <td>MK: {account.password}</td>
                                        <td>
                                            <img src={`/image/avt/${account.avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                        </td>
                                        <td>{account.sdt}</td>
                                        <td className="text-center">
                                            <button
                                                className="text-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit"
                                                onClick={() => setShow(account)}

                                            >
                                                <Icon icon={faPenToSquare} />
                                            </button>
                                        </td>
                                        <td className="text-center">
                                            <button className="text-danger" onClick={() => deleteAccount(account._id)} >
                                                <Icon icon={faTrashCan} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}

export default Employee;