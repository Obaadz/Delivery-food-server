import { transporter } from "../index";

export function sendForgetEmail(receiveEmail: string, forgetCode: string) {
  const message = {
    from: "obada347@gmail.com",
    to: receiveEmail,
    subject: `Food Ninja - Forget password code is: ${forgetCode}`,
    text: `This is a message from Food ninja, your forget password code is: ${forgetCode} \n don't share it with other people.`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully!");
    }
  });
}
