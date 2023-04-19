import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBan, faEdit, faPlus, faPrint, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, InputGroup, Modal, Row, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ImportCoupon(props) {
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(0)
    const [importProducts, setImportProducts] = useState([])
    const curentAdmin = localStorage.admin ? JSON.parse(localStorage.admin) : null
    var [totalvalue, setTotalValue] = useState(0);

    const onChangegiatien = (id, e) => {
        for (let i = 0; i < importProducts.length; i++) {
            if (importProducts[i]._id === id) {
                importProducts[i].giatien = e.target.value;
                setImportProducts(prev => [...prev]);
            }
        }
    }
    const onChangesoluong = (id, e) => {
        for (let i = 0; i < importProducts.length; i++) {
            if (importProducts[i]._id === id) {
                importProducts[i].soluong = e.target.value;
                setImportProducts(prev => [...prev]);
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data.data.cars)
            })
    }, [refresh])
    useEffect(() => {
        setTotalValue(importProducts.reduce((prev, current) => prev + current.soluong * current.giatien, 0))

    }, [importProducts])

    function showContent(product) {
        setImportProducts(prev => [...prev, product])
        setRefresh((prev) => prev + 1);
    }

    function deleteProduct(product) {
        setImportProducts((importProducts.filter((e) => e !== product)))
    }

    function addCoupon() {
        axios.post('http://localhost:5000/api/phieunhap', {
            nhanVien: curentAdmin._id,
            products: importProducts,
            total: totalvalue,
        })
            .then((res) => {
                toast.success('Thêm phiếu nhập thành công', {
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

    return (
        <div className='boder-main'>
            <ToastContainer />
            <div >
                <h2 className="text-center text-uppercase fw-bold text-primary">
                    tạo mới phiếu nhập
                </h2>
                <Row className='justify-content-end m-2' >
                    <Col md="6" className='text-end '>
                        <Button variant='danger' className='m-2'>
                            <Icon icon={faBan} /> Xoá phiếu
                        </Button>
                        <Button variant='success'>
                            <Icon icon={faPrint} /> Lưu và in
                        </Button>
                    </Col>
                </Row>
                <table className="table-export table table-bordered align-middle ">
                    <thead className="table-header table-secondary">
                        <tr>
                            <th scope="col-1">
                                STT
                            </th>
                            <th scope="col">TÊN SẢN PHẨM</th>
                            <th scope="col" className="col-2">
                                THƯƠNG HIỆU
                            </th>
                            <th>ẢNH</th>
                            <th>GIÁ BÁN</th>
                            <th>GIÁ NHẬP</th>
                            <th>SỐ LƯỢNG NHẬP</th>
                            <th scope="col" className="col">
                                TÁC VỤ
                            </th>
                            <th scope='col'>
                                <Button variant="success" onClick={() => setShow(true)}>
                                    <Icon className='fs-5 text-warning' icon={faPlus} />
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    {
                        importProducts.length !== 0 ?
                            importProducts.map((item, i) => (
                                <tbody key={i}>
                                    <tr >
                                        <td>{i}</td>
                                        <td>{item.name}</td>
                                        <td>{item.type.name}</td>
                                        <td>
                                            <img src={`/image/SanPham/${item.image}`} alt='...' style={{ width: "150px" }} />
                                        </td>
                                        <td>{item.price}</td>
                                        <td>
                                            <InputGroup size='sm' className="mb-3">
                                                <InputGroup.Text id="nputGroup-sizing-sm"><Icon icon={faEdit} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder={item.giatien}
                                                    aria-label="Username"
                                                    aria-describedby="nputGroup-sizing-sm"
                                                    className='text-center'
                                                    onChange={(e) => onChangegiatien(item._id, e)}
                                                />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <InputGroup size='sm' className="mb-3">
                                                <InputGroup.Text id="nputGroup-sizing-sm"><Icon icon={faEdit} /></InputGroup.Text>
                                                <Form.Control
                                                    placeholder={item.soluong}
                                                    aria-label="Username"
                                                    aria-describedby="nputGroup-sizing-sm"
                                                    className='text-center'
                                                    onChange={(e) => onChangesoluong(item._id, e)}
                                                />
                                            </InputGroup>
                                        </td>
                                        <td>
                                            <Button variant='outline-danger' onClick={() => deleteProduct(item)}> <Icon icon={faTrashCanArrowUp} /></Button>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            )) : null
                    }
                    <tfoot>
                        <tr>
                            <td colSpan="7" className="text-start h5 fw-bold">Tổng giá trị thanh toán: </td>
                            <td colSpan="2" className="fw-bold">{totalvalue} $</td>
                        </tr>
                        <tr>
                            <td colSpan="12">
                                <Button variant='primary' onClick={() => addCoupon()} >Thêm phiếu</Button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "scroll" }}>
                    {
                        products !== undefined && products.length !== 0 ?
                            products.map((item, i) => (
                                <div key={i} className='d-flex'>
                                    <button disabled className='fw-bold text-dark'>{i+1}</button>
                                    <button className='border-0 btn btn-outline-info text-dark w-100 text-start m-1' onClick={() => showContent(item)}>{item.name}</button>
                                </div>
                            )) :
                            <div>
                                <h5>Chưa có sản phẩm</h5>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default ImportCoupon;