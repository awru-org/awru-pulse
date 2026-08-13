import TelegramBot from 'node-telegram-bot-api';
import config from '../../config';

const bot = new TelegramBot(config.telegram.botToken);

export const escapeTelegramHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

const sendTelegramMessage = async (from: string, date: string, subject: string, body: string) => {
    try {
        const message = `
<b>📧 New Email</b>

<b>From:</b> ${escapeTelegramHtml(from)}
<b>Date:</b> ${escapeTelegramHtml(date)}
<b>Subject:</b> ${escapeTelegramHtml(subject)}

<b>Body:</b>
${escapeTelegramHtml(body)}
`;
        await bot.sendMessage(config.telegram.chatId, message, {
            parse_mode: 'HTML'
        });

        console.log('Telegram message send!');
    } catch (error) {
        console.error(error);
        throw Error
    }
}

export default sendTelegramMessage;