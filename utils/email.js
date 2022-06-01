const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

class Email {
  constructor(to) {
    this.to = to;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }

    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async send(template, subject, emailData) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      emailData
    );

    await this.newTransport().sendMail({
      from: 'franco@gmail.com',
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  async sendWelcome(name) {
    await this.send('welcome', 'New account', { name });
  }

  async sendPostNotice() {
    await this.send('postNotice', '', {});
  }
}

module.exports = { Email };