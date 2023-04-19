import React, { useLayoutEffect, useState } from 'react';
import axios from 'axios'
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
function Comment(props) {
    const [comment, setComent] = useState([])
    const [refresh, setRefresh] = useState(0)
    useLayoutEffect(() => {
        async function fetchdata() {
            const res = await axios.get('http://localhost:5000/api/comment')
            setComent(res.data.data.comment)

        }
        fetchdata()
    }, [refresh])
    function deleteComment(id) {
        axios
            .delete(`http://localhost:5000/api/comment/${id}`)
            .then((res) => {
                toast('Bình luận đã bị xóa.', {
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
    function statusComments(id) {
        axios
            .put(`http://localhost:5000/api/comment/status/${id}`)
            .then((res) => {
            })
        setRefresh((prev) => prev + 1);
    }

    return (
        <div className='boder-main'>
            <ToastContainer />
            <h2 className='text-primary text-uppercase mt-2 pb-2'>bình luận khách hàng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col" className='col-1'>STT</th>
                        <th scope="col">KHÁCH HÀNG</th>
                        <th scope="col">TÀI KHOẢN</th>
                        <th scope="col">BÌNH LUẬN</th>
                        <th scope="col">TÊN SẢN PHẨM</th>
                        <th scope="col">HÌNH ẢNH</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">XÓA</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comment.length !== 0 ?
                            comment.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{item.customer?.name}</td>
                                    <td>{item.customer?.email}</td>
                                    <td>{item.content}</td>
                                    <td>{item.products?.name}</td>
                                    <td>
                                        <img src={`/image/SanPham/${item.products.image}`} style={{ width: "150px" }} alt="..." />
                                    </td>
                                    <td>
                                        <Form.Check type="switch" id='custom-switch' onChange={() => { statusComments(item._id) }} checked={item.status} />
                                    </td>
                                    <td>
                                        <button className="text-danger" onClick={() => deleteComment(item._id)} >
                                            <Icon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>

                            )) :
                            <tr>
                                <td className='text-danger text-uppercase h3' colSpan={8}>Hiện chưa có bình luận nào</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Comment;