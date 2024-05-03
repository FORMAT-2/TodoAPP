const nodemailer = require('nodemailer');
require('dotenv').config()
const sendWelcomeMail = (userMail)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        host: process.env.NODEMAILER_HOST,
        port: process.env.PORT,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: userMail,
        subject: "Welcome to our TODO APP",
        text: "Thank you for registering with our TODO APP",
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
}


module.exports = {sendWelcomeMail}