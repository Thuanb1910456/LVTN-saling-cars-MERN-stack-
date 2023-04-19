import React, { useLayoutEffect, useState } from 'react';
import { Row, Container, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function InfoCustomer(props) {
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const [user, setUser] = useState({})
    const [updateInfo, setUpdateInfo] = useState({})
    const [refresh, setRefresh] = useState(0)
    const [files, setFiles] = useState()

    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:5000/api/user/${curentAccount._id}`)
            setUser(res.data.data.user)
            setUpdateInfo(res.data.data.user)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    const onchange = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value })
    }

    const buildFormData = (formData, data, parentKey) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            formData.append(parentKey, value);
        }
    }
    const changeFile = (e) => {
        setFiles(e.target.files[0])
    }

    function update(id) {
        const formdata = new FormData()
        formdata.append('file', files)
        buildFormData(formdata, updateInfo);
        axios.put(`http://localhost:5000/api/user/${id}`, formdata, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((res) => {
                toast.success('Cập nhật thành công.', {
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

    if (Object.keys(user).length === 0) {
        setUser(curentAccount)
    }
    return (
        <div className='padding-header'>
            <ToastContainer />
            <h2 className='text-uppercase text-primary fw-bolder'>thông tin cá nhân của bạn</h2>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h2 className='text-info'>Cập nhật thông tin</h2>
                        <div className='text-start'>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder={user.name} name='name' onChange={onchange} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder={'Mật khẩu mới'} name='password' onChange={onchange} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Điện thoại</Form.Label>
                                    {
                                        user.sdt ?
                                            <Form.Control type="text" placeholder={user.sdt} name='sdt' onChange={onchange} />
                                            :
                                            <Form.Control type="text" placeholder={'Nhập vào số điện thoại của bạn'} name='sdt' onChange={onchange} />
                                    }
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Hình ảnh</Form.Label>
                                    <Form.Control type="file" name='avt' onChange={changeFile} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Địa chỉ</Form.Label>
                                    {
                                        user.adress ?
                                            <Form.Control type="text" placeholder={user.adress} name='adress' onChange={onchange} />
                                            :
                                            <Form.Control type="text" placeholder={'Nhập vào địa chỉ của bạn'} name='adress' onChange={onchange} />
                                    }
                                </Form.Group>

                                <Button variant='danger' onClick={() => update(user._id)}>Cập nhật</Button>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        {
                            user !== undefined ?
                                <div className='text-start ps-5 m-3'>
                                    <h5>Họ và tên: {user.name}</h5>
                                    <h5>Tài khoản: {user.email}</h5>
                                    <h5>Điện thoại: {user.sdt ? user.sdt : <span className='text-danger'> Chưa có thông tin </span>}</h5>
                                    <h5>Địa chỉ: {user.adress ? user.adress : <span className='text-danger'> Chưa có thông tin </span>}</h5>
                                    <h5>Hình ảnh
                                        <div>
                                            <img src={`image/Avt/${user.avt}`} alt={user.avt} style={{ width: "300px" }} />
                                        </div>
                                    </h5>

                                </div> : null
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default InfoCustomer;