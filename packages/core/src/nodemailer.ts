import nodemailer from 'nodemailer';

import { Config } from 'sst/node/config';

type Mailer = {
	email: string;
	authUrl: string;
};

export const mailer = async (data: Mailer) => {
	const Transporter = nodemailer.createTransport({
		service: Config.EMAIL_SERVICE,
		host: Config.EMAIL_HOST,
		port: Number(Config.EMAIL_PORT),
		secure: true,
		auth: {
			user: Config.EMAIL_USER,
			pass: Config.EMAIL_APP_PASS
		}
	});

	const text = `
    <p>Click on this link and we will promptly log you in to ${Config.PROJECT_NAME}</p>
    <a href=${data.authUrl}>LOGIN</a>`;

	const mailOptions = {
		from: Config.EMAIL_USER,
		to: data.email,
		subject: `Hello, here is your Login Link for ${Config.PROJECT_NAME}`,
		html: text
	};

	return Transporter.sendMail(mailOptions)
		.then((res) => res)
		.catch((err) => err);
};
