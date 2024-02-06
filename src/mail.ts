import nodemailer from "nodemailer";
import postmarkTransport from "nodemailer-postmark-transport";

const POSTMARK_KEY = process.env.POSTMARK_KEY;
const MAIL_FROM = process.env.MAIL_FROM;

const transport = nodemailer.createTransport(
  postmarkTransport({
    auth: {
      apiKey: POSTMARK_KEY,
    },
  })
);

export async function send(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  const mail = {
    from: MAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transport.sendMail(mail);
    console.log(info);
  } catch (err) {
    console.error(err);
  }
}
