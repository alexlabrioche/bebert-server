import Twilio from 'twilio';

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE,
  });
};

export const sendVerificationSMS = (to: string, key: string) => {
  const body = `Votre code de vérification est ${key}`;
  sendSMS(to, body);
};
