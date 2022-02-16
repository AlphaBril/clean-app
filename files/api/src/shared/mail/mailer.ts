const nodemailer = require('nodemailer');

export const SMTP_USERNAME = process.env.SMTP_USERNAME || '';
export const SMTP_SECRET = process.env.SMTP_SECRET || '';

export const ACTIVATION_EMAIL = "ACTIVATION_EMAIL";
export const CHANGE_PASSWORD_EMAIL = "CHANGE_PASSWORD_EMAIL";

export const sendMail = (dest: string, link: string, username: string, type: string) => {
  let mailOptions;
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_SECRET
    },
      tls:{
        ciphers:'SSLv3'
    }
  });

  switch (type) {
    case ACTIVATION_EMAIL: {
      mailOptions = {
        from: 'no-reply@koodibril.com', // change to your liking
        to: dest,
        subject: 'Activate your account',
        text: 'Welcome to clean-app ' + username + '! To activate your account, click on this link : http://localhost:8080/auth/activate/' + link
      };
      break;
    }
    case CHANGE_PASSWORD_EMAIL: {
      mailOptions = {
        from: 'no-reply@koodibril.com',
        to: dest,
        subject: 'Change your password',
        text: 'Hello ' + username + '! To change your password, click on this link : http://localhost:8080/auth/password/' + link
      };
      break;
    }
    default: {
      return;
    }
  }
  
  transporter.sendMail(mailOptions, function(error: any, info: any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

