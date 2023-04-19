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
                subject: 'TN-CARS Xin Chào',
                html: `<p> Chúng tôi đã tiếp nhận được thông tin. Bạn vui lòng kiểm tra email thường xuyên chúng sẻ phản hồi sớm nhất đến bạn</p> <h3>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe thịnh vương</h3>`,
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
                subject: 'TN-CARS Xin Chào',
                html: `<p> Chúng tôi đã tiếp nhận được thông tin. Bạn vui lòng kiểm tra email thường xuyên chúng sẻ phản hồi sớm nhất đến bạn</p> <h3>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe thịnh vương</h3>`,
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
            subject: 'TN-CARS Xin Chào',
            html: ` <p> Dưới đây là thông tin mà chúng tôi xin được phản hồi đến bạn.</p> <img  src=${image} /> <p> ${req.body.content}  </p> <h3>TN-CARS xin chân thành cảm ơn quý khách. Xin chúc quý khách hàng ngày càng thành công trong công việc, gặp nhiều may mắn và sức khỏe thịnh vương</h3>`,
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