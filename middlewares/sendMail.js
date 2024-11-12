const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
async function sendMail(to, subject, text, html) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Email service (can be changed to another service like Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Your email address (e.g., 'your-email@gmail.com')
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Define the mail options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to, // Recipient's email address
    subject, // Email subject
    text, // Plain text body
    html, // HTML body (optional)
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email: ' + error.message); // Throw error for further handling
  }
}

module.exports = sendMail;
