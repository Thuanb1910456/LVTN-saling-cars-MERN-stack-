import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap'
import { ToastContainer, toast } from 'react-toastify';
function Category(props) {
    const [type, setType] = useState([])
    const [newType, setNewType] = useState([])
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [typeFind, setTypeFind] = useState([])
    const [files, setFiles] = useState()
    const changeFile = (e) => {
        setFiles(e.target.files[0])
    }
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/type')
            .then((res) => {
                setType(res.data.data.cars)
                setTypeFind(res.data.data.cars)
            })
        // .catch((console.log("loi");))
    }, [refresh])
    const deleteBrand = (id) => {
        axios
            .put(`http://localhost:5000/api/type/status/${id}`)
            .then((res) => {
                toast('Thương hiệu đã bị xóa.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setRefresh((prev) => prev + 1);
    }
    const onChange = (e) => {
        setNewType({ ...newType, [e.target.name]: e.target.value })
        setShow({ ...show, [e.target.name]: e.target.value })
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

    const addType = async () => {
        const formdata = new FormData()
        formdata.append('file', files)
        buildFormData(formdata, newType);
        axios
            .post("http://localhost:5000/api/type", formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.success('Thêm mới thành công.', {
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
            .catch((Error) => {
                toast.error('Đã xảy ra lỗi! Vui lòng kiểm tra lại.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
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
    const updateType = async (id) => {
        const formdata = new FormData()
        formdata.append('file', files)
        buildFormData(formdata, show);
        await axios
            .put(`http://localhost:5000/api/type/${id}`, formdata, {}, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.info('Cập nhật thành công.', {
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
            .catch((error) => {
                toast.error('Đã xảy ra lỗi! Vui lòng kiểm tra lại.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
        setShow(false)
        setRefresh((prev) => prev + 1);
    }
    const TypeFind = (e) => {
        const temp = typeFind.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setType(temp)
    }
    const statusType = (id) => {
        axios
            .put(`http://localhost:5000/api/type/status/${id}`)
            .then((res) => {
                toast.info('Cập nhật thành công.', {
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
        setRefresh((prev) => prev + 1);
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between px-3 pb-2'>
                <h4 className='text-primary fw-bold text-uppercase'>Danh mục sản phẩm</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Nhập thông tin cần tìm"
                    onChange={TypeFind}
                />
                <Button variant="success" onClick={() => setShow(true)}>Thêm danh mục mới <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)}>
                    <Modal.Header>
                        <Modal.Title>Danh mục sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>TÊN DANH MỤC</Form.Label>
                                <Form.Control type="text" name="name" placeholder={show.name ? show.name : "Thương hiệu mới"} onChange={onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>LOGO THƯƠNG HIỆU</Form.Label>
                                <Form.Control type="file"
                                    multiple
                                    name="logo"
                                    onChange={changeFile}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            show._id !== undefined ?
                                <Button variant="primary" onClick={() => updateType(show._id)}>
                                    Cập nhật
                                </Button> :
                                <Button variant="success" onClick={() => addType()}>
                                    Thêm
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div >
            {
                type.length === 0 ?
                    <div className='mt-3 text-danger fw-bold'> không có danh mục nào được tìm thấy.</div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    STT
                                </th>
                                <th scope="col">TÊN DANH MỤC</th>
                                <th scope="col" className="col-2">
                                    LOGO
                                </th>
                                <th scope="col" className="col-2">
                                    HIỂN THỊ
                                </th>
                                <th scope="col" className="col-2" colSpan="2">
                                    TÁC VỤ
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-uppercase'>
                            {type.map((Type, i) => (
                                <tr key={i}>
                                    <td className="text-center">{i}</td>
                                    <td>{Type.name}</td>
                                    <td className="text-center">
                                        <img src={`/image/ThuongHieu/${Type.logo}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusType(Type._id) }} checked={Type.status} />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit"
                                            onClick={() => setShow(Type)}

                                        >
                                            <Icon icon={faPenToSquare} />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="text-danger" onClick={() => deleteBrand(Type._id)}>
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div >
    );
}

export default Category;