const Feedback = require('../models/feedback')
var nodemailer = require('nodemailer');
const User = require('../models/user')
exports.create = async (req, res, next) => {
    try {
        var message = ''
        if (req.body.customer == undefined) {
            const feedback = await Feedback.create({ ...req.body, status: false })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'thuannguyennguyen2006@gmail.com',
                    pass: 'dfpoqgvngkeousgk'
                }
            });

            var mailOptions = {
                from: 'youremail@student.ctu.edu.vn',
                to: feedback.email,
                subject: 'TN-CARS VIỆT NAM',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${feedback.email}</h3>
                            <p>Chúng tôi đã tiếp nhận được yêu cầu thông tin từ bạn. Vui lòng chờ đợi và kiểm tra email trường xuyên. Chúng tôi sẻ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            message = 'Chúng tôi đã tiếp nhận được thông tin. Bạn vui lòng kiểm tra email chúng sẻ phản hồi sớm nhất đến bạn'
        }
        else {
            const user = await User.findById(req.body.customer)
            const feedback = await Feedback.create({
                ...req.body,
                status: false,
                name: user.name,
                email: user.email,
                adress: user.adress,
                sdt: user.sdt
            })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'thuannguyennguyen2006@gmail.com',
                    pass: 'dfpoqgvngkeousgk'
                }
            });

            var mailOptions = {
                from: 'youremail@student.ctu.edu.vn',
                to: feedback.email,
                subject: 'TN-CARS VIỆT NAM',
                html:
                    `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${feedback.email}</h3>
                            <p>Chúng tôi đã tiếp nhận được yêu cầu thông tin từ bạn. Vui lòng chờ đợi và kiểm tra email trường xuyên. Chúng tôi sẻ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            message = 'Chúng tôi đã tiếp nhận được thông tin. Bạn vui lòng kiểm tra email chúng sẻ phản hồi sớm nhất đến bạn'
        }
        res.status(200).json({
            status: 'success',
            message: message
        })
    } catch (error) {
        next(error);
    }
}
exports.getAll = async (req, res, next) => {
    try {
        const feedback = await Feedback.find()
        res.status(200).json({
            status: "success",
            results: feedback.length,
            data: { feedback }
        })
    } catch (error) {
        res.json(error);
    }
}
exports.update = async (req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.id)
        feedback.status = !feedback.status
        await feedback.save();
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'thuannguyennguyen2006@gmail.com',
                pass: 'dfpoqgvngkeousgk'
            }
        });

        var image = ''
        if (req.body.image != undefined) {
            image = 'https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png';
        }

        var mailOptions = {
            from: 'youremail@student.ctu.edu.vn',
            to: feedback.email,
            subject: 'TN-CARS VIỆT NAM',
            html:
                `   
                        <style>
                        h3 {
                            color: blue,
                        }
                        h4 {
                            font-weight: bold,
                        }
                        p {
                            font-size: 18px,
                        }
                        </style>
                        <div>
                            <h3>Xin chào ${feedback.email}</h3>
                            <p>Dưới đây là thông tin phản hồi từ chúng tôi đến bạn</p>
                            <p>${req.body.content}<p>
                            <p> <img src=${image} </p>
                            <h4>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe.</h4>
                        </div>
                    `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json({
            status: "success",
            results: feedback.length,
            data: { feedback }
        })
    } catch (error) {
        res.json(error);
    }
}