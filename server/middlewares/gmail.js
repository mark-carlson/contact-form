/**
 *
 * Example custom middlewre
 *
 */
const nodemailer = require('nodemailer');
import env from '../config/env';

export default function(req, res, next) {
  next();
}

export const sendMailFromGmail = (req, res, next) => {
  const buff = new Buffer(env.ENCRYPTED_PASSWORD, 'base64');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.GMAIL_USERNAME,
      pass: buff.toString('ascii')
    }
  });

  const mailOptions = {
    from: env.GMAIL_USERNAME,
    replyTo: req.body.email,
    to: env.GMAIL_USERNAME,
    subject: `Web Contact: ${req.body.subject}`,
    text: req.body.body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(503).json({
        message: 'send failed'
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'mail sent'
      });
    }
  });
}