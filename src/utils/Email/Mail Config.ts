import nodemailer from 'nodemailer';

interface CustomTransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

const transporterOptions: CustomTransportOptions = {
    host: process.env?.smtpHost!,
    port: parseInt(process.env?.smtpPort!, 587),
    secure: false,
    auth: {
        user: process.env?.smtpUser!,
        pass: process.env?.smtpPass!
    }
};

export const transporter = nodemailer.createTransport(transporterOptions);
