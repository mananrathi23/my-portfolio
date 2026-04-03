const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Honeypot check (bot protection)
    if (req.body.website) {
      return res.status(200).json({ success: true }); // silently reject bots
    }

    const contact = await Contact.create({ name, email, message });

    // Send notification email to you
    try {
      const transporter = createTransporter();

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📬 New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #6366f1;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 8px;">
              ${message}
            </div>
            <hr style="margin-top: 24px;" />
            <p style="color: #888; font-size: 12px;">Sent from your portfolio contact form</p>
          </div>
        `
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"Your Name" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #6366f1;">Hey ${name},</h2>
            <p>Thanks for getting in touch! I've received your message and will get back to you within 24-48 hours.</p>
            <p>Here's what you sent:</p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; font-style: italic;">
              "${message}"
            </div>
            <br/>
            <p>Talk soon,<br/><strong>Your Name</strong></p>
            <p style="color: #888; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
          </div>
        `
      });
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
      // Don't fail the request if email fails
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
