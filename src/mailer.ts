import nodemailer from 'nodemailer'


// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'augustinenormanyo98@gmail.com',
      pass: 'xksrzyuibyizyula',
    },
  });


  // Function to send password reset email
export function sendPasswordResetEmail(email:string, resetToken:string) {
    const mailOptions = {
      from: 'augustinenormanyo98@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetToken}`,
      html: `<p>Click the following link to reset your password: <a href="${resetToken}">${resetToken}</a></p>`,
    };
  
    // Send the email
    return transporter.sendMail(mailOptions);
  }