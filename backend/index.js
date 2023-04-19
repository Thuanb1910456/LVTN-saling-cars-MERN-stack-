//express - cors - bodyParser
const express = require('express');
const cors = require('cors')
const fileupload = require('express-fileupload');
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());

//route
const ProductsRoute = require('./route/products.js');
const TypesRoute = require('./route/type.js');
const AdminRoute = require('./route/admin.js');
const UserRoute = require('./route/user.js');
const OderRoute = require('./route/oder.js');
const CommentRoute = require('./route/comment.js');
const BillRoute = require('./route/bill.js');
const DeliveryAddress = require('./route/deliveryAddress.js')
const PositionRoute = require('./route/position.js')
const FeedbackRoute = require('./route/feedback.js')
const ImportCouponRoute = require('./route/importCoupon.js')

// app
app.use('/api/products', ProductsRoute);
app.use('/api/type', TypesRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/user', UserRoute);
app.use('/api/oder', OderRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/bill', BillRoute);
app.use('/api/deliveryAddress', DeliveryAddress);
app.use('/api/position', PositionRoute);
app.use('/api/feedback', FeedbackRoute);
app.use('/api/phieunhap',ImportCouponRoute);
//gettokten
app.get('/reset-password/:id/:token')
//connect DB
require('dotenv').config();
const { connectDB } = require('./configs/connect');
connectDB();

//port
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})