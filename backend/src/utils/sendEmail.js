const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: "info@asiapacificceramic.com",
        pass: "mhIStc1D8QApYjXs",
      },
    });

    await transporter.sendMail({
      from: "info@asiapacificceramic.com",
      to,
      subject,
      text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
