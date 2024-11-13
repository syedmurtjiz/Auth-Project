const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP transport
async function sendMail(to, subject, text = '', html = '') {
  // Initialize the transporter with SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Email service (e.g., Gmail, Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Define the mail options, with optional HTML content if provided
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to, // Recipient's email address
    subject, // Email subject
    text, // Plain text body
    html, // HTML body (optional)
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info; // Return info for further use if needed
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email: ' + error.message); // Throw error for error handling in calling function
  }
}

module.exports = sendMail;
