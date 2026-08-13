import { google } from 'googleapis';
import config from '../../config';
import { getHeader } from '../../utils/getHeader';
import { getEmailBody } from '../../utils/getEmailBody';
import { parseEmail } from '../../utils/parseEmail';

const createOAuth2Client = () => {
    return new google.auth.OAuth2(
        config.google.clientId,
        config.google.clientSecret,
        config.google.redirectUri
    );
};

const getAuthUrl = () => {
    const oauth2Client = createOAuth2Client();

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
        ]
    })
};

const getTokensFromCode = async (code: string) => {
    const oauth2Client = createOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
};


const getEmails = async (tokens: {
    access_token?: string | null;
    refresh_token?: string | null;
}) => {
    const oauth2Client = createOAuth2Client();

    oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
    });

    const gmail = google.gmail({
        version: 'v1',
        auth: oauth2Client,
    });

    // Only unread emails
    const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 1,
        q: 'in:inbox is:unread',
    });

    const messages = response.data.messages ?? [];

    const emails = await Promise.all(
        messages.map(async (message) => {
            const result = await gmail.users.messages.get({
                userId: 'me',
                id: message.id!,
                format: 'full',
            });


            return parseEmail(result.data);
        })
    );

    return emails;
};

export const gmailService = {
    getAuthUrl,
    getTokensFromCode,
    getEmails,
};