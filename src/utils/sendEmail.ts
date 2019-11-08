import Mailgun from 'mailgun-js';

const apiKey: string = process.env.MAILGUN_PRIVATE_KEY || '';
const domain: string = process.env.MAILGUN_CLUSTER || '';
const myEmail: string = 'alexbakerdeveloper@gmail.com';

const mailgunClient = new Mailgun({
  apiKey,
  domain,
});

const sendEmail = (to: string, subject: string, html: string) => {
  // to use Mailgun for free I only send email to myEmail
  const emailData = {
    from: myEmail,
    to,
    subject,
    html,
  };
  return mailgunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Salut ${fullName}, vérifie ton email stp`;
  const emailBody = `Check ton mail en cliquant <a href="http://bebert.com/verification/${key}/">ici</a>`;
  sendEmail(myEmail, emailSubject, emailBody);
};
