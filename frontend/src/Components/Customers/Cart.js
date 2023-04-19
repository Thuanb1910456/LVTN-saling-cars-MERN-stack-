import React, { useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faAmazonPay } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ToastContainer, toast } from 'react-toastify';
function Cart(props) {
    const Navigate = useNavigate()
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [infoBill, setInfoBill] = useState({})
    const [deliveryAddress, setDeliveryAddress] = useState([])
    const [open, setOpen] = useState(false);
    // thanh toán 
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Thanh toán hóa đơn ",
                    amount: {
                        currency_code: "USD",
                        value: totalValue + totalValue * 0.01,
                    },
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };
    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
            console.log(payer);
            addToBill()
        });

    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const onchange = (e) => {
        setInfoBill({ ...infoBill, [e.target.name]: e.target.value })
    }

    function buttonPay(text) {
        if (text === 'Thanh toán online') {
            return (
                <div>
                    <Button className='text-end mb-3' variant='success' onClick={() => setShow(true)} >Thanh toán <Icon icon={faAmazonPay} /> </Button>
                    <PayPalScriptProvider
                        options={{


                            'client-id': "AdWBR9BN-R7fwq3CEx_SaRseMXqwRisxtYijtBvdzdnfj6CFvl52o8lc3J-KiGyGBbl19UXBnQ9L7deK"
                        }}>
                        {show ? (
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                            />
                        ) : null}
                        {
                            success ? (
                                <h3 className='text-success'>Thanh toán thành công</h3>
                            ) : null
                        }
                        {
                            orderID ? (
                                <h5> Mã thanh toán: {orderID}</h5>
                            ) : null
                        }
                        {
                            ErrorMessage ? (
                                <h3>{ErrorMessage}</h3>
                            ) : null
                        }
                    </PayPalScriptProvider>
                </div>

            )
        }
        else {
            return (
                <Button className='text-end' variant='warning' disabled >Thanh toán <Icon icon={faAmazonPay} /> </Button>
            )
        }
    }

    useLayoutEffect(() => {
        async function fecthData() {
            const res = ((await axios.get(`http://localhost:5000/api/oder/user/${curentAccount._id}`, {
                params: { idCustomer: curentAccount._id }
            }))).data.data.products
            setProducts(res)
            const add = ((await axios.get(`http://localhost:5000/api/deliveryAddress/${curentAccount._id}`))).data?.data?.adress?.deliveryAddress
            setDeliveryAddress(add)
        }
        fecthData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])
    const sumTotal = () => {
        var total = 0
        if (products !== null && products !== undefined && products.length !== 0) {
            for (let i = 0; i < products.length; i++) {
                total += products[i].quantity * products[i].id_product.price
            }
        }
        return total;
    }
    var totalValue = sumTotal();
    const deleteProducts = (id) => {
        if (products !== null && products !== undefined) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id_product._id === id) {
                    axios
                        .delete(`http://localhost:5000/api/oder/user/${curentAccount._id}`, {
                            params: {
                                idCustomer: curentAccount._id,
                                idObjects: products[i]._id
                            }
                        })
                        .then((res) => {
                            console.log("ádasdaasd", refresh)

                            toast.error('Xóa sản phẩm thành công', {
                                position: "top-center",
                                autoClose: 2000,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })
                            setTimeout(
                                () => (setRefresh((prev) => prev + 1)),
                                3000
                            );
                            console.log(refresh);
                        })
                }
            }
        }
    }
    function updateQuantity(id, quantity) {
        axios
            .post(`http://localhost:5000/api/oder/user/${curentAccount._id}`, {
                customer: curentAccount._id,
                id_product: id,
                quantity: quantity
            })
            .then((res) => {
                toast.info(res.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    () => (setRefresh((prev) => prev + 1)),
                    3000,
                );
            })
            .catch((err) => {
                toast.error('Cập nhật không thành công ', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
    }
    const addToBill = () => {
        infoBill.total = totalValue
        axios
            .post('http://localhost:5000/api/bill', {
                infoBill,
                products: products,
                customer: curentAccount._id,
            })
            .then((res) => {
                toast.success(' Đặt hàng thành công. Vui lòng chờ nhận hàng.', {
                    position: "top-center",
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setTimeout(
                    () => (Navigate('/bill')),
                    3000
                );
            })
        axios
            .post('http://localhost:5000/api/deliveryAddress', {
                infoBill,
                customer: curentAccount._id,
            })
    }
    return (
        <Container fluid className='padding-header'>
            <ToastContainer />
            <Row className='m-3'>
                <Col xs={4} sm={3}>
                    <div className='bg-light text-center '>
                        <h4 className='text-uppercase text-success'> <Icon icon={faCaretRight} className='m-1' />Thông tin khách hàng </h4>
                        <div className='text-start mx-3 pb-2'>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder={curentAccount.name} name='name_customer' onChange={onchange} required />
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={curentAccount.email} disabled />
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Điện thoại</Form.Label>
                                    {
                                        curentAccount.sdt ?
                                            <Form.Control type="text" placeholder={curentAccount.sdt} name='sdt' onChange={onchange} />
                                            :
                                            <Form.Control type="text" placeholder={'Nhập vào số điện thoại của bạn'} name='sdt' onChange={onchange} />
                                    }
                                </Form.Group>
                            </Form>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Địa chỉ đã giao</Form.Label>
                                    <Form.Select aria-label="Default select example" name='adress' onChange={onchange}>
                                        {deliveryAddress?.length !== 0 && deliveryAddress !== undefined ?
                                            deliveryAddress?.map((item, idx) => (
                                                <option value={item._id} key={idx}>{item.address}</option>
                                            )) : <option>Bạn chưa có địa chỉ nhận hàng</option>
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <Form>
                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                    className='mb-2'
                                >
                                    Nhập địa mới
                                </Button>
                                <Collapse in={open}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" id="example-collapse-text">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control type="text" placeholder='Nhập địa chỉ mới' name='adress' onChange={onchange} />
                                    </Form.Group>
                                </Collapse>

                            </Form>
                            <Button variant='danger' onClick={addToBill}>Gửi yêu cầu</Button>
                            <Button variant='primary mx-2' onClick={() => { Navigate('/products') }} type='submit'> Tiếp tục mua hàng</Button>
                        </div>
                    </div>
                </Col>
                <Col xs={8} sm={9}>
                    <table className="table align-middle text-center responsive">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope='col'>Tồn kho</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá tiền</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">xóa bỏ</th>
                            </tr>
                        </thead>
                        {products !== null && products !== undefined ?
                            products.map((item, idx) => {
                                return item.id_product !== undefined && (
                                    <tbody key={idx}>
                                        <tr >
                                            <td>{idx + 1}</td>
                                            <td>
                                                <img src={`/image/SanPham/${item.id_product.image}`} alt='...' style={{ width: "100px" }} />
                                            </td>
                                            <td >{item.id_product.name}</td>
                                            <td>{item.id_product.soluong}</td>
                                            <td>
                                                <div style={{
                                                    justifyContent: "center",
                                                    display: "flex",
                                                    borderRadius: "0.25rem",
                                                    overflow: "hidden",
                                                    border: "1px",
                                                }}>
                                                    <button style={{ padding: "0.125rem 0.25rem" }} onClick={() => updateQuantity(item.id_product._id, -1)}><Icon icon={faMinus} /></button>
                                                    <input type='text' readOnly value={item.quantity} style={{ width: "40px", textAlign: "center" }} />
                                                    <button style={{ padding: "0.125rem 0.25rem" }} onClick={() => updateQuantity(item.id_product._id, 1)}><Icon icon={faPlus} /></button>
                                                </div>
                                            </td>
                                            <td>{item.id_product.price}</td>
                                            <td>{item.id_product.price * item.quantity}</td>
                                            <td>
                                                <button className="text-danger" onClick={() => deleteProducts(item.id_product._id)}>
                                                    <Icon icon={faTrashCan} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            : null
                        }
                    </table>
                    <Row>
                        <div className='text-end g-3'>
                            <h4 >Tổng tiền: {new Intl.NumberFormat('vi').format(totalValue)} $</h4>
                            <h4 >VAT: 10%</h4>
                            <h4 >Tổng tiền cần thanh toán: {new Intl.NumberFormat('vi').format(totalValue + totalValue * 0.01)} $</h4>
                            <div>
                                <h4>Hình thức thanh toán</h4>
                                <div className='d-flex justify-content-end'>
                                    <Form.Select style={{ width: "250px" }} className='text-center mb-2' name='pay' onChange={onchange}>
                                        <option>--Lựa chọn-- </option>
                                        <option>Thanh toán khi nhận hàng</option>
                                        <option>Thanh toán online</option>
                                    </Form.Select>
                                </div>
                                {buttonPay(infoBill.pay)}
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}
export default Cart;