import { faPenToSquare, faPrint } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import { Link } from 'react-router-dom';

function ShowCoupon(props) {
    const [showAllCoupon, setShowAllCoupon] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/phieunhap')
            .then((res) => {
                setShowAllCoupon(res.data.data.phieunhap)
            })
    }, [])
    return (
        <div className='boder-main'>
            <div>
                <h2 className="text-center fs-4 fw-bold text-primary">
                    TẤT CẢ PHIẾU NHẬP
                </h2>
                <Row className='justify-content-end m-3' >
                    <Col md="6" className='text-end '>
                        <Button variant='success'>
                            <Icon icon={faPrint} /> IN TẤT CẢ
                        </Button>
                    </Col>
                </Row>
                <table className="table-export table table-bordered align-middle r">
                    <thead className="table-header table-secondary">
                        <tr>
                            <th scope="col-1">
                                STT
                            </th>
                            <th scope="col">NGƯỜI LẬP PHIẾU</th>
                            <th scope="col">NGÀY LẬP PHIẾU</th>
                            <th scope="col">TỔNG TIỀN </th>
                            <th scope="col" colSpan={2} >
                                TÁC VỤ
                            </th>
                        </tr>
                    </thead>
                    {
                        showAllCoupon !== undefined && showAllCoupon.length !== 0 ?
                            showAllCoupon.map((item, i) => (
                                <tbody key={i}>
                                    <tr>
                                        <td>{i}</td>
                                        <td>{item.nhanvien.hoten}</td>
                                        <td>{item.createdAt = new Date(item.createdAt).toLocaleString()}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <Link to={`/admin/phieunhap-detail/${item._id}`}>
                                                <Button variant='info'>
                                                    <Icon icon={faPenToSquare} className='text-white' />
                                                </Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant='success'>
                                                <Icon icon={faPrint} />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )) :
                            <tbody>
                                <tr>
                                    <td colSpan={5} className='h3 text-center text-danger ' >Chưa có phiếu nhập nào</td>
                                </tr>
                            </tbody>
                    }
                </table>
            </div>

        </div >
    );
}

export default ShowCoupon;