import Mailgen from 'mailgen';
import nodemailer from "nodemailer";
import { MAIL_PASS, MAIL_PORT, MAIL_SERVICE, MAIL_USER, NODE_ENV } from "../constants.js";
import ApiError from "../utils/apiError.js";
// Create a test account or replace with real credentials.
async function sendMail(options){
  
try {
  const transporter = nodemailer.createTransport({
    host: MAIL_SERVICE,
    port: MAIL_PORT,
    secure: NODE_ENV === 'development' ? false : true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  // Wrap in an async IIFE so we can use await.
  const { emailBody, emailText } = mailgenConfig(options.mailFormat);

  await transporter.sendMail({
    from: '"Nike" <contact@nike.com>',
    to: options.email,
    subject: options.subject,
    text: emailText, // plain‑text body
    html: emailBody, // HTML body
  });
} catch (error) {
  throw ApiError.serverError(error.message);
}

}

function mailgenConfig(mailFormat){
  // Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
      // Appears in header & footer of e-mails
      name: 'Nike',
      link: 'https://nike.com',
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
  }
});

// Generate an HTML email with the provided contents
const emailBody = mailGenerator.generate(mailFormat);

// Generate the plaintext version of the e-mail (for clients that do not support HTML)
const emailText = mailGenerator.generatePlaintext(mailFormat);

return {emailBody,emailText};
};


function verifyEmailFormat(name, verifyUrl) {
    return {
      body:{
        name: name,
        intro : "Welcome to Nike! We are very excited to have you on board.",
        action: {
          instructions: 'To get started with Nike, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: verifyUrl,
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we would love to help.",
      },
    };
}

function forgetPasswordFormat (name,otp) {
  return {
    body: {
      name: name,
      intro: `Hi ${name}, we received a request to reset your password.`,
      action: {
        instructions: `Use the following One-Time Password(OTP) to reset your password :`,
        button:{
          color:'#22BC66',
          text: `${otp}`,
          link: '#',
        },
      },
      outro: "If you did not request this,you can ignore this message. For help,just reply this email"
    },
  };
}



export { forgetPasswordFormat, sendMail, verifyEmailFormat };

