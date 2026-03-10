const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    
    const mailOptions = {
      from: `"Salemty-TN" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Vérification de votre compte Salemty-TN',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: #E70013; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">♥ Salemty-TN</h1>
            <p style="margin: 5px 0 0;">صحتي تونسي</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Vérifiez votre adresse email</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Merci de vous être inscrit sur Salemty-TN! Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #E70013; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Vérifier mon email
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur:<br>
              <a href="${verificationUrl}" style="color: #E70013;">${verificationUrl}</a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Ce lien expirera dans 24 heures.
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    
    const mailOptions = {
      from: `"Salemty-TN" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Réinitialisation de votre mot de passe - Salemty-TN',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: #E70013; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">♥ Salemty-TN</h1>
            <p style="margin: 5px 0 0;">صحتي تونسي</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Réinitialisez votre mot de passe</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #E70013; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Réinitialiser mon mot de passe
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur:<br>
              <a href="${resetUrl}" style="color: #E70013;">${resetUrl}</a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              Ce lien expirera dans 10 minutes.
            </p>
            
            <p style="color: #6b7280; font-size: 14px;">
              Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Send health alert notification
const sendHealthAlert = async (email, alert) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Salemty-TN" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Alerte santé: ${alert.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: #E70013; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">♥ Salemty-TN</h1>
            <p style="margin: 5px 0 0;">صحتي تونسي</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="background: ${alert.severity === 'critical' ? '#dc2626' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                ${alert.severity === 'critical' ? 'CRITIQUE' : alert.severity === 'high' ? 'ÉLEVÉ' : alert.severity === 'medium' ? 'MODÉRÉ' : 'FAIBLE'}
              </span>
            </div>
            
            <h2 style="color: #1f2937; margin-bottom: 15px;">${alert.title}</h2>
            
            <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
              ${alert.description}
            </p>
            
            ${alert.affectedAreas.length > 0 ? `
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px; color: #374151;">Zones concernées:</h4>
                <p style="margin: 0; color: #6b7280;">${alert.affectedAreas.join(', ')}</p>
              </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/carte" style="background: #E70013; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Voir la carte des alertes
              </a>
            </div>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Health alert sent to:', email);
  } catch (error) {
    console.error('Error sending health alert:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendHealthAlert
};
