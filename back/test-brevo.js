const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: '88cde5001@smtp-brevo.com', // Tu EMAIL_USER
    pass: 'JsKAwLvnYU3WhZMG',         // Tu EMAIL_PASS
  },
});

transporter.sendMail({
  from: '"Smart Style" <smartstyle.omar@yahoo.com>',
  to: 'smartstyle.omar@yahoo.com', // Prueba enviarte a ti mismo
  subject: 'Test Email from Brevo',
  text: 'This is a test email!',
})
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.error('Error:', error));