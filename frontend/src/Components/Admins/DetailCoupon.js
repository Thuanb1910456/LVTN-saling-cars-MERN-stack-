import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailCoupon(props) {
    var { id } = useParams()
    const [coupon, setCoupon] = useState({})
    useEffect(() => {
        (id != null) && axios.get(`http://localhost:5000/api/phieunhap/${id}`)
            .then((res) => {
                setCoupon(res.data.data.phieunhap);

            })

        // eslint-disable-next-line
    }, [id]);
    return (
        <div className='boder-main'>
            <div className='mx-2'>
                <h2 className="text-center fs-4 fw-bold py-3 ">
                    THÔNG TIN CHI TIẾT
                </h2>
                <Row>
                    <Col md={6}>
                        <p className='fw-bold'>No: <span className='text-danger '>{coupon?._id}</span></p>
                    </Col>
                    <Col md={6}>
                        {
                            coupon.createdAt !== undefined ?
                                <p className='fw-bold'>Thời gian lập phiếu: <span className='text-primary'>{coupon.createdAt = new Date(coupon.createdAt).toLocaleString()}</span></p>
                                : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <p className='fw-bold'>Nhân viên lập: <span className='text-primary'>{coupon?.nhanvien?.hoten}</span></p>
                    </Col>
                    <Col md={3}>
                        <p className='fw-bold'>Mã nhân viên: <span className='text-primary'>{coupon?.nhanvien?._id}</span></p>
                    </Col>
                    <Col md={3}>
                        <p className='fw-bold'>Số điện thoại: <span className='text-primary'>{coupon?.nhanvien?.sdt}</span></p>
                    </Col>
                    <Col md={3}>
                        <p className='fw-bold'>Email: <span className='text-primary'>{coupon?.nhanvien?.email}</span></p>
                    </Col>

                </Row>
                <table className="table-export table table-bordered align-middle">
                    <thead className='table-secondary'>
                        <tr>
                            <th scope="col" className="col-1">
                                STT
                            </th>
                            <th scope="col">TÊN SẢN PHẨM</th>
                            <th>ẢNH</th>
                            <th>GIÁ BÁN</th>
                            <th>GIÁ NHẬP</th>
                            <th>SỐ LƯỢNG NHẬP</th>
                            <th>THÀNH TIỀN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupon !== undefined && coupon.products !== undefined ?
                                coupon.products.map((item, i) => (

                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={`/image/SanPham/${item.image}`} alt='...' style={{ width: "150px" }} />
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.giatien}</td>
                                        <td>{item.soluong}</td>
                                        <td>{item.giatien * item.soluong}</td>
                                    </tr>
                                )) : null
                        }
                    </tbody>
                    <tfoot>
                        <tr className='table-secondary'>
                            <td colSpan="6" className="text-start h5 fw-bold">Tổng giá trị:  </td>
                            <td colSpan="3" className="text-end h5 fw-bold"> {coupon?.total} $</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div >
    );
}

export default DetailCoupon;