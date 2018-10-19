/**
 *
 * Example custom middlewre
 *
 */
const nodemailer = require('nodemailer');
// const env = require('../config/env');
import env from '../config/env';//
const fs = require('fs');
const path = require("path");

const elementMap = {
  "subject": "SUBJECT",
  "email": "FROM",
  "body": "BODY"
}

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

  let htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/email.html'), 'UTF-8');
  for (const key in elementMap) {
    htmlTemplate = htmlTemplate.replace(new RegExp(`__${elementMap[key]}__`, 'g'), req.body[key]);
  }
  htmlTemplate = htmlTemplate.replace(new RegExp(`__SITE__`, 'g'), env.SITE);

  const sendTo = [env.GMAIL_USERNAME];
  if (req.body.copy) {
    sendTo.push(req.body.email);
  }

  const mailOptions = {
    from: env.GMAIL_USERNAME,
    replyTo: req.body.email,
    to: sendTo,
    subject: `Web Contact: ${req.body.subject}`,
    text: req.body.body,
    html: htmlTemplate
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