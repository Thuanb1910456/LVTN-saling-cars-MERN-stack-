import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon, FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCheck, faMicrophone, } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
function Products(props) {
    const [type, setType] = useState([])
    const [sort, setSort] = useState('')
    const [Products, setProducts] = useState([])
    const [ProductFind, setProductFind] = useState([])
    const [start, setStart] = useState(0);
    //pagination
    function PaginatedItems({ itemsPerPage }) {
        const end = start + itemsPerPage;
        const dataPage = Products.slice(start, end);
        const pageCount = Math.ceil(Products.length / itemsPerPage);
        const handlePageClick = (event) => {
            const number = (event.selected * itemsPerPage) % Products.length;
            setStart(number);
        };
        const currentPage = Math.round(Products.length / itemsPerPage);
        return (
            <Row>
                {
                    dataPage.length === 0 ? <h4 className='text-danger fw-bold'>Không có sản phẩm nào được tìm thấy</h4> :
                        dataPage.map((item, idx) => (
                            renderProducts(item, idx)
                        ))
                }
                <ReactPaginate
                    previousLabel="Trang trước"
                    nextLabel="Trang sau"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center mt-5"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    hrefAllControls
                    forcePage={currentPage}

                />
            </Row>
        );
    }
    //voice
    const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
    var speechApi = new SpeechToText();
    var status = 0

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/type')
            .then((res) => {
                // console.log(res);
                setType(res.data.data.cars)
            })
    }, [])
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/products')
            .then((res) => {
                // console.log(res);
                const temp = res?.data?.data?.cars.filter((e) => (e.deleted !== true))
                setProducts(temp)
                setProductFind(temp)
            })
    }, [])
    const onChange = (e) => {
        const temp = ProductFind.filter(element => element.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setProducts(temp)
    }
    const ProductType = (name) => {
        const temp = ProductFind.filter(element => element.type.name === name)
        setProducts(temp)
    }

    function renderProducts(item, idx) {
        if (item.status && item.soluong !== 0) {
            return (
                <Col xs={12} md={6} sm={6} key={idx} className='g-3'>
                    <Card className='card cardProduct border-success border border-2' >
                        <Link to={`/detail/${item._id}`}>
                            <Card.Img variant="top" src={`/image/SanPham/${item.image}`} className='w-100' />
                        </Link>
                        <Card.Body>
                            <Card.Title className='text-uppercase mt-3'>{item.name}</Card.Title>
                            <Card.Subtitle className='text-line'>
                                <div>
                                    <p className='p-0 m-0 fw-bolder'>Giá </p>
                                    <p className='text-primary fw-bold'>
                                        {new Intl.NumberFormat('vi').format(item.price)} $
                                    </p>
                                </div>
                                <span className=''>{item.describe}</span>
                            </Card.Subtitle>
                            <div className='rounded bg-light mt-2 mb-2 fw-bold' style={{ width: '150px' }}>
                                <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.color}
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='rounded bg-light me-3 fw-bold' style={{ width: '120px' }}>
                                    <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.loaiso}
                                </div>
                                <div className='rounded bg-light fw-bold' style={{ width: '100px' }}>
                                    <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.wieght}
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Title className='footer-card'>
                            <Link className="text-primary fw-bold text-center" to={`/detail/${item._id}`}>Xem chi tiết</Link>
                        </Card.Title>
                    </Card>
                </Col>
            )
        }
        else {
            return (
                <Col xs={12} md={6} sm={6} key={idx} className='g-3'>
                    <Card className='card cardProduct border-success border border-2' >
                        <Card.Img variant="top" src={`/image/SanPham/${item.image}`} className='w-100' />
                        <Card.Body>
                            <Card.Title className='text-uppercase mt-3'>{item.name}</Card.Title>
                            <Card.Subtitle className='text-line'>
                                <div>
                                    <p className='p-0 m-0 fw-bolder'>Giá </p>
                                    <p className='text-primary fw-bold'>
                                        {new Intl.NumberFormat('vi').format(item.price)} $
                                    </p>
                                </div>
                                <span className=''>{item.describe}</span>
                            </Card.Subtitle>
                            <div className='rounded bg-light mt-2 mb-2 fw-bold' style={{ width: '150px' }}>
                                <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.color}
                            </div>
                            <div className='d-flex flex-row'>
                                <div className='rounded bg-light me-3 fw-bold' style={{ width: '120px' }}>
                                    <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.loaiso}
                                </div>
                                <div className='rounded bg-light fw-bold' style={{ width: '100px' }}>
                                    <FontAwesomeIcon icon={faCheck} /> &nbsp;{item.wieght}
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Title className='footer-card'>
                            <Link className="text-danger fw-bolder" to={`/detail/${item._id}`} style={{ pointerEvents: "none" }}>Tạm hết hàng</Link>
                        </Card.Title>
                    </Card>
                </Col>
            )
        }
    }
    function renderType(item, idx) {
        if (item.status) {
            return (
                <h5 key={idx} className='m-1 text-start text-uppercase type' >
                    <Link className=" text-dark" onClick={() => ProductType(item.name)}><img src={`/image/ThuongHieu/${item.logo}`} alt='...' style={{ width: "50px" }} className='m-3' />{item.name}</Link>
                </h5>
            )
        }
    }

    const setPrice = (e) => {
        const temp = (ProductFind.filter(element => element.price < e.target.value))
        setProducts(temp)
    }

    useEffect(() => {
        if (sort === 'Từ thấp đến cao') {
            axios
                .get('http://localhost:5000/api/products')
                .then((res) => {
                    const temp = (res?.data?.data?.cars.filter((e) => (e.deleted !== true))).sort((a, b) => (a.price - b.price))
                    setProducts(temp)
                })
        }
        else if (sort === "Từ cao đến thấp") {
            axios
                .get('http://localhost:5000/api/products')
                .then((res) => {
                    // console.log(res);
                    const temp = (res?.data?.data?.cars.filter((e) => (e.deleted !== true))).sort((a, b) => (b.price - a.price))
                    setProducts(temp)
                })
        }
    }, [sort, Products])


    //voice
    speechApi.continuous = true;
    speechApi.interimResults = false;
    speechApi.lang = 'vi-VN'
    window.onload = function () {
        document.getElementById("voice").addEventListener("click", () => {
            if (status === 1) {
                status = 0;
                return speechApi.stop();
            }
            speechApi.start();
            status = 1;
            speechApi.onresult = function (event) {
                speechApi.stop()
                const temp = ProductFind.filter(e => e.name.toLowerCase().includes(event.results[0][0].transcript.toLowerCase()))
                setProducts(temp)
                status = 0
            };
            speechApi.onspeechend = function () {
                speechApi.stop();
                status = 0
            };
        });
    }

    return (
        <div >
            <video controls autoPlay muted loop preload='auto' className='w-100'>
                <source src='/image/Banner/videodemo.mp4' type='video/mp4' />
            </video>
            <Container fluid>
                <Row className='d-flex mt-4 pb-4 justify-content-center'>
                    <div className='d-flex w-50' >
                        <input type="text"
                            className="form-control mx-1"
                            placeholder="TÌM KIẾM SẢN PHẨM"
                            onChange={onChange}
                            style={{ height: "50px" }}
                        />
                        <Button variant='outline-success' id='voice' className='text-start'> <Icon icon={faMicrophone} /> </Button>
                    </div>
                </Row>
                <Row >
                    <Col xs={3} >
                        <div className='text-start bg-light p-3 ' style={{ position: 'sticky', zIndex: 1000, fontFamily: "cursive" }}>
                            <h4 style={{ color: "rgb(255,142,81)", textTransform: "uppercase" }}> <Icon icon={faCaretRight} className='me-1 mt-1' />Tất cả các dòng xe</h4>
                            {
                                type.map((item, idx) => (
                                    renderType(item, idx)
                                ))
                            }
                        </div>
                        <div className='text-start bg-light mt-5 p-3' style={{ position: 'sticky', zIndex: 1000 }}>
                            <h4 style={{ color: "rgb(255,142,81)", textTransform: "uppercase" }}  > <Icon icon={faCaretRight} className='me-1 mt-1' />Giá tiền</h4>
                            <Row className='m-1 d-flex text-primary'>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Từ thấp đến cao" name='price' value={'Từ thấp đến cao'} onChange={(e) => {
                                        setSort(e.target.value)

                                    }} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label="Từ cao đến thấp" name='price' value={'Từ cao đến thấp'} onChange={(e) => {
                                        setSort(e.target.value)

                                    }} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 100$" value={100} name='price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 200$" value={200} name='price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 300$" value={300} name='price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 400$" value={400} name='price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 500$" value={500} name='price' onChange={setPrice} />
                                </Col>
                                <Col sm={6}>
                                    <Form.Check inline type='radio' label=" Nhỏ hơn 1000$" value={1000} name='price' onChange={setPrice} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <Row className='d-flex'>
                            <h2 className='bg-light text-start text-info fw-bold py-2 text-uppercase'>  <Icon icon={faCaretRight} className='me-2 mt-1' />tất cả sản phẩm</h2>
                        </Row>
                        <Row>
                            <PaginatedItems itemsPerPage={4} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Products;