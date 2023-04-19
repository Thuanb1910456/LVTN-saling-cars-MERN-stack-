import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Customer(props) {
    const [Accounts, setAccounts] = useState([])
    const [show, setShow] = useState(false)
    const [newAccount, setNewAccount] = useState({})
    const [Refresh, setRefresh] = useState(0)
    const [FindAccount, setFindAccount] = useState([])
    const onChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value })
        setShow({ ...show, [e.target.name]: e.target.value })
    }
    // console.log(newAccount);
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/user")
            .then((res) => {
                setAccounts(res.data.data.user)
                setFindAccount(res.data.data.user)
            })
    }, [Refresh])
    const addAccount = () => {
        newAccount.avt = newAccount.avt.slice(12);
        axios
            .post("http://localhost:5000/api/user", newAccount, {})
            .then((res) => {
                toast.success('Tạo mới thành công', {
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
            .delete(`http://localhost:5000/api/user/${id}`)
            .then((res) => {
                toast.error('Đã xóa tài khoản', {
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
            .put(`http://localhost:5000/api/user/${id}`, show, {})
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
        const temp = FindAccount.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setAccounts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between m-3'>
                <h4 className='text-primary fw-bold text-uppercase'>tài khoản khách hàng</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Nhập họ hoặc tên khách hàng"
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
                                <Form.Control type="text" name="name" placeholder= { show.name ? show.name  : "Họ và Tên" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" placeholder={ show.email ? show.email  : "Tài khoản"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Mật khẩu" onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Điện thoại</Form.Label>
                                <Form.Control type="text" name="sdt" placeholder={ show.sdt ? show.sdt  : "Nhập số điện thoại" } onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" name="adress" placeholder={ show.adress ? show.adress  : "Địa chỉ hiện tại"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ảnh đại diện</Form.Label>
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
                    <div className='text-danger fw-bold mt-3 h4'> Không khách hàng nào được tìm thấy </div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    STT
                                </th>
                                <th scope="col">HỌ TÊN</th>
                                <th scope="col-2" colSpan={2}>TÀI KHOẢN</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">ĐIỆN THOẠI</th>
                                <th scope='col'>Địa Chỉ </th>
                                <th scope="col" className='col-2' colSpan="2">TÁC VỤ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Accounts.map((account, i) => (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{account.name}</td>
                                        <td>TK:{account.email} </td>
                                        <td>MK:{account.password}</td>
                                        <td>
                                            <img src={`/image/avt/${account.avt}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                        </td>
                                        <td>{account.sdt}</td>
                                        <td>{account.adress}</td>
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

export default Customer;