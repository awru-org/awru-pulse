import dotenv from 'dotenv';

dotenv.config();

const config = {
  node_env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  database_url: process.env.DATABASE_URL!,

  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN!,
    chatId: process.env.TELEGRAM_CHAT_ID!,
  },

  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim()),
} as const;

export type AppConfig = typeof config;
export default config;
