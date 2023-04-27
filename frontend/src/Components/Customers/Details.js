import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Table, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCommentDots, faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import ThreeSixty from 'react-360-view'
function Details(props) {
    var { id } = useParams()
    var [Product, setProduct] = useState({})
    var [Products, setProducts] = useState([])
    const Navigate = useNavigate()
    const curentAccount = localStorage.currentAccount ? JSON.parse(localStorage.currentAccount) : null
    const [comment, setComment] = useState({});
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }
    const addcomment = () => {
        if (curentAccount === null) {
            toast('Vui lòng đăng nhập trước khi đăng bình luận ', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(
                () => (Navigate('/login')),
                4000
            );
        }
        comment.products = id
        comment.customer = curentAccount._id
        if (Object.entries(comment.content).length !== 0) {
            axios.post('http://localhost:5000/api/comment/', comment, {})
                .then((res) => {
                    setRefresh((prev) => prev + 1);
                })
        }
    }
    const addToCart = () => {
        if (curentAccount === null) {
            toast.error('Vui lòng đăng nhập trước khi mua hàng', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setTimeout(
                () => (Navigate('/login')),
                4000
            );
        }
        else {
            axios
                .post(`http://localhost:5000/api/oder/user/${curentAccount._id}`, {
                    customer: curentAccount._id,
                    id_product: id,
                    quantity: 1,
                })
                .then((res) => {
                    if (res) {
                        toast.success('Thêm vào giỏ hàng thành công ', {
                            position: "top-center",
                            autoClose: 3000,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                        setTimeout(
                            () => (Navigate('/cart')),
                            4000
                        );
                    }
                })
        }
    }

    useLayoutEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data.data.cars);
            })
        // eslint-disable-next-line
    }, [id, refresh]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products`)
            .then((res) => {
                setProducts(res.data.data.cars.filter(e => e.type?._id === Product.type?._id));
            })
        axios
            .get(`http://localhost:5000/api/comment/products/${id}`)
            .then((res) => {
                setComments(res.data?.data?.comment.filter((e) => (e.status === true)))
            })
        // eslint-disable-next-line
    }, [Product]);


    return (
        <Container fluid className='padding-header'>
            <ToastContainer />

            {Product.image && (
                <Row  >
                    <Col xs={12} sm={7} >
                        <div className='container'>
                            {
                                Product._id === "642580f2026a6d9ccfb76647" ?
                                    <ThreeSixty
                                        amount={75}
                                        imagePath="https://fastly-production.24c.in/webin/360"
                                        fileName="output_{index}.jpeg"
                                        spinReverse="false"
                                        autoplay="24"
                                        loop="10"
                                        isWheelZoom="false"
                                    />
                                    : <img src={`/image/SanPham/${Product.image}`} className='w-100' alt='...' />
                            }

                            <div className='mt-0 text-start ms-4'>
                                <p className=' fw-bold mb-0 text-primary'>Sản phẩm tặng kèm kèm:</p>
                                <span>
                                    1 Bọc vô lăng cho ô tô,
                                    1 Thảm lót sàn ô tô,
                                    1 Dung dịch vệ sinh nội thất ô tô,
                                    1 Camera hành trình và camera cảm biến lùi,
                                    4 Cảm biến áp suất lốp,
                                    1 Bơm lốp ô tô,
                                    1 Giá đỡ điện thoại,
                                    2 Cần gạt mưa,
                                    1 Dán phim cách nhiệt lên kính,
                                    2 Nẹp cửa chống va đập,
                                    2 Gương chiếu hậu góc rộng,
                                    1 Bình chữa cháy mini
                                </span>
                            </div>
                            <hr />
                        </div>
                        <div className='text-start mx-5 mt-1'>
                            <h4 >Đánh giá <Icon icon={faCommentSms} /> </h4>
                            {comments.length !== 0 ?
                                comments.map((item, i) => {
                                    return (
                                        <div className='mt-2 d-flex align-items-center' key={i}>
                                            <div className='mx-2'>
                                                {
                                                    item?.customer?.avt ?
                                                        < img src={`/image/Avt/${item?.customer?.avt}`} alt='...' style={{ width: '40px', borderRadius: "50%" }} />
                                                        :
                                                        <img src={`/image/Avt/Avatartrang.jpg`} alt='...' style={{ width: '40px', borderRadius: "50%" }} />

                                                }
                                            </div>
                                            <div>
                                                <div className='text-primary'> {item?.customer?.name}</div>
                                                <div style={{ fontSize: "18px" }}>{item.content}</div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                null
                            }

                        </div>
                    </Col>
                    <Col xs={12} sm={5}>
                        <div className='mx-5'>
                            <h3 className='fw-bolder text-uppercase'>Thông tin sản phẩm</h3>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Id</td>
                                        <td className='text-end'>{Product._id}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Name</td>
                                        <td className='text-end'>{Product.name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>type</td>
                                        <td className='text-end'>{Product.type.name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Price</td>
                                        <td className='text-end'>{new Intl.NumberFormat('vi').format(Product.price)} $</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>Gear</td>
                                        <td className='text-end'>{Product.loaiso}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>color</td>
                                        <td className='text-end'>{Product.color}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>fuel</td>
                                        <td className='text-end'>{Product.fuel}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start fw-bold text-uppercase'>describe</td>
                                        <td className='text-end'>{Product.describe}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className='mt-3'>
                                <Button variant='success' onClick={addToCart}>Thêm vào giỏ hàng<Icon icon={faCartArrowDown} /> </Button>
                            </div>
                        </div>
                        <div className='comment-Products mx-5'>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Bình luận sản phẩm <Icon icon={faCommentDots} /></Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Bình luận" name='content' onChange={onChange} />
                                </Form.Group>
                            </Form>
                            <Button variant='primary' onClick={addcomment}>Đăng bình luận</Button>
                        </div>
                    </Col>
                </Row>
            )
            }
            <Container className='mt-2'>
                <Row >
                    <h4 className='text-start text-uppercase text-danger'> Sản phẩm cùng thương hiệu</h4>
                    {
                        Products.map((item, idx) => {
                            return idx < 4 && (
                                <div key={idx} className='col-md-4 col-sm-6 col-xs-12'>
                                    <Card className='card'>
                                        <Card.Img variant="top" src={`/image/SanPham/${item.image}`} style={{ width: "auto", height: "400px", maxHeight: "300px" }} />
                                        <hr />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text className='text-line'>
                                                <span className='text-primary fw-bold'>{new Intl.NumberFormat('vi').format(item.price)} $</span> <br />
                                                <span>{item.describe}</span>
                                            </Card.Text>
                                            <Link className="text-primary" to={`/detail/${item._id}`}>Xem thông tin chi tiết</Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                </Row>
            </Container>
        </Container >
    );
}

export default Details;