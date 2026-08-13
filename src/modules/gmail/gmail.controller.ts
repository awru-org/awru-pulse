import { Request, Response } from 'express';
import { gmailService } from './gmail.service';
import config from '../../config';
import sendTelegramMessage from '../telegram/telegram.service';

const connectGmail = async (
    req: Request,
    res: Response
) => {
    const authUrl = gmailService.getAuthUrl();

    res.redirect(authUrl);
};

const gmailCallback = async (
    req: Request,
    res: Response
) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Authorization code is missing',
        });
    }

    const tokens = await gmailService.getTokensFromCode(code);

    console.log('✅ Gmail OAuth successful');
    console.log('Tokens:', tokens);

    return res.status(200).json({
        success: true,
        message: 'Gmail connected successfully',
    });
};



const getAllEmailInTest = async (
    req: Request,
    res: Response
) => {
    console.log('tokens first ', config.google.tokens.access_token, config.google.tokens.refresh_token)
    const emails = await gmailService.getEmails(config.google.tokens);

    if (emails.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No emails found',
        });
    }

    await Promise.all(emails.map((email) => {
        sendTelegramMessage(email.from, email.date, email.subject, email.body);
    }));

    return res.status(200).json({
        success: true,
        message: 'Get All Email successfully',
        data: emails,
    });


}
export const gmailController = {
    connectGmail,
    gmailCallback,
    getAllEmailInTest
};