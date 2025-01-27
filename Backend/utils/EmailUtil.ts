import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type SendEmailInput = {
  RECIPIENT_EMAIL: string;
  subject: string;
  emailTitle: string;
  messageBody: string;
};

export class EmailUtil {
  transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  constructor(
    private Host: string,
    private SENDER_EMAIL: string,
    private Mail_Password: string
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.Host,
      port: 587,
      secure: false,
      auth: {
        user: SENDER_EMAIL,
        pass: this.Mail_Password,
      },
    });
  }
  async sendEmail(sendEmailInput: SendEmailInput) {
    console.log(sendEmailInput);
    await this.transporter.sendMail({
      from: `Shoply <${this.SENDER_EMAIL}>`,
      to: sendEmailInput.RECIPIENT_EMAIL,
      subject: sendEmailInput.subject,
      html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        /* Reset styles */
        body { margin: 0; padding: 0; min-width: 100%; font-family: Arial, sans-serif; }
        table { border-spacing: 0; }
        td { padding: 0; }
        img { border: 0; max-width: 100%; }
        
        /* Main styles */
        .wrapper { width: 100%; table-layout: fixed; background-color: #f6f6f6; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 8px; overflow: hidden; }
        .header { padding: 40px 30px; text-align: center; background-color: #2c3e50; }
        .content { padding: 30px; line-height: 1.5; color: #444444; }
        .footer { padding: 20px 30px; text-align: center; background-color: #f8f9fa; font-size: 12px; color: #666666; }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" width="100%">
            <!-- Header -->
            <tr>
                <td class="header">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${sendEmailInput.emailTitle}</h1>
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td class="content">
                    <table width="100%">
                        <tr>
                            <td style="padding-bottom: 20px;">
                                ${sendEmailInput.messageBody}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td class="footer">
                    <p style="margin: 0;">© 2024 Shoply. All rights reserved.</p>
                    <p style="margin: 5px 0 0;">
                        <a href="#" style="color: #3498db; text-decoration: none;">Unsubscribe</a> |
                        <a href="#" style="color: #3498db; text-decoration: none;">Privacy Policy</a>
                    </p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
  `,
    });
  }
}

export const emailUtil = new EmailUtil(
  process.env.MAIL_HOST!,
  process.env.OUR_MAIL!,
  process.env.MAIL_PASSWORD!
);
