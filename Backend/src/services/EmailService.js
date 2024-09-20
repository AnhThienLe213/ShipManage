// services/EmailService.js
const nodemailer = require('nodemailer');

let sendBookingConfirmation = async (email, bookingDetails, confirmationLink) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'thienviking@gmail.com',
            pass: 'qnfdpdvhxavcdvcq'
        }
    });

    const mailOptions = {
        from: 'thienviking@gmail.com',
        to: email,
        subject: 'Booking Confirmation',
        text: `Please confirm your booking by clicking the following link: ${confirmationLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


module.exports = {
    sendBookingConfirmation: sendBookingConfirmation,
}
