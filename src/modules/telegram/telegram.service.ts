import TelegramBot from 'node-telegram-bot-api';
import config from '../../config';

const bot = new TelegramBot(config.telegram.botToken);

const sendTelegramMessage = async (message: string) => {
    try {
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