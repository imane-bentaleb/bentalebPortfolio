const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route for Root
app.get('/', (req, res) => {
    res.send('Server is running. Use the /send-mail endpoint for POST requests.');
  });
   
  // Email Route
// Route to handle form submission
app.post('/send-mail', async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'imanebentaleb2030@gmail.com', // Replace with your email
        pass: 'iuxq nyxt onap kpdw', // Replace with your email password or app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'imanebentaleb2030@gmail.com', // Your recipient email
      subject: `${subject}`,
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});