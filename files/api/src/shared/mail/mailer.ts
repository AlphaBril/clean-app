import nodemailer = require("nodemailer");

const SMTP_USERNAME = process.env.SMTP_USERNAME || "";
const SMTP_SECRET = process.env.SMTP_SECRET || "";
const MAIL_FROM = process.env.MAIL_FROM || "";
const MAIL_HOST = process.env.MAIL_HOST || "";

export const ACTIVATION_EMAIL = "ACTIVATION_EMAIL";
export const CHANGE_PASSWORD_EMAIL = "CHANGE_PASSWORD_EMAIL";

export const sendMail = async (
  dest: string,
  link: string,
  username: string,
  type: string
) => {
  let mailOptions;
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_SECRET,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  try {
    const verify = await transporter.verify();
    if (!verify) return false;
  } catch (e) {
    return false;
  }

  switch (type) {
    case ACTIVATION_EMAIL: {
      mailOptions = {
        from: MAIL_FROM,
        to: dest,
        subject: "Activate your account",
        text: `Welcome to clean-app ${username} ! To activate your account, click on this link : ${MAIL_HOST}/auth/activate/${link}`,
      };
      break;
    }
    case CHANGE_PASSWORD_EMAIL: {
      mailOptions = {
        from: MAIL_FROM,
        to: dest,
        subject: "Change your password",
        text: `Hello ${username} ! To change your password, click on this link : ${MAIL_HOST}/auth/password/${link}`,
      };
      break;
    }
    default: {
      return;
    }
  }

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    return false;
  }
};
