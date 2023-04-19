import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faSquarePlus, } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare, } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
function Products(props) {
    const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    const [refresh, setRefresh] = useState(0)
    const [Type, setType] = useState([])
    const [Products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState({})
    const [ProductFind, setProductFind] = useState([])
    const [files, setFiles] = useState()

    const changeFile = (e) => {
        setFiles(e.target.files[0])
    }
    const onChange = (e) => {
        setSelected({ ...selected, [e.target.name]: e.target.value })
    }

    const addProducts = () => {
        const formdata = new FormData()
        formdata.append('file', files)
        selected.nhanvien = curentAdmin._id
        buildFormData(formdata, selected);
        axios
            .post('http://localhost:5000/api/products', formdata, {}, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.success('Thêm mới sản phẩm thành công.', {
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
                setShow(false);
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
    }

    const statusProducts = (id) => {
        axios
            .put(`http://localhost:5000/api/products/status/${id}`)
            .then((res) => { })
        setRefresh((prev) => prev + 1);
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

    const editProducts = async (id) => {
        const formdata = new FormData()
        formdata.append('file', files)
        buildFormData(formdata, selected);
        await axios
            .put(`http://localhost:5000/api/products/${id}`, formdata, {}, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
                toast.info('Cập nhật thông tin thành công.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setShow(false);
                setTimeout(
                    function () {
                        setRefresh((prev) => prev + 1)
                    },
                    3000
                );
            })
    }
    const deleteProducts = (id) => {
        axios
            .put(`http://localhost:5000/api/products/${id}`, {
                deleted: true
            })
            .then((res) => {
                toast('Sản phẩm đã bị xóa.', {
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
    }
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/type')
            .then((res) => {
                setType(res.data.data.cars)
            })
    }, [])
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data.data.cars)
                setProductFind(res.data.data.cars)
            })
    }, [refresh])

    const productsfind = (e) => {
        const temp = ProductFind.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    return (
        <div className='boder-main'>
            <ToastContainer />
            <div className='d-flex justify-content-between mt-2 px-4 pb-2'>
                <h4 className='text-primary fw-bold text-uppercase'>danh sách sản PHẨM</h4>
                <input type="text"
                    className="form-control w-50 "
                    placeholder="Nhập thông tin cần tìm"
                    onChange={productsfind}

                />
                <Button variant="success" onClick={() => setShow(true)}>Thêm sản phẩm mới <Icon icon={faSquarePlus} /></Button>
                <Modal show={show !== false} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> {selected._id ? "Cập nhật sản phẩm" : "Sản phẩm mới"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>TÊN SẢN PHẨM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.name ? selected.name : "Tên sản phẩm "}
                                            name="name"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>GIÁ NHẬP VÀO</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.giatien ? selected.giatien : "Giá nhập vào"}
                                            name="giatien"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>SỐ LƯỢNG NHẬP</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.soluong ? selected.soluong : "Nhập số lượng"}
                                            name="soluong"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>TỔNG TIỀN </Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="tongtien"
                                            onChange={onChange}
                                            value={selected.soluong * selected.giatien}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>THƯƠNG HIỆU</Form.Label>
                                        <Form.Select aria-label="Default select example" name="type" onChange={onChange}>
                                            <option>--Chọn--</option>
                                            {Type.map((type, idx) => (
                                                <option name="id" value={type._id} key={idx}>{type.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formFileMultiple">
                                        <Form.Label >HÌNH ẢNH</Form.Label>
                                        <Form.Control
                                            type="file"
                                            multiple
                                            name="image"
                                            onChange={changeFile}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className='mt-2'>MÔ TẢ SẢN PHẨM</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.describe ? selected.describe : "Thêm thông tin mổ tả"}
                                            name="describe"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className='mt-2'>GIÁ BÁN</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={selected.price ? selected.price : "Giá bán"}
                                            name="price"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Form.Label>THÔNG TIN CHI TIẾT</Form.Label>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.loaiso ? selected.loaiso : "Hộp số"}
                                            name="loaiso"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.color ? selected.color : "Màu sơn"}
                                            name="color"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.wieght ? selected.wieght : "Trọng lượng thân xe"}
                                            name="wieght"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mt-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.fuel ? selected.fuel : "Nhiên liệu"}
                                            name="fuel"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Label className='mt-2'>Note</Form.Label>
                                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder={selected.ghichu ? selected.ghichu : "Ghi chú sản phẩm"}
                                            name="ghichu"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" >
                            Close
                        </Button>
                        {
                            selected._id !== undefined ?
                                <Button variant="primary" onClick={() => editProducts(selected._id)}>
                                    Cập nhật
                                </Button> :
                                <Button variant="primary" onClick={() => addProducts()}>
                                    Thêm
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
            {
                Products.length === 0 ?
                    <div className='mt-3 text-danger fw-bold '>Không có sản phẩm nào được tìm thấy</div> :
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col" className="col-1">
                                    STT
                                </th>
                                <th scope="col">TÊN SẢN PHẨM</th>
                                <th scope="col" className="col-2">
                                    THƯƠNG HIỆU
                                </th>
                                <th>ẢNH</th>
                                <th>GIÁ NHẬP</th>
                                <th>GIÁ BÁN</th>
                                <th>SỐ LƯỢNG</th>
                                <th>HIỂN THỊ</th>
                                <th scope="col" className="col-2" colSpan="3">
                                    TÁC VỤ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products.map((product, idx) => (
                                <tr key={idx} >
                                    <td> {idx}</td>
                                    <td>{product.name}</td>
                                    <td className="text-center text-uppercase">
                                        {product.type.name}
                                    </td>
                                    <td >
                                        <img src={`/image/SanPham/${product.image}`} className="mb-2 mt-2" style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>{product.giatien}</td>
                                    <td>{product.price}</td>
                                    <td>{product.soluong}</td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusProducts(product._id) }} checked={product.status} />
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#i${product._id}`}
                                        >
                                            <Icon icon={faArrowUpRightFromSquare} />
                                        </button>
                                        <div
                                            className="modal fade"
                                            id={`i${product._id}`}
                                            tabIndex="-1"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <div className="modal-title fs-5 fw-bold text-uppercase">
                                                            Thông tin chi tiết
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body text-start">
                                                        <p className="text-uppercase">
                                                            Mã sản phẩm: <b>{product._id}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Tên sản phẩm: <b>{product.name}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            thương Hiệu: <b>{product.type.name}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Giá bán: <b>{product.price} Triệu</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            màu sắc: <b>{product.color}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Trọng lượng xe: <b>{product.wieght}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            loại số xe: <b>số {product.loaiso}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Nhiên liệu <b>{product.fuel}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            Mô tả: <b>{product.describe}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            nhân viên nhập hàng: <b>{product.nhanvien?.hoten}</b>
                                                        </p>
                                                        <p className="text-uppercase">
                                                            ngày nhập : <b>{product.updatedAt = new Date(product.createdAt).toLocaleString()}</b>
                                                        </p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success me-2"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Đóng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button className='text-success' onClick={() => {
                                            setShow(true);
                                            setSelected(product)
                                        }}><Icon icon={faPenToSquare} /></button>
                                    </td>
                                    <td className="text-center">
                                        <button className="text-danger" onClick={() => deleteProducts(product._id)} >
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
            }

        </div >

    );
}

export default Products;