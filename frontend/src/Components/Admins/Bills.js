import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faFilter, faPrint } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { Link } from "react-router-dom"
function Bills(props) {
    const [show, setShow] = useState('')
    const [bill, setBill] = useState([])
    const [filterBill, setFilterBill] = useState([])
    useLayoutEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://localhost:5000/api/bill/status/1', {
                params: {
                    status: 'Đã giao hàng thành công',
                }
            })
            setBill(res.data.data)
            setFilterBill(res.data.data)
        }
        fetchData()
    }, [])
    function filter(text) {
        setShow(text)
        const temp = filterBill
        setBill(temp)
    }
    const onChange = (e) => {
        const temp = filterBill.filter(element => element.customer.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setBill(temp)
    }

    return (
        <div className='boder-main'>
            <h2 className='text-uppercase text-center text-primary fw-bolder mt-2'>danh sách hóa đơn</h2>
            <h3 className='text-uppercase text-start text-success fw-bolder mx-2'>filter <Icon icon={faFilter} /></h3>
            <Row className='m-3'>
                <Col xs={12} md={4}>
                    <h4 style={{ color: 'tomato', fontWeight: "bolder" }}>Tất cả đơn hàng đã giao <input type='checkbox' onChange={() => { filter('') }} checked={show === ''} /> </h4>
                </Col>
                <Col xs={12} md={8}>
                    <div className='d-flex mb-2'>
                        <input type="text"
                            className="form-control w-50 "
                            placeholder="Nhập tên khách hàng"
                            onChange={onChange}
                        />
                    </div>
                </Col>
            </Row>
            <div style={{ width: '100%' }}>
                <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}  >
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-secondary text-center">
                                <th scope="col">STT</th>
                                <th scope="col">TÊN SẢN PHẨM</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">SỐ LƯỢNG</th>
                                <th scope="col">GIÁ TIỀN</th>
                                <th scope="col">TÊN KHÁCH HÀNG</th>
                                <th scope="col">ĐỊA CHỈ NHẬN HÀNG</th>
                                <th scope="col">SĐT LIÊN HỆ</th>
                                <th scope="col">THANH TOÁN</th>
                                <th scope="col">TRẠNG THÁI ĐƠN HÀNG</th>
                                <th scope="col">NGÀY ĐẶT</th>
                                <th scope="col">NGÀY GIAO </th>
                                <th scope="col">NHÂN VIÊN</th>
                                <th scope="col">SĐT Nhân viên</th>
                                <th scope="col">THAO TÁC</th>
                            </tr>
                        </thead>
                        {
                            bill !== undefined && bill.length !== 0 ?
                                <tbody>
                                    {
                                        bill.reverse().map((value, idx) => {
                                            return [
                                                value.products.map((item, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.id_product.name}</td>
                                                            <td>
                                                                <img src={`/image/SanPham/${item.id_product.image}`} style={{ width: "100px" }} alt='...' />
                                                            </td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.id_product.price}</td>
                                                            <td>{value.name_customer !== undefined ? value.name_customer : value.customer.name}</td>
                                                            <td>{value.adress !== undefined ? value.adress : value.customer.adress}</td>
                                                            <td>{value.sdt !== undefined ? value.sdt : value.customer.sdt}</td>
                                                            <td>{value.pay}</td>
                                                            <td className='text-success fw-bold'>{value.status}</td>
                                                            <td>{value.createdAt = new Date(value.createdAt).toLocaleString()}</td>
                                                            <td>{value.updatedAt = new Date(value.createdAt).toLocaleString()}</td>
                                                            <td>{value.nhanvien !== undefined ? value.nhanvien : "Hiện chưa có người giao"}</td>
                                                            <td>{value.sdtnhanvien !== undefined ? '' + value.sdtnhanvien : "Trống"}</td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                }),
                                                <tr key={idx} className='table-secondary'>
                                                    <td colSpan={3} className='fw-bolder text-uppercase text-start'>Tổng tiền</td>
                                                    <td className='fw-bolder text-primary text-end' colSpan={11}>{new Intl.NumberFormat('vi').format(value.total)} $</td>
                                                    <td colSpan={1}> <button className='btn btn-success'><Link className='text-white' to={`/admin/export/${value._id}`}><Icon icon={faPrint} /></Link></button></td>
                                                </tr>
                                            ]
                                        })
                                    }
                                </tbody> : <tbody>
                                    <tr className='text-center fw-bolder text-danger h3'><td colSpan={15}>Hiện chưa có đơn hàng</td></tr>
                                </tbody>
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Bills;