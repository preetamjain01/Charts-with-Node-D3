const {EMAIL_FROM} = require('../shared/app-constants');
const nodemailer = require('nodemailer');

exports.createMailConfiguration = function (to, subject, text, html) {
    return  {
        from: EMAIL_FROM,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
};

exports.sendMail = function (mailOptions) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'acharya.rupesh0@gmail.com',
                pass: 'dishaclasses'
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info);
            }
        });
    })

};